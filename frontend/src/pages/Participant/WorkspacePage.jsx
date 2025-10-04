import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const WorkspacePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('teamId');
  const hackathonId = queryParams.get('hackathonId');

  const { user, token, loading: authLoading } = useContext(AuthContext);
  const { socket, teamMessages, mentorMessages, joinTeamChat, sendTeamMessage, joinMentorChat, sendMentorMessage, loadHistoricalTeamMessages, loadHistoricalMentorMessages } = useContext(ChatContext);

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [showMentorChatModal, setShowMentorChatModal] = useState(false);
  const [showTeamChatModal, setShowTeamChatModal] = useState(false);
  const [teamChatMessage, setTeamChatMessage] = useState('');
  const [mentorChatMessage, setMentorChatMessage] = useState('');
  const [hackathon, setHackathon] = useState(null); // New state for hackathon details

  const teamChatMessages = teamMessages[teamId] || [];
  const firstMentorId = hackathon && hackathon.mentors.length > 0 ? hackathon.mentors[0]._id : null; // Dynamically get mentor ID
  const mentorChatRoomId = firstMentorId ? `${hackathonId}_${firstMentorId}` : null;
  const currentMentorMessages = mentorChatRoomId ? mentorMessages[mentorChatRoomId] || [] : [];

  const teamChatRef = useRef(null);
  const mentorChatRef = useRef(null);

  // Derived state
  const isSubmitted = submission && submission.status !== 'pending';

  useEffect(() => {
    const fetchSubmissionAndJoinChats = async () => {
      if (!teamId || !hackathonId || !token || authLoading || !socket) {
        setLoading(false);
        return;
      }
      try {
        const submissionData = await api.getSubmission(hackathonId, teamId, token);
        if (submissionData && submissionData._id) {
          setSubmission(submissionData);
          setSubmissionLink(submissionData.codeLink || '');
        }

        const hackathonData = await api.getHackathonById(hackathonId, token); // Fetch hackathon details
        setHackathon(hackathonData);

        setLoading(false);

        // Join team chat room and load historical messages
        joinTeamChat(teamId, hackathonId);
        loadHistoricalTeamMessages(hackathonId, teamId);

        // Join mentor chat room and load historical messages if a mentor exists
        if (firstMentorId) {
          joinMentorChat(hackathonId, firstMentorId);
          loadHistoricalMentorMessages(hackathonId, firstMentorId);
        }

      } catch (err) {
        console.error("Error fetching submission details or joining chats:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchSubmissionAndJoinChats();
  }, [teamId, hackathonId, token, authLoading, socket, firstMentorId]); // Added socket and firstMentorId to dependencies

  useEffect(() => {
    if (teamChatRef.current) {
      teamChatRef.current.scrollTop = teamChatRef.current.scrollHeight;
    }
  }, [teamMessages]);

  useEffect(() => {
    if (mentorChatRef.current) {
      mentorChatRef.current.scrollTop = mentorChatRef.current.scrollHeight;
    }
  }, [mentorMessages]);

  const handleOpenSubmissionModal = () => {
    setShowSubmissionModal(true);
    setSubmissionMessage(null);
  };

  const handleCloseSubmissionModal = () => {
    setShowSubmissionModal(false);
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setSubmissionMessage(null);

    if (!submissionLink.trim()) {
      setSubmissionMessage({ type: 'error', text: 'Submission link cannot be empty.' });
      return;
    }

    try {
      const submissionData = {
        teamId,
        hackathonId,
        codeLink: submissionLink,
      };
      const res = await api.createOrUpdateSubmission(submissionData, token);
      if (res.message) {
        setSubmissionMessage({ type: 'error', text: res.message });
      } else {
        setSubmission(res);
        setSubmissionMessage({ type: 'success', text: 'Project submitted successfully!' });
        setShowSubmissionModal(false);
      }
    } catch (err) {
      console.error("Error submitting project:", err);
      setSubmissionMessage({ type: 'error', text: err.message || 'Failed to submit project.' });
    }
  };

  const handleSendTeamMessage = (e) => {
    e.preventDefault();
    if (teamChatMessage.trim() && teamId && hackathonId) {
      sendTeamMessage(teamId, hackathonId, teamChatMessage);
      setTeamChatMessage('');
    }
  };

  const handleSendMentorMessage = (e) => {
    e.preventDefault();
    if (mentorChatMessage.trim() && hackathonId && firstMentorId) {
      sendMentorMessage(hackathonId, firstMentorId, mentorChatMessage);
      setMentorChatMessage('');
    }
  };

  if (authLoading || loading) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-text">Loading workspace...</main>;
  }

  if (error) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-red-500">Error: {error.message}</main>;
  }

  if (!teamId || !hackathonId) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-red-500">Team ID or Hackathon ID is missing from URL.</main>;
  }

  // Dummy data for project details - replace with real data from team/hackathon/submission as needed
  const projectDetails = submission ? {
    name: "Team Project",
    status: submission.status,
    deadline: "25th Dec, 2025",
    repoLink: submission.codeLink,
    description: "Your team's submission for the hackathon.",
    resources: [],
    recentActivity: [],
    upcomingMilestones: [],
    mentors: hackathon ? hackathon.mentors.map(mentor => ({ id: mentor._id, name: mentor.username, role: 'Mentor', availability: 'Online' })) : [], // Use dynamic mentor data
  } : {
    name: "No Project Yet",
    status: "Not Submitted",
    deadline: "N/A",
    repoLink: "",
    description: "No submission found for this team and hackathon. Submit your project!",
    resources: [],
    recentActivity: [],
    upcomingMilestones: [],
    mentors: hackathon ? hackathon.mentors.map(mentor => ({ id: mentor._id, name: mentor.username, role: 'Mentor', availability: 'Online' })) : [], // Use dynamic mentor data
  };

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      <h1 className="text-5xl font-bold text-primary mb-8 text-center">Hackathon Workspace</h1>
      <p className="text-xl text-muted mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">This is your dedicated workspace for the hackathon.</p>

      {submissionMessage && (
        <div className={`p-3 mb-4 rounded-lg text-white ${submissionMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {submissionMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Workspace Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
          className="lg:col-span-2 bg-gradient-to-br from-card-start to-card-end rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out border border-border"
        >
          <h2 className="text-3xl font-bold text-text mb-6">Your Project</h2>
          <p className="text-muted text-lg mb-4 flex items-center gap-2"><span role="img" aria-label="description">📝</span> {projectDetails.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text mb-6">
            <div>
              <p className="font-semibold flex items-center gap-2"><span role="img" aria-label="status">✅</span> Status:</p>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${projectDetails.status === 'submitted' || projectDetails.status === 'resubmitted' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>{projectDetails.status}</span>
            </div>
            <div>
              <p className="font-semibold flex items-center gap-2"><span role="img" aria-label="deadline">📅</span> Deadline:</p>
              <span className="text-accent font-medium">{projectDetails.deadline}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-text mb-2 flex items-center gap-2"><span role="img" aria-label="repository">🔗</span> Repository:</p>
            {projectDetails.repoLink ? (
              <a href={projectDetails.repoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {projectDetails.repoLink}
              </a>
            ) : (
              <span className="text-muted">No repository link provided.</span>
            )}
          </div>

          {/* Dummy data for resources, activity, milestones - replace with real data */}
          <div className="mb-8">
            <p className="font-semibold text-text mb-2 flex items-center gap-2"><span role="img" aria-label="resources">📚</span> Resources:</p>
            <ul className="list-disc list-inside pl-6 text-muted space-y-1">
              {projectDetails.resources.length > 0 ? (
                projectDetails.resources.map((resource, index) => (
                  <li key={index}><a href={resource.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary-2">{resource.name}</a></li>
                ))
              ) : (
                <li>No resources available.</li>
              )}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text mb-4">Recent Activity</h3>
            <div className="bg-bg-elev rounded-lg p-4 border border-border h-48 overflow-y-auto">
              <ul className="space-y-3">
                {projectDetails.recentActivity.length > 0 ? (
                  projectDetails.recentActivity.map(activity => (
                    <li key={activity.id} className="flex items-start gap-3">
                      <span className="text-primary-2 text-xl">
                        {activity.type === "commit" && "⚙️"}
                        {activity.type === "design" && "🎨"}
                        {activity.type === "backend" && "🖥️"}
                      </span>
                      <div>
                        <p className="text-text text-sm font-medium">{activity.message}</p>
                        <p className="text-muted text-xs">{activity.date}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No recent activity.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text mb-4">Upcoming Milestones</h3>
            <div className="bg-bg-elev rounded-lg p-4 border border-border">
              <ul className="space-y-3">
                {projectDetails.upcomingMilestones.length > 0 ? (
                  projectDetails.upcomingMilestones.map(milestone => (
                    <li key={milestone.id} className="flex justify-between items-center">
                      <p className="text-text text-base font-medium flex items-center gap-2"><span role="img" aria-label="milestone">🎯</span> {milestone.name}</p>
                      <span className="text-accent text-sm">{milestone.date}</span>
                    </li>
                  ))
                ) : (
                  <li>No upcoming milestones.</li>
                )}
              </ul>
            </div>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-primary/20 text-primary rounded-xl flex items-center justify-center gap-3 border border-primary/50"
            >
              <span role="img" aria-label="submitted" className="text-3xl">🎉</span> <span className="font-semibold text-lg">{submissionMessage ? submissionMessage.text : 'Project submitted successfully!'}</span>
            </motion.div>
          ) : (
            <motion.button
              onClick={handleOpenSubmissionModal}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Project
            </motion.button>
          )}
        </motion.div>

        {/* Submission Modal */}
        {showSubmissionModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-card p-8 rounded-xl shadow-xl w-full max-w-md border border-border"
            >
              <h2 className="text-2xl font-bold text-text mb-4">Submit Your Project</h2>
              <form onSubmit={handleSubmitProject}>
                <label htmlFor="submissionLink" className="block text-text text-lg font-medium mb-2">Project Link:</label>
                <input
                  type="url"
                  id="submissionLink"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://github.com/your-project-link"
                  className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                  required
                />
                {submissionMessage && submissionMessage.type === 'error' && (
                  <p className="text-red-400 text-sm mb-4">{submissionMessage.text}</p>
                )}
                <div className="flex justify-end gap-4">
                  <motion.button
                    type="button"
                    onClick={handleCloseSubmissionModal}
                    className="px-6 py-3 bg-muted/20 text-muted rounded-full font-semibold hover:bg-muted/30 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {submission && submission._id ? 'Update Submission' : 'Submit'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Team Information & Chat Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            className="bg-gradient-to-br from-card-start to-card-end rounded-xl shadow-xl p-8 transform transition-all duration-300 ease-in-out border border-border"
          >
            <h2 className="text-3xl font-bold text-text mb-6">Team Details</h2>
            <p className="text-text text-lg mb-4"><strong>Team ID:</strong> <span className="font-mono text-accent select-all">{teamId || 'N/A'}</span></p>
            {/* <p className="text-text text-lg mb-4"><strong>Team Code:</strong> <span className="font-mono text-accent select-all">FINTECH-XYZ</span></p> */} {/* Team code might not be relevant if we fetch team data via ID */}
            <h3 className="text-xl font-semibold text-text mt-6 mb-3">Members:</h3>
            <ul className="space-y-2 text-muted">
              {/* This should come from actual team data fetched, but for now, use dummy or placeholder */}
              {/* {teamMembers.map((member) => (
                <li key={member.id} className="flex items-center gap-2"><span role="img" aria-label="member">👨‍💻</span> {member.name} - <span className="text-primary-2">({member.role})</span></li>
              ))} */}
              <li>No team members data yet.</li>
            </ul>
          </motion.div>

          {/* Mentors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            className="bg-gradient-to-br from-card-start to-card-end rounded-xl shadow-xl p-8 flex flex-col transform transition-all duration-300 ease-in-out border border-border"
          >
            <h2 className="text-3xl font-bold text-text mb-6">Assigned Mentors</h2>
            <div className="space-y-3 mb-4">
              {projectDetails.mentors.length > 0 ? (
                projectDetails.mentors.map(mentor => (
                  <div key={mentor.id} className="flex items-center gap-2">
                    <span role="img" aria-label="mentor" className="text-xl">🧑‍🏫</span>
                    <div>
                      <p className="text-text text-base font-semibold">{mentor.name}</p>
                      <p className="text-muted text-xs">{mentor.role} ({mentor.availability})</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No mentors assigned yet.</p>
              )}
            </div>
            <motion.button
              onClick={() => setShowMentorChatModal(true)}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-2 transition-colors duration-200 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chat with Mentor
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            className="bg-gradient-to-br from-card-start to-card-end rounded-xl shadow-xl p-8 flex flex-col transform transition-all duration-300 ease-in-out border border-border"
          >
            <h2 className="text-3xl font-bold text-text mb-6">Team Chat</h2>
            <motion.button
              onClick={() => setShowTeamChatModal(true)}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold text-base hover:bg-primary-2 transition-colors duration-200 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chat with Team
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mentor Chat Modal */}
      {showMentorChatModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-card p-8 rounded-xl shadow-xl w-full max-w-md border border-border relative"
          >
            <button
              onClick={() => setShowMentorChatModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-text mb-4">Chat with Mentor</h2>
            <div ref={mentorChatRef} className="h-64 bg-bg-elev rounded-lg p-4 flex flex-col justify-end text-muted space-y-2 overflow-y-auto mb-4 border border-border">
              {currentMentorMessages.length > 0 ? (
                currentMentorMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender._id === user.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 rounded-lg ${message.sender._id === user.id ? 'bg-primary text-white' : 'bg-gray-700 text-text'} max-w-[70%]`}>
                      <p className="font-semibold text-sm mb-1">{message.sender.username}</p>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-right opacity-70 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">No messages yet. Start a conversation!</p>
              )}
            </div>
            <form onSubmit={handleSendMentorMessage}>
              <textarea
                className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="3"
                placeholder="Type your message to mentor..."
                value={mentorChatMessage}
                onChange={(e) => setMentorChatMessage(e.target.value)}
              ></textarea>
              <motion.button
                type="submit"
                className="mt-4 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-colors duration-200 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message to Mentor
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Team Chat Modal */}
      {showTeamChatModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-card p-8 rounded-xl shadow-xl w-full max-w-md border border-border relative"
          >
            <button
              onClick={() => setShowTeamChatModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-text"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-text mb-4">Team Chat</h2>
            <div ref={teamChatRef} className="h-64 bg-bg-elev rounded-lg p-4 flex flex-col justify-end text-muted space-y-2 overflow-y-auto mb-4 border border-border">
              {teamChatMessages.length > 0 ? (
                teamChatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender._id === user.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 rounded-lg ${message.sender._id === user.id ? 'bg-primary text-white' : 'bg-gray-700 text-text'} max-w-[70%]`}>
                      <p className="font-semibold text-sm mb-1">{message.sender.username}</p>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-right opacity-70 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">No messages yet. Start a conversation!</p>
              )}
            </div>
            <form onSubmit={handleSendTeamMessage}>
              <textarea
                className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="3"
                placeholder="Type your message here..."
                value={teamChatMessage}
                onChange={(e) => setTeamChatMessage(e.target.value)}
              ></textarea>
              <motion.button
                type="submit"
                className="mt-4 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-colors duration-200 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default WorkspacePage;
