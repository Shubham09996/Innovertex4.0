import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

const WorkspacePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('teamId');

  // Dummy data for team members
  const teamMembers = [
    { id: 'mem1', name: 'Alice', role: 'Frontend Dev' },
    { id: 'mem2', name: 'Bob', role: 'Backend Dev' },
    { id: 'mem3', name: 'Charlie', role: 'UI/UX Designer' },
  ];

  // Dummy data for project details
  const initialProjectDetails = {
    name: "HackVerse Project X",
    status: "In Progress",
    deadline: "25th Dec, 2025",
    repoLink: "https://github.com/hackverse/project-x",
    description: "Our project aims to revolutionize the way students collaborate on hackathons by providing an integrated workspace with real-time communication and project management tools.",
    resources: [
      { name: "Figma Design", link: "#" },
      { name: "API Documentation", link: "#" },
      { name: "Project Guidelines", link: "#" },
    ],
    // New dummy data for recent activity and milestones
    recentActivity: [
      { id: 1, type: "commit", message: "Frontend: Implemented Navbar responsiveness", date: "2 hours ago" },
      { id: 2, type: "design", message: "Figma: Updated Dashboard mockups", date: "1 day ago" },
      { id: 3, type: "backend", message: "Backend: Fixed authentication bug", date: "2 days ago" },
    ],
    upcomingMilestones: [
      { id: 1, name: "Frontend Alpha Release", date: "Oct 15, 2025" },
      { id: 2, name: "Backend API Stabilization", date: "Oct 20, 2025" },
    ],
    // Dummy data for assigned mentors
    mentors: [
      { id: 1, name: "Dr. Alex Lee", role: "AI/ML Expert", availability: "Online" },
      { id: 2, name: "Ms. Sarah Chen", role: "Fullstack Lead", availability: "Offline" },
    ],
  };

  const [currentProjectDetails, setCurrentProjectDetails] = useState(initialProjectDetails);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track if submitted
  const [submissionMessage, setSubmissionMessage] = useState(""); // New state for submission feedback
  const [showMentorChatModal, setShowMentorChatModal] = useState(false); // State for mentor chat modal
  const [showTeamChatModal, setShowTeamChatModal] = useState(false); // State for team chat modal

  const handleOpenSubmissionModal = () => {
    setShowSubmissionModal(true);
  };

  const handleCloseSubmissionModal = () => {
    setShowSubmissionModal(false);
    setSubmissionLink(""); // Clear link on close
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (submissionLink.trim()) {
      // Hardcoded submission logic
      setIsSubmitted(true);
      setSubmissionMessage("Project submitted successfully!");
      setCurrentProjectDetails(prevDetails => ({ ...prevDetails, status: "Submitted" })); // Update status
      setShowSubmissionModal(false);
      console.log("Project submitted with link:", submissionLink);
    } else {
      setSubmissionMessage("Submission link cannot be empty.");
    }
  };

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      <h1 className="text-5xl font-bold text-primary mb-8 text-center">Hackathon Workspace</h1>
      <p className="text-xl text-muted mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">This is your dedicated workspace for the hackathon.</p>

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
          <p className="text-muted text-lg mb-4 flex items-center gap-2"><span role="img" aria-label="description">📝</span> {currentProjectDetails.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text mb-6">
            <div>
              <p className="font-semibold flex items-center gap-2"><span role="img" aria-label="status">✅</span> Status:</p>
              <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">{currentProjectDetails.status}</span>
            </div>
            <div>
              <p className="font-semibold flex items-center gap-2"><span role="img" aria-label="deadline">📅</span> Deadline:</p>
              <span className="text-accent font-medium">{currentProjectDetails.deadline}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-text mb-2 flex items-center gap-2"><span role="img" aria-label="repository">🔗</span> Repository:</p>
            <a href={currentProjectDetails.repoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {currentProjectDetails.repoLink}
            </a>
          </div>

          <div className="mb-8">
            <p className="font-semibold text-text mb-2 flex items-center gap-2"><span role="img" aria-label="resources">📚</span> Resources:</p>
            <ul className="list-disc list-inside pl-6 text-muted space-y-1">
              {currentProjectDetails.resources.map((resource, index) => (
                <li key={index}><a href={resource.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary-2">{resource.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text mb-4">Recent Activity</h3>
            <div className="bg-bg-elev rounded-lg p-4 border border-border h-48 overflow-y-auto">
              <ul className="space-y-3">
                {currentProjectDetails.recentActivity.map(activity => (
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
                ))}
              </ul>
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text mb-4">Upcoming Milestones</h3>
            <div className="bg-bg-elev rounded-lg p-4 border border-border">
              <ul className="space-y-3">
                {currentProjectDetails.upcomingMilestones.map(milestone => (
                  <li key={milestone.id} className="flex justify-between items-center">
                    <p className="text-text text-base font-medium flex items-center gap-2"><span role="img" aria-label="milestone">🎯</span> {milestone.name}</p>
                    <span className="text-accent text-sm">{milestone.date}</span>
                  </li>
                ))}
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
              <span role="img" aria-label="submitted" className="text-3xl">🎉</span> <span className="font-semibold text-lg">{submissionMessage}</span>
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
                {submissionMessage && !isSubmitted && (
                  <p className="text-red-400 text-sm mb-4">{submissionMessage}</p>
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
                    Submit
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
            <p className="text-text text-lg mb-4"><strong>Team Code:</strong> <span className="font-mono text-accent select-all">FINTECH-XYZ</span></p>
            <h3 className="text-xl font-semibold text-text mt-6 mb-3">Members:</h3>
            <ul className="space-y-2 text-muted">
              {teamMembers.map((member) => (
                <li key={member.id} className="flex items-center gap-2"><span role="img" aria-label="member">👨‍💻</span> {member.name} - <span className="text-primary-2">({member.role})</span></li>
              ))}
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
              {currentProjectDetails.mentors.map(mentor => (
                <div key={mentor.id} className="flex items-center gap-2">
                  <span role="img" aria-label="mentor" className="text-xl">🧑‍🏫</span>
                  <div>
                    <p className="text-text text-base font-semibold">{mentor.name}</p>
                    <p className="text-muted text-xs">{mentor.role} ({mentor.availability})</p>
                  </div>
                </div>
              ))}
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
            <div className="h-64 bg-bg-elev rounded-lg p-4 flex flex-col justify-end text-muted space-y-2 overflow-y-auto mb-4 border border-border">
              {/* Dummy mentor chat messages */}
              <p className="text-sm text-text"><span className="font-semibold text-accent">Mentor:</span> Hi Alice, how's the frontend integration going?</p>
              <p className="text-sm text-text"><span className="font-semibold text-primary">Participant:</span> Going well, just had a question about the API rate limits.</p>
              <p className="text-sm text-text"><span className="font-semibold text-accent">Mentor:</span> Ah, for that, you can implement a simple debouncer on your requests. Check out this resource: [link to doc]</p>
              <p className="text-sm text-text"><span className="font-semibold text-primary">Participant:</span> Got it, thanks! Will try that.</p>
            </div>
            <textarea
              className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="3"
              placeholder="Type your message to mentor..."
            ></textarea>
            <motion.button
              className="mt-4 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-colors duration-200 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message to Mentor
            </motion.button>
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
            <div className="h-64 bg-bg-elev rounded-lg p-4 flex flex-col justify-end text-muted space-y-2 overflow-y-auto mb-4 border border-border">
              {/* Dummy chat messages */}
              <p className="text-sm text-text"><span className="font-semibold text-primary">Alice:</span> Hey team, let's sync up on the frontend progress!</p>
              <p className="text-sm text-text"><span className="font-semibold text-green-400">Bob:</span> Sure, I've integrated the new API endpoints.</p>
              <p className="text-sm text-text"><span className="font-semibold text-blue-400">Charlie:</span> I'll update the design mockups based on the latest feedback.</p>
              <p className="text-sm text-text"><span className="font-semibold text-primary">Alice:</span> Great! Let's aim for a quick demo by end of day.</p>
            </div>
            <textarea
              className="w-full p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="3"
              placeholder="Type your message here..."
            ></textarea>
            <motion.button
              className="mt-4 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-colors duration-200 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default WorkspacePage;
