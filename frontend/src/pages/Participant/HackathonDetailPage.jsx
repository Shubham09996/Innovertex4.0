import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext'; // Assuming AuthContext exists

const HackathonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext); // Get user and token from AuthContext
  
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [registeredTeam, setRegisteredTeam] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const hackathonData = await api.getHackathonById(id);
        setHackathon(hackathonData);

        if (user && token) {
          const userTeamData = await api.getUserTeam(id, token);
          if (userTeamData && userTeamData._id) {
            setIsRegistered(true);
            setRegisteredTeam(userTeamData.name);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch hackathon details or user team:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchHackathonDetails();
  }, [id, user, token]);

  const handleRegisterClick = () => {
    setShowRegistrationOptions(true);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setRegistrationError(null);
    if (!teamName) return;

    try {
      const newTeam = await api.createTeam(teamName, id, token);
      if (newTeam.message) {
        setRegistrationError(newTeam.message);
        return;
      }
      setIsRegistered(true);
      setRegisteredTeam(newTeam.name);
      setShowRegistrationOptions(false);
      navigate(`/participant/my-hackathons/${hackathon._id}`);
    } catch (err) {
      console.error("Failed to create team:", err);
      setRegistrationError(err.message || "Failed to create team.");
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setRegistrationError(null);
    if (!inviteCode) return;

    try {
      const joinedTeam = await api.joinTeam(inviteCode, token);
      if (joinedTeam.message) {
        setRegistrationError(joinedTeam.message);
        return;
      }
      setIsRegistered(true);
      setRegisteredTeam(joinedTeam.team.name); // Assuming the API returns team object
      setShowRegistrationOptions(false);
      navigate(`/participant/my-hackathons/${hackathon._id}`);
    } catch (err) {
      console.error("Failed to join team:", err);
      setRegistrationError(err.message || "Failed to join team.");
    }
  };

  if (loading) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-text">Loading hackathon details...</main>;
  }

  if (error) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-red-500">Error: {error.message}</main>;
  }

  if (!hackathon) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-red-500">Hackathon not found.</main>;
  }

  return (
    <main className="flex-grow container mx-auto max-w-2xl pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-card rounded-xl shadow-lg p-6 my-8"
      >
        <h1 className="text-4xl font-bold text-text mb-4">{hackathon.name}</h1>
        <p className="text-muted text-lg mb-8">{hackathon.description}</p>

        <div className="overflow-hidden mb-8 rounded-lg">
          <img src={hackathon.imageUrl || `https://picsum.photos/seed/${hackathon._id}/800/400`} alt={hackathon.name} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">About the Hackathon</h2>
            <p className="text-text mb-6">{hackathon.longDescription || hackathon.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-muted font-medium">Dates:</p>
                <p className="text-text">{new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted font-medium">Location:</p>
                <p className="text-text">{hackathon.location || 'Online'}</p>
              </div>
              <div>
                <p className="text-muted font-medium">Prize Pool:</p>
                <p className="text-primary font-bold text-lg">{hackathon.prize || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted font-medium">Eligibility:</p>
                <p className="text-text">{hackathon.eligibility || 'All'}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-muted font-medium mb-2">Key Technologies:</p>
              <div className="flex flex-wrap gap-2">
                {hackathon.technologies && hackathon.technologies.map((tech, index) => (
                  <span key={index} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Section */}
          <div className="mt-8 p-6 bg-bg-elev rounded-lg border border-border">
            <h2 className="text-2xl font-semibold text-text mb-4">Registration</h2>
            {registrationError && <p className="text-red-500 mb-4">{registrationError}</p>}
            <AnimatePresence mode="wait">
              {!isRegistered ? (
                !showRegistrationOptions ? (
                  <motion.button
                    key="register-button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleRegisterClick}
                    className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register for Hackathon
                  </motion.button>
                ) : (
                  <motion.div
                    key="registration-options"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card rounded-xl shadow-lg p-6 max-w-md mx-auto flex flex-col gap-6"
                  >
                    {/* Create Team */}
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-text mb-3">Create New Team</h3>
                      <form onSubmit={handleCreateTeam}>
                        <input
                          type="text"
                          placeholder="Team Name"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="w-full p-3 rounded-lg bg-bg-elev border border-border text-text mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                        <motion.button
                          type="submit"
                          className="w-full px-4 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Create & Register
                        </motion.button>
                      </form>
                    </div>
                    {/* Join Team */}
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-text mb-3">Want to Join a Team?</h3>
                      <form onSubmit={handleJoinTeam}>
                        <input
                          type="text"
                          placeholder="Team Invite Code / ID"
                          value={inviteCode}
                          onChange={(e) => setInviteCode(e.target.value)}
                          className="w-full p-3 rounded-lg bg-bg-elev border border-border text-text mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                        <motion.button
                          type="submit"
                          className="w-full px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Join Team
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )
              ) : (
                <motion.p
                  key="registered-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-text text-lg"
                >
                  You are already registered for this hackathon with team: <span className="font-bold text-primary">{registeredTeam}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default HackathonDetailPage;
