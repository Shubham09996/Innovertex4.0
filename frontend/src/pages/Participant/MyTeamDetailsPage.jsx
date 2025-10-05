import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { SocketContext } from '../../context/SocketContext';

export default function MyTeamDetailsPage() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { 
    currentTeamChat, setCurrentTeamChat, 
    currentMentorChat, setCurrentMentorChat,
    teamMessages, setTeamMessages,
    mentorMessages, setMentorMessages,
    sendTeamMessage, sendMentorMessage,
    joinTeamChat, joinMentorChat, // Changed from joinChatRoom, leaveChatRoom
    loadHistoricalTeamMessages, loadHistoricalMentorMessages // Added for loading messages
  } = useContext(ChatContext);
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectUrl, setProjectUrl] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [teamNameInput, setTeamNameInput] = useState(''); // For renaming team
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);

  const handleSaveTeamName = async () => {
    try {
      // Assuming an api.updateTeam function exists to update team details
      // You might need to implement this in your api.js and backend
      const updatedTeam = await api.updateTeam(team._id, { name: teamNameInput }, token);
      setTeam(updatedTeam);
      setIsEditingTeamName(false);
    } catch (err) {
      console.error("Error updating team name:", err);
      alert("Failed to update team name.");
    }
  };

  const handleLeaveTeam = async () => {
    if (window.confirm("Are you sure you want to leave this team?")) {
      try {
        await api.leaveTeam(team._id, token);
        alert("You have left the team.");
        navigate('/participant/my-hackathons'); // Redirect to my hackathons page
      } catch (err) {
        console.error("Error leaving team:", err);
        alert("Failed to leave team.");
      }
    }
  };

  const handleSubmitSubmission = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        hackathon: hackathonId,
        team: team._id,
        projectUrl,
        repoLink,
      };
      const response = await api.createOrUpdateSubmission(submissionData, token);
      setTeam(prevTeam => ({
        ...prevTeam,
        submission: response // Update the team object with the new/updated submission
      }));
      alert("Submission updated successfully!");
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("Failed to submit project.");
    }
  };

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        if (!token || !hackathonId) return;

        const fetchedTeam = await api.getUserTeam(hackathonId, token);
        setTeam(fetchedTeam);
        setTeamNameInput(fetchedTeam.name);
        setProjectUrl(fetchedTeam.submission?.projectUrl || '');
        setRepoLink(fetchedTeam.submission?.repoLink || '');
        
        if (fetchedTeam && socket) {
          joinTeamChat(`team-${fetchedTeam._id}`);
          setCurrentTeamChat(fetchedTeam._id);
          if (fetchedTeam.mentor) {
            // Assuming mentor object has _id
            joinMentorChat(`mentor-${fetchedTeam.mentor._id}-${fetchedTeam._id}`);
            setCurrentMentorChat(fetchedTeam.mentor._id);
          }
        }
        
      } catch (err) {
        console.error("Error fetching team details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
    
    return () => {
      if (team && socket) {
        // The original code had leaveChatRoom, but it's not in the new destructuring.
        // Assuming the intent was to remove it or that it's handled by joinTeamChat/joinMentorChat.
        // For now, removing it as it's not in the new destructuring.
        // if (team.mentor) {
        //   leaveChatRoom(`mentor-${team.mentor._id}-${team._id}`);
        // }
      }
    };
  }, [hackathonId, token, user, socket, joinTeamChat, joinMentorChat, setCurrentTeamChat, setCurrentMentorChat, team?._id, team?.mentor?._id]);

  if (loading) {
    return <div className="text-center py-8 text-text">Loading team details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  if (!team) {
    return (
      <div className="flex-grow container mx-auto p-4 pt-20 text-center text-text">
        <h1 className="text-2xl font-bold mb-4">No Team Found</h1>
        <p>You are not part of a team for this hackathon, or the hackathon does not exist.</p>
        <button 
          onClick={() => navigate('/participant/hackathons')}
          className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-2 transition-colors"
        >
          Explore Hackathons
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow container mx-auto p-4 pt-20 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-text">
          {team.name} <span className="text-primary">Team Dashboard</span>
        </h1>
        {isEditingTeamName ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={teamNameInput}
              onChange={(e) => setTeamNameInput(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              onClick={handleSaveTeamName}
              className="btn bg-primary text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditingTeamName(false)}
              className="btn bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={() => {
              setIsEditingTeamName(true);
              setTeamNameInput(team.name);
            }}
            className="btn bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            ✏️ Edit Team Name
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Team Details */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-4">Team Members</h2>
          <div className="space-y-3">
            {team.members.map((member) => (
              <div key={member.user._id} className="flex items-center gap-3">
                <img
                  src={member.user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${member.user.username}`}
                  alt={member.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-text font-semibold">{member.user.username}</p>
                  <p className="text-muted text-sm">{member.status} {team.leader._id === user._id && '(Leader)'}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-bold text-text mt-6 mb-3">Team Code</h3>
          <div className="bg-bg-elev border border-border rounded-lg p-3 flex items-center justify-between">
            <p className="font-mono text-primary-2 text-lg break-all">{team._id}</p>
            <button
              onClick={() => navigator.clipboard.writeText(team._id)}
              className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-2 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-muted text-sm mt-2">Share this code with others to invite them to your team.</p>

          {/* Leave Team */}
          {team.leader._id !== user._id && (
            <button
              onClick={handleLeaveTeam}
              className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Leave Team
            </button>
          )}
        </div>

        {/* Project Details & Submission */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-4">Project Details & Submission</h2>
          <form onSubmit={handleSubmitSubmission} className="space-y-4">
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-semibold text-text mb-2">Project URL</label>
              <input
                type="url"
                id="projectUrl"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="e.g., https://your-project-demo.com"
                className="w-full px-4 py-3 bg-bg-elev border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="repoLink" className="block text-sm font-semibold text-text mb-2">Repository Link</label>
              <input
                type="url"
                id="repoLink"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
                placeholder="e.g., https://github.com/your-team/your-project"
                className="w-full px-4 py-3 bg-bg-elev border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
            >
              {team.submission ? 'Update Submission' : 'Submit Project'}
            </button>
          </form>
        </div>
      </div>

      {/* Chat Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Chat */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-[500px]">
          <h2 className="text-2xl font-bold text-text mb-4">Team Chat</h2>
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-bg-elev rounded-lg mb-4">
            {teamMessages[currentTeamChat]?.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg max-w-[70%] ${msg.sender === user._id ? 'bg-primary text-white' : 'bg-gray-700 text-text'}`}>
                  <p className="font-semibold">{msg.sender === user._id ? 'You' : msg.senderName || 'Unknown'}</p>
                  <p>{msg.message}</p>
                  <span className="text-xs text-right block mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const messageInput = e.target.elements.teamMessage;
              sendTeamMessage(currentTeamChat, messageInput.value);
              messageInput.value = '';
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              name="teamMessage"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button type="submit" className="btn bg-primary text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </form>
        </div>

        {/* Mentor Chat */}
        {team.mentor && (
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-[500px]">
            <h2 className="text-2xl font-bold text-text mb-4">Mentor Chat</h2>
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-bg-elev rounded-lg mb-4">
              {mentorMessages[currentMentorChat]?.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-lg max-w-[70%] ${msg.sender === user._id ? 'bg-primary text-white' : 'bg-gray-700 text-text'}`}>
                    <p className="font-semibold">{msg.sender === user._id ? 'You' : msg.senderName || 'Unknown'}</p>
                    <p>{msg.message}</p>
                    <span className="text-xs text-right block mt-1 opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const messageInput = e.target.elements.mentorMessage;
                sendMentorMessage(currentMentorChat, messageInput.value);
                messageInput.value = '';
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                name="mentorMessage"
                placeholder="Type your message to your mentor..."
                className="flex-1 px-4 py-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button type="submit" className="btn bg-primary text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
