import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import { AuthContext } from '../../../context/AuthContext';

const MyTeamInfo = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [team, setTeam] = useState(null);
  const [hackathonName, setHackathonName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTeam = async () => {
      if (!user || !token || authLoading) {
        setLoading(false);
        return;
      }

      try {
        const userProfile = await api.getProfile(token);
        if (userProfile && userProfile.hackathonsParticipating && userProfile.hackathonsParticipating.length > 0) {
          // For simplicity, let's assume we display info for the first active hackathon
          const firstHackathonId = userProfile.hackathonsParticipating[0];
          const teamData = await api.getUserTeam(firstHackathonId, token);
          if (teamData && teamData._id) {
            setTeam(teamData);
            const hackathonData = await api.getHackathonById(firstHackathonId);
            setHackathonName(hackathonData ? hackathonData.name : 'Unknown Hackathon');
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user team:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchUserTeam();
  }, [user, token, authLoading]);

  if (authLoading || loading) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-text">Loading team info...</section>;
  }

  if (error) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-red-500">Error: {error.message}</section>;
  }

  if (!user) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-text">Please log in to see your team info.</section>;
  }

  if (!team) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-muted">You are not part of any team in an active hackathon.</section>;
  }

  return (
    <section className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-text mb-4">My Team</h2>
      <p className="text-muted mb-6">{team.name} • {hackathonName}</p>
      <div className="space-y-4">
        {team.members.filter(member => member.status === 'accepted').map((member) => (
          <div key={member.user._id} className="flex items-center gap-4">
            <img src={member.user.avatar || `https://ui-avatars.com/api/?name=${member.user.username}`} alt={member.user.username} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="text-lg font-semibold text-text">{member.user.username} {member.user._id === team.leader._id && '(Leader)'}</h3>
              {/* <p className="text-muted text-sm">Full Stack Dev</p> */} {/* Role is not in user model yet */}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-muted text-sm">Last activity: 2 hours ago <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">3 new</span></div>
      <Link to={`/participant/team?hackathonId=${team.hackathon}&teamId=${team._id}`} className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Open Team Chat</Link>
    </section>
  );
};

export default MyTeamInfo;
