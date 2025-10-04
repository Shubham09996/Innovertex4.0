import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HackathonsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API call
  const hackathons = [
    {
      id: 1,
      name: 'AI Innovation Challenge 2024',
      description: 'Build innovative AI solutions for real-world problems',
      status: 'Active',
      participants: 156,
      teams: 32,
      startDate: 'Dec 15, 2024',
      endDate: 'Dec 20, 2024',
      submissions: 28,
      prize: '$10,000',
      technology: ['AI/ML', 'Python', 'TensorFlow'],
      mode: 'Online'
    },
    {
      id: 2,
      name: 'Web3 Development Hackathon',
      description: 'Create decentralized applications on blockchain',
      status: 'Upcoming',
      participants: 89,
      teams: 18,
      startDate: 'Dec 25, 2024',
      endDate: 'Dec 30, 2024',
      submissions: 0,
      prize: '$5,000',
      technology: ['Blockchain', 'Solidity', 'Web3'],
      mode: 'Hybrid'
    },
    {
      id: 3,
      name: 'Fintech Revolution',
      description: 'Revolutionize financial services with technology',
      status: 'Ended',
      participants: 234,
      teams: 47,
      startDate: 'Nov 20, 2024',
      endDate: 'Nov 25, 2024',
      submissions: 45,
      prize: '$15,000',
      technology: ['React', 'Node.js', 'MongoDB'],
      mode: 'Offline'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Ended': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesFilter = filter === 'all' || hackathon.status.toLowerCase() === filter;
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">My Hackathons</h1>
          <p className="text-muted">Manage and track all your hackathon events</p>
        </div>
        <Link
          to="/organizer/hackathons/create"
          className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mt-4 lg:mt-0"
        >
          <span>+</span>
          <span>Create New Hackathon</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'upcoming', 'ended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-3 rounded-lg font-semibold transition-all capitalize ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-bg-elev text-text hover:bg-bg-elev/80'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2 group relative overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
            
            {/* Header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">{hackathon.name}</h3>
                <p className="text-muted text-sm mb-3 line-clamp-2 leading-relaxed">{hackathon.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-lg ${getStatusColor(hackathon.status)}`}>
                {hackathon.status}
              </span>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
              {hackathon.technology.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary text-xs font-bold rounded-full border border-primary/30 shadow-sm group-hover:scale-105 transition-transform duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Stats - Compact */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-4 mb-4 relative z-10">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">{hackathon.participants}</div>
                  <div className="text-xs text-muted">Participants</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{hackathon.teams}</div>
                  <div className="text-xs text-muted">Teams</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{hackathon.submissions}</div>
                  <div className="text-xs text-muted">Submissions</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{hackathon.prize}</div>
                  <div className="text-xs text-muted">Prize Pool</div>
                </div>
              </div>
            </div>

            {/* Date and Mode - Compact */}
            <div className="flex items-center justify-between mb-4 text-sm relative z-10">
              <span className="text-muted">📅 {hackathon.startDate} - {hackathon.endDate}</span>
              <span className="text-muted">🌐 {hackathon.mode}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 relative z-10">
              <Link
                to={`/organizer/hackathons/${hackathon.id}`}
                className="flex-1 bg-gradient-to-r from-primary to-primary-2 text-white py-2 px-3 rounded-lg text-xs font-bold hover:from-primary-2 hover:to-primary transition-all duration-200 shadow-lg hover:shadow-primary/25 transform hover:scale-105 text-center"
              >
                📋 Manage
              </Link>
              <Link
                to={`/organizer/hackathons/${hackathon.id}/analytics`}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-lg text-xs font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25 transform hover:scale-105 text-center"
              >
                📊 Analytics
              </Link>
              <Link
                to={`/organizer/hackathons/${hackathon.id}/edit`}
                className="flex-1 bg-transparent border border-border text-text py-2 px-3 rounded-lg text-xs font-bold hover:border-primary-300 hover:bg-primary/5 transition-all duration-200 transform hover:scale-105 text-center"
              >
                ✏️ Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHackathons.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🏆</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-4">No Hackathons Found</h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first hackathon to get started with organizing amazing events'
            }
          </p>
          <Link
            to="/organizer/hackathons/create"
            className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Create Your First Hackathon
          </Link>
        </div>
      )}
    </main>
  );
}
