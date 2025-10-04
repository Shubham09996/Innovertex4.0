import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

const MyHackathonsPage = () => {
  const activeHackathons = [
    {
      id: 'hackathon-fintech',
      name: 'Fintech Revolution 2024',
      teamName: 'Innovators Guild',
      teamId: 'team-innovators',
      teamLeader: 'John Doe',
      teamCode: 'FINTECH-XYZ',
      teamMembers: [
        { id: 'mem1', name: 'John Doe' },
        { id: 'mem2', name: 'Alice' },
        { id: 'mem3', name: 'Bob' },
      ],
      progress: 65,
    },
    {
      id: 'hackathon-healthtech',
      name: 'HealthTech Challenge',
      teamName: 'MediMinds',
      teamId: 'team-mediminds',
      teamLeader: 'Jane Smith',
      teamCode: 'HEALTH-ABC',
      teamMembers: [
        { id: 'mem4', name: 'Jane Smith' },
        { id: 'mem5', name: 'Charlie' },
      ],
      progress: 40,
    },
  ];

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      <h1 className="text-5xl font-bold text-primary mb-12 text-center">My Active Hackathons</h1>
      <p className="text-xl text-muted mb-10 text-center">Manage hackathons you are currently participating in.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeHackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.3)", rotate: 1 }}
            className="bg-gradient-to-br from-card-start to-card-end rounded-xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 ease-in-out border border-border"
          >
            <div>
              <h3 className="text-2xl font-bold text-text mb-2">{hackathon.name}</h3>
              <p className="text-muted text-base mb-4">Your Team: <span className="font-bold text-primary">{hackathon.teamName}</span></p>
              
              <div className="text-base text-text mb-4 space-y-2">
                <p className="flex items-center gap-2"><strong><span role="img" aria-label="leader">👑</span> Leader:</strong> {hackathon.teamLeader}</p>
                <p className="flex items-center gap-2"><strong><span role="img" aria-label="id">🆔</span> Team ID:</strong> <span className="font-mono text-accent select-all">{hackathon.teamId}</span></p>
                <p className="flex items-center gap-2"><strong><span role="img" aria-label="code">🔑</span> Team Code:</strong> <span className="font-mono text-accent select-all">{hackathon.teamCode}</span></p>
                <p className="flex items-center gap-2 mt-4"><strong><span role="img" aria-label="members">👥</span> Members:</strong></p>
                <ul className="list-disc list-inside pl-6 text-muted">
                  {hackathon.teamMembers.map(member => (
                    <li key={member.id}>{member.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <p className="text-sm text-muted mb-2 flex items-center gap-2"><span role="img" aria-label="progress">📈</span> Progress: <span className="font-semibold text-text">{hackathon.progress}%</span></p>
              <div className="w-full bg-bg-elev rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${hackathon.progress}%` }}></div>
              </div>
            </div>

            <Link
              to={`/participant/workspace/${hackathon.id}?teamId=${hackathon.teamId}`}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-2 transition-all duration-200 text-center block"
            >
              Go to Team Workspace
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default MyHackathonsPage;
