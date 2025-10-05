import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

const ActiveHackathons = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [activeHackathons, setActiveHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActiveHackathons = async () => {
      if (!user || !token || authLoading) {
        setLoading(false);
        return;
      }
      try {
        const userProfile = await api.getProfile(token);
        if (userProfile) {
          const participantHackathons = userProfile.hackathonsParticipating || userProfile.assignedHackathons || [];

          const hackathonDetailsPromises = participantHackathons.map(async (hackathonId) => {
            const hackathonData = await api.getHackathonById(hackathonId);
            if (!hackathonData) return null;

            const teamData = await api.getUserTeam(hackathonData._id, token);
            // Only return hackathons that are still active (endDate in the future)
            if (new Date(hackathonData.endDate) > new Date()) {
              const submissionData = await api.getSubmission(hackathonData._id, teamData?._id, token); // Fetch submission data

              let progress = 0;
              if (submissionData && submissionData._id) {
                progress = 50; // Basic progress: 50% if submitted
              }
              return { ...hackathonData, teamInfo: teamData, progress, submissionInfo: submissionData }; // Include progress and submissionInfo
            }
            return null;
          });
          const activeHackathonsData = (await Promise.all(hackathonDetailsPromises)).filter(Boolean);
          setActiveHackathons(activeHackathonsData.filter(h => h.teamInfo && h.teamInfo._id));
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching active hackathons:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchActiveHackathons();
  }, [user, token, authLoading]);

  if (authLoading || loading) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-text">Loading active hackathons...</section>;
  }

  if (error) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-red-500">Error: {error.message}</section>;
  }

  return (
    <section className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-text mb-4">My Active Hackathons</h2>
      <p className="text-muted mb-6 text-sm sm:text-base">Hackathons you're currently participating in</p>
      {activeHackathons.length > 0 ? (
        activeHackathons.map((hackathon, index) => (
          <div key={hackathon._id} className="mb-4 p-4 bg-bg-elev rounded-lg border border-border hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-center mb-2">  
              <h3 className="text-lg font-semibold text-text">{hackathon.name}</h3>
              {/* Dynamically determine phase based on dates or submission status */}
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Development Phase</span>
            </div>
            <p className="text-muted text-sm mb-2">Team: <span className="font-semibold text-text">{hackathon.teamInfo.name}</span></p>
            <div className="text-muted text-sm mb-2">
              Submission Due: <span className="font-semibold text-text">{new Date(hackathon.endDate).toLocaleDateString()}</span>
            </div>
            <div className="mb-4">
              <div className="w-full bg-bg-dark rounded-full h-2.5">
                {/* Progress needs to be calculated based on submission status/project completion */}
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${hackathon.progress}%` }}></div>
              </div>
              <p className="text-sm text-muted mt-1">Progress: {hackathon.progress}%</p>
            </div>
            <Link to={`/participant/workspace?hackathonId=${hackathon._id}&teamId=${hackathon.teamInfo._id}`} className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Go to Workspace</Link>
          </div>
        ))
      ) : (
        <p className="text-muted text-center">No active hackathons found.</p>
      )}
    </section>
  );
};

export default ActiveHackathons;
