import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

const TeamPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hackathonId = queryParams.get('hackathonId');
  const teamId = queryParams.get('teamId');

  const { user, token, loading: authLoading } = useContext(AuthContext);

  const [currentTeam, setCurrentTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);

  const isLeader = currentTeam && user ? currentTeam.leader._id === user.id : false;

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (!teamId || !token || authLoading) {
        setLoading(false);
        return;
      }
      try {
        const teamData = await api.getTeamById(teamId, token);
        setCurrentTeam(teamData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching team details:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, [teamId, token, authLoading]);

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);
    if (!inviteEmail || !isLeader) return;

    try {
      const res = await api.inviteMember(teamId, inviteEmail, token);
      if (res.message) {
        setResponseMessage({ type: 'error', text: res.message });
      } else {
        setCurrentTeam(res.team); // Assuming API returns updated team
        setResponseMessage({ type: 'success', text: `Invitation sent to ${inviteEmail}.` });
        setInviteEmail('');
      }
    } catch (err) {
      console.error("Error inviting member:", err);
      setResponseMessage({ type: 'error', text: err.message || 'Failed to send invitation.' });
    }
  };

  const handleRespondToInvite = async (memberId, action) => {
    setResponseMessage(null);
    if (!token) return;

    try {
      const res = await api.respondToInvitation(teamId, action, token);
      if (res.message) {
        setResponseMessage({ type: 'error', text: res.message });
      } else {
        setCurrentTeam(res.team); // Assuming API returns updated team
        setResponseMessage({ type: 'success', text: `Invitation ${action}ed successfully.` });
      }
    } catch (err) {
      console.error("Error responding to invitation:", err);
      setResponseMessage({ type: 'error', text: err.message || 'Failed to respond to invitation.' });
    }
  };

  const handleRemoveMember = async (memberId) => {
    setResponseMessage(null);
    if (!isLeader) return;

    try {
      const res = await api.removeMember(teamId, memberId, token);
      if (res.message) {
        setResponseMessage({ type: 'error', text: res.message });
      } else {
        setCurrentTeam(res.team); // Assuming API returns updated team
        setResponseMessage({ type: 'success', text: `Member removed successfully.` });
      }
    } catch (err) {
      console.error("Error removing member:", err);
      setResponseMessage({ type: 'error', text: err.message || 'Failed to remove member.' });
    }
  };

  if (authLoading || loading) {
    return <main className="flex-grow container mx-auto p-4 pt-20 text-center text-text">Loading team details...</main>;
  }

  if (error) {
    return <main className="flex-grow container mx-auto p-4 pt-20 text-center text-red-500">Error: {error.message}</main>;
  }

  if (!currentTeam) {
    return <main className="flex-grow container mx-auto p-4 pt-20 text-center text-text">Team not found or you are not a member.</main>;
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold text-text mb-4">My Team: {currentTeam.name}</h1>
      <p className="text-muted mb-8">Manage your team and collaborate for the hackathon.</p>

      {responseMessage && (
        <div className={`p-3 mb-4 rounded-lg text-white ${responseMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {responseMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Team Details & Members */}
        <div className="bg-card rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-text mb-4">Team Information</h2>
          <p className="text-text mb-2"><strong>Hackathon ID:</strong> <span className="font-medium text-primary">{hackathonId || 'N/A'}</span></p>
          <p className="text-text mb-2"><strong>Team ID:</strong> <span className="font-medium text-primary">{teamId || 'N/A'}</span></p>
          <p className="text-text mb-2"><strong>Team Leader:</strong> <span className="font-medium text-primary">{currentTeam.leader ? currentTeam.leader.username : 'N/A'}</span></p>
          <p className="text-text mb-2"><strong>Team Code:</strong> <span className="font-medium text-primary">{currentTeam.code || 'N/A'}</span></p>

          <h3 className="text-xl font-semibold text-text mt-6 mb-3">Members ({currentTeam.members.filter(m => m.status === 'accepted').length}):</h3>
          <ul className="list-disc pl-5 text-text space-y-2">
            {currentTeam.members.filter(m => m.status === 'accepted').map((member) => (
              <li key={member.user._id} className="flex items-center justify-between">
                <span>{member.user.username} {member.user._id === currentTeam.leader._id && '(Leader)'}</span>
                {isLeader && member.user._id !== currentTeam.leader._id && (
                  <button onClick={() => handleRemoveMember(member.user._id)} className="ml-4 text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
                )}
              </li>
            ))}
          </ul>

          {currentTeam.members.filter(m => m.status === 'pending').length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-text mb-3">Pending Invitations:</h3>
              <ul className="list-disc pl-5 text-text space-y-2">
                {currentTeam.members.filter(m => m.status === 'pending').map((member) => (
                  <li key={member.user._id} className="flex items-center justify-between">
                    <span>{member.user.username} (pending)</span>
                    <span className="flex gap-2">
                      <button onClick={() => handleRespondToInvite(member.user._id, 'accepted')} className="text-green-500 hover:text-green-700 text-sm font-semibold">Accept</button>
                      <button onClick={() => handleRespondToInvite(member.user._id, 'rejected')} className="text-red-500 hover:text-red-700 text-sm font-semibold">Reject</button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Team Chat & Invite Member */}
        <div className="space-y-8">
          {isLeader && (
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-text mb-4">Invite Member</h2>
              <form onSubmit={handleInviteSubmit}>
                <input
                  type="email"
                  placeholder="Member Email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-bg-elev border border-border text-text mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button type="submit" className="w-full px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">Send Invite</button>
              </form>
            </div>
          )}

          <div className="bg-card rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">Team Chat</h2>
            <div className="h-64 bg-bg-elev rounded-lg p-4 flex flex-col justify-end text-muted space-y-2 overflow-y-auto">
              {/* Dummy chat messages */}
              <p className="text-sm text-text"><span className="font-semibold text-primary">John Doe:</span> Hey team, let's brainstorm some ideas!</p>
              <p className="text-sm text-text"><span className="font-semibold text-green-400">Alice:</span> Sounds good! I've been researching some AI models.</p>
              <p className="text-sm text-text"><span className="font-semibold text-blue-400">Bob:</span> I'll start setting up the development environment.</p>
              <p className="text-sm text-text"><span className="font-semibold text-primary">John Doe:</span> Awesome! Let's target a quick sync tomorrow morning.</p>
            </div>
            <textarea
              className="w-full mt-4 p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Type your message here..."
            ></textarea>
            <button className="mt-4 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">Send Message</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamPage;
