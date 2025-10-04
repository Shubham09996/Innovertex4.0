import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

const MyHackathonsPage = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [registeredHackathons, setRegisteredHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredHackathons = async () => {
      if (!user || !token || authLoading) {
        setLoading(false);
        return;
      }
      try {
        // Fetch user profile to get registered hackathons if linked there
        // Or fetch directly if there's an endpoint for it
        const userProfile = await api.getProfile(token);
        if (userProfile && userProfile.hackathonsParticipating) { // Assuming user has a list of hackathons they are part of
          const hackathonDetailsPromises = userProfile.hackathonsParticipating.map(async (hackathonId) => {
            // For each hackathon, get its details and the user's team in it
            const hackathonData = await api.getHackathonById(hackathonId);
            const teamData = await api.getUserTeam(hackathonId, token);
            const submissionData = await api.getSubmission(hackathonId, teamData._id, token); // Fetch submission data

            let progress = 0;
            if (submissionData && submissionData._id) {
              progress = 50; // Basic progress: 50% if submitted
              // Further logic can be added here for judging, completion etc.
            }

            return { ...hackathonData, teamInfo: teamData, progress, submissionInfo: submissionData }; // Include progress and submissionInfo
          });
          const detailedHackathons = await Promise.all(hackathonDetailsPromises);
          setRegisteredHackathons(detailedHackathons.filter(h => h.teamInfo && h.teamInfo._id)); // Only show if user is in a team
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching registered hackathons:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchRegisteredHackathons();
  }, [user, token, authLoading]);

  if (authLoading || loading) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-text">Loading your hackathons...</main>;
  }

  if (error) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-red-500">Error: {error.message}</main>;
  }

  if (!user) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-text">Please log in to view your hackathons.</main>;
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      <h1 className="text-5xl font-bold text-primary mb-12 text-center">My Active Hackathons</h1>
      <p className="text-xl text-muted mb-10 text-center">Manage hackathons you are currently participating in.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {registeredHackathons.length > 0 ? (
          registeredHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.3)", rotate: 1 }}
              className="bg-gradient-to-br from-card-start to-card-end rounded-xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 ease-in-out border border-border"
            >
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">{hackathon.name}</h3>
                <p className="text-muted text-base mb-4">Your Team: <span className="font-bold text-primary">{hackathon.teamInfo.name}</span></p>
                
                <div className="text-base text-text mb-4 space-y-2">
                  <p className="flex items-center gap-2"><strong><span role="img" aria-label="leader">👑</span> Leader:</strong> {hackathon.teamInfo.leader ? hackathon.teamInfo.leader.username : 'N/A'}</p>
                  <p className="flex items-center gap-2"><strong><span role="img" aria-label="id">🆔</span> Team ID:</strong> <span className="font-mono text-accent select-all">{hackathon.teamInfo._id}</span></p>
                  {hackathon.teamInfo.code && <p className="flex items-center gap-2"><strong><span role="img" aria-label="code">🔑</span> Team Code:</strong> <span className="font-mono text-accent select-all">{hackathon.teamInfo.code}</span></p>}
                  <p className="flex items-center gap-2 mt-4"><strong><span role="img" aria-label="members">👥</span> Members:</strong></p>
                  <ul className="list-disc list-inside pl-6 text-muted">
                    {hackathon.teamInfo.members.map(member => (
                      <li key={member.user._id}>{member.user.username} {member.user._id === hackathon.teamInfo.leader._id && '(Leader)'}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress Bar - Dummy for now, integrate with submission status later */}
              <div className="mt-6">
                <p className="text-sm text-muted mb-2 flex items-center gap-2"><span role="img" aria-label="progress">📈</span> Progress: <span className="font-semibold text-text">{hackathon.progress}%</span></p>
                <div className="w-full bg-bg-elev rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${hackathon.progress}%` }}></div>
                </div>
              </div>

              <Link
                to={`/participant/workspace?hackathonId=${hackathon._id}&teamId=${hackathon.teamInfo._id}`}
                className="mt-6 px-6 py-3 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-all duration-200 text-center block"
              >
                Go to Team Workspace
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="lg:col-span-3 text-center text-muted">You haven't registered for any hackathons yet.</p>
        )}
      </div>
    </main>
  );
};

export default MyHackathonsPage;
