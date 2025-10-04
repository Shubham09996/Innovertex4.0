import React from 'react';
import { Link } from 'react-router-dom';

const MyHackathonsPage = () => {
  const activeHackathons = [
    {
      id: 'hackathon-fintech',
      name: 'Fintech Revolution 2024',
      teamName: 'Innovators Guild',
      teamId: 'team-innovators',
    },
    {
      id: 'hackathon-healthtech',
      name: 'HealthTech Challenge',
      teamName: 'MediMinds',
      teamId: 'team-mediminds',
    },
  ];

  return (
    <main className="flex-grow container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold text-text mb-8">My Active Hackathons</h1>
      <p className="text-muted mb-6">Manage hackathons you are currently participating in.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeHackathons.map((hackathon) => (
          <div key={hackathon.id} className="bg-card rounded-xl shadow-lg p-6 flex flex-col">
            <h3 className="text-xl font-semibold text-text mb-2">{hackathon.name}</h3>
            <p className="text-muted text-sm mb-4">Your Team: <span className="font-medium text-primary">{hackathon.teamName}</span></p>
            <Link
              to={`/participant/team?hackathonId=${hackathon.id}&teamId=${hackathon.teamId}`}
              className="mt-auto px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block"
            >
              Go to Team Chat
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyHackathonsPage;
