import React from 'react';
import { useLocation } from 'react-router-dom';

const TeamPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hackathonId = queryParams.get('hackathonId');
  const teamId = queryParams.get('teamId');

  // Dummy data for team members
  const teamMembers = [
    { id: 'mem1', name: 'Alice' },
    { id: 'mem2', name: 'Bob' },
    { id: 'mem3', name: 'Charlie' },
  ];

  return (
    <main className="flex-grow container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold text-text mb-4">My Team</h1>
      <p className="text-muted mb-8">Manage your team and collaborate for the hackathon.</p>

      <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-text mb-4">Team Details</h2>
        <p className="text-text mb-2"><strong>Hackathon ID:</strong> {hackathonId || 'N/A'}</p>
        <p className="text-text mb-2"><strong>Team ID:</strong> {teamId || 'N/A'}</p>
        <h3 className="text-xl font-semibold text-text mt-6 mb-3">Members:</h3>
        <ul className="list-disc pl-5 text-text">
          {teamMembers.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-card rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-text mb-4">Team Chat</h2>
        <div className="h-64 bg-bg-elev rounded-lg p-4 flex items-center justify-center text-muted">
          <p>Team chat interface will go here.</p>
        </div>
        <textarea
          className="w-full mt-4 p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
          placeholder="Type your message here..."
        ></textarea>
        <button className="mt-4 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">Send Message</button>
      </div>
    </main>
  );
};

export default TeamPage;
