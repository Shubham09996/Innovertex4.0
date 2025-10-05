import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ===================== Reusable Chat Modal Component =====================
const ChatModal = ({
  onClose,
  title,
  messages,
  messageInput,
  setMessageInput,
  onSendMessage,
  currentUser,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-card border border-border rounded-xl w-full max-w-2xl h-[80vh] max-h-[700px] flex flex-col p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <h2 className="text-2xl font-bold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary transition-colors p-1 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-bg-elev rounded-lg mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === currentUser?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] ${
                  msg.sender === currentUser?._id
                    ? "bg-primary text-white"
                    : "bg-blue-700 text-white"
                }`}
              >
                <p className="font-semibold text-sm">
                  {msg.sender === currentUser?._id
                    ? "You"
                    : msg.senderName || "Unknown"}
                </p>
                <p>{msg.message}</p>
                <span className="text-xs text-right block mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={onSendMessage} className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
            autoFocus
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-2 transition-colors"
          >
            Send
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ===================== Main Component =====================
export default function WorkspacePage() {
  const { user, token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const {
    teamMessages,
    mentorMessages,
    sendTeamMessage,
    sendMentorMessage,
    joinTeamChat,
    joinMentorChat,
    loadHistoricalTeamMessages,
    loadHistoricalMentorMessages,
  } = useContext(ChatContext);

  const [searchParams] = useSearchParams();
  const hackathonId = searchParams.get("hackathonId");
  const teamId = searchParams.get("teamId");

  const [hackathon, setHackathon] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamMessageInput, setTeamMessageInput] = useState("");
  const [mentorMessageInput, setMentorMessageInput] = useState("");
  const [activeChat, setActiveChat] = useState(""); // 'team', 'mentor', or ''
  const [projectUrl, setProjectUrl] = useState("");
  const [repoLink, setRepoLink] = useState("");

  // ===================== Data Fetch =====================
  useEffect(() => {
    const fetchData = async () => {
      if (!hackathonId || !teamId || !token) {
        setError({
          message: "Missing hackathon ID, team ID, or authentication token.",
        });
        setLoading(false);
        return;
      }

      try {
        const fetchedHackathon = await api.getHackathonById(hackathonId);
        setHackathon(fetchedHackathon);

        const fetchedTeam = await api.getTeamById(teamId, token);
        setTeam(fetchedTeam);
        setProjectUrl(fetchedTeam.submission?.projectUrl || "");
        setRepoLink(fetchedTeam.submission?.repoLink || "");

        if (socket && fetchedTeam) {
          joinTeamChat(teamId, hackathonId);
          loadHistoricalTeamMessages(hackathonId, teamId);

          if (fetchedTeam.mentor) {
            joinMentorChat(hackathonId, fetchedTeam.mentor._id);
            loadHistoricalMentorMessages(hackathonId, fetchedTeam.mentor._id);
          }
        }
      } catch (err) {
        console.error("Error fetching workspace data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hackathonId, teamId, token, socket]);

  // ===================== Submit Project =====================
  const handleSubmitSubmission = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        hackathon: hackathonId,
        team: teamId,
        projectUrl,
        repoLink,
      };
      const response = await api.createOrUpdateSubmission(submissionData, token);
      setTeam((prevTeam) => ({
        ...prevTeam,
        submission: response,
      }));
      alert("Submission updated successfully!");
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("Failed to submit project.");
    }
  };

  // ===================== Send Chat Message =====================
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (activeChat === "team") {
      sendTeamMessage(teamId, hackathonId, teamMessageInput);
      setTeamMessageInput("");
    } else if (activeChat === "mentor" && team?.mentor) {
      sendMentorMessage(hackathonId, team.mentor._id, mentorMessageInput);
      setMentorMessageInput("");
    }
  };

  // ===================== Loading & Error UI =====================
  if (loading)
    return (
      <div className="flex-grow flex items-center justify-center text-text">
        Loading workspace...
      </div>
    );

  if (error)
    return (
      <div className="flex-grow flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    );

  if (!hackathon || !team)
    return (
      <div className="flex-grow flex items-center justify-center text-text">
        No Hackathon or Team data available. Check console for details.
      </div>
    );

  // ===================== Main UI =====================
  return (
    <>
      <div className="flex-grow container mx-auto p-4 pt-20 max-w-7xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-text mb-6 mt-6">
          {hackathon.name} -{" "}
          <span className="text-primary">Team: {team.name}</span> Workspace
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ================= Hackathon Card ================= */}
          <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-md transition hover:shadow-lg">
            <h2 className="text-2xl font-bold text-text mb-4">
              Hackathon Details
            </h2>
            <p className="text-muted mb-2">
              <strong>Status:</strong> {hackathon.status}
            </p>
            <p className="text-muted mb-2">
              <strong>Dates:</strong>{" "}
              {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
              {new Date(hackathon.endDate).toLocaleDateString()}
            </p>
            <p className="text-muted mb-2">
              <strong>Prize Pool:</strong> $
              {hackathon.prizePool
                ? hackathon.prizePool.toLocaleString()
                : "N/A"}
            </p>
            <p className="text-muted mb-2">
              <strong>Registration Deadline:</strong>{" "}
              {hackathon.registrationDeadline
                ? new Date(hackathon.registrationDeadline).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-muted mb-2">
              <strong>Description:</strong> {hackathon.description}
            </p>
            {hackathon.imageUrl && (
              <img
                src={hackathon.imageUrl}
                alt={hackathon.name}
                className="w-full h-48 object-cover rounded-md mt-4"
              />
            )}

            {/* ================= CHAT BUTTONS ================= */}
            <div className="flex flex-col gap-4 mt-6">
              {/* --- TEAM CHAT BUTTON --- */}
              <button
                onClick={() => setActiveChat("team")}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 bg-primary text-white hover:bg-primary-2"
              >
                Open Team Chat
              </button>

              {/* --- ALWAYS SHOW MENTOR CHAT BUTTON --- */}
              <button
                onClick={() => setActiveChat("mentor")}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 bg-purple-600 text-white hover:bg-purple-700"
              >
                Open Mentor Chat
              </button>
            </div>
          </div>

          {/* ================= Team Overview Card ================= */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-md transition hover:shadow-lg">
            <h2 className="text-2xl font-bold text-text mb-4">Team Overview</h2>
            <p className="text-muted mb-2">
              <strong>Team Leader:</strong> {team.leader?.username || "N/A"}
            </p>
            <h3 className="text-xl font-bold text-text mt-4 mb-3">Members:</h3>
            <div className="flex flex-wrap gap-4">
              {team.members?.length ? (
                team.members.map((member) => (
                  <div
                    key={member.user._id}
                    className="flex items-center gap-2 bg-bg-elev p-2 rounded-lg"
                  >
                    <img
                      src={
                        member.user.avatar ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${member.user.username}`
                      }
                      alt={member.user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-text">
                      {member.user.username}{" "}
                      {team.leader?._id === member.user._id && "(Leader)"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted">No team members found.</p>
              )}
            </div>

            {/* ================= Team Code ================= */}
            <h3 className="text-xl font-bold text-text mt-6 mb-3">Team Code</h3>
            <div className="bg-bg-elev border border-border rounded-lg p-3 flex items-center justify-between">
              <p className="font-mono text-primary-2 text-lg break-all">
                {team._id}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(team._id)}
                className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-2 transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-muted text-sm mt-2">
              Share this code with others to invite them to your team.
            </p>

            {/* ================= Project Submission ================= */}
            <h2 className="text-2xl font-bold text-text mt-8 mb-4">
              Project Submission
            </h2>
            <form onSubmit={handleSubmitSubmission} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://your-project-demo.com"
                  className="w-full px-4 py-3 bg-bg-elev border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Repository Link
                </label>
                <input
                  type="url"
                  value={repoLink}
                  onChange={(e) => setRepoLink(e.target.value)}
                  placeholder="https://github.com/your-team/your-project"
                  className="w-full px-4 py-3 bg-bg-elev border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                {team.submission ? "Update Submission" : "Submit Project"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= Chat Modal Render ================= */}
      <AnimatePresence>
        {activeChat && (
          <ChatModal
            onClose={() => setActiveChat("")}
            title={
              activeChat === "team"
                ? `Team Chat`
                : `Chat with Mentor`
            }
            messages={
              activeChat === "team"
                ? teamMessages[teamId] || []
                : mentorMessages[`${hackathonId}_${team.mentor?._id}`] || []
            }
            messageInput={
              activeChat === "team" ? teamMessageInput : mentorMessageInput
            }
            setMessageInput={
              activeChat === "team" ? setTeamMessageInput : setMentorMessageInput
            }
            onSendMessage={handleSendMessage}
            currentUser={user}
          />
        )}
      </AnimatePresence>
    </>
  );
}
