import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function MentorDashboardPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTeams: 0,
    activeTeams: 0,
    totalMessages: 0,
    avgResponseTime: 0
  });

  // Mock data for teams
  const [teams] = useState([
    {
      id: 1,
      name: 'TechTitans',
      project: 'AI-Powered Healthcare App',
      hackathon: 'AI Innovation Challenge 2024',
      members: 4,
      status: 'Active',
      lastActivity: '2 hours ago',
      progress: 75,
      priority: 'High'
    },
    {
      id: 2,
      name: 'DataDrivers',
      project: 'Smart Analytics Dashboard',
      hackathon: 'Web3 Development Hackathon',
      members: 3,
      status: 'Active',
      lastActivity: '1 day ago',
      progress: 60,
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'CodeCrafters',
      project: 'Blockchain Voting System',
      hackathon: 'Fintech Revolution',
      members: 5,
      status: 'Completed',
      lastActivity: '3 days ago',
      progress: 100,
      priority: 'Low'
    }
  ]);

  // Mock data for recent messages
  const [recentMessages] = useState([
    {
      id: 1,
      team: 'TechTitans',
      message: 'Need help with API integration',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      team: 'DataDrivers',
      message: 'Database optimization suggestions?',
      timestamp: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      team: 'CodeCrafters',
      message: 'Thank you for the guidance!',
      timestamp: '1 day ago',
      unread: false
    }
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStats({
        totalTeams: 8,
        activeTeams: 5,
        totalMessages: 24,
        avgResponseTime: 2.5
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <main className="flex-grow container mx-auto p-4 pt-24">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Mentor Dashboard</h1>
          <p className="text-muted">Guide and support your assigned teams</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Teams</p>
              <p className="text-3xl font-bold text-text">{stats.totalTeams}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Active Teams</p>
              <p className="text-3xl font-bold text-text">{stats.activeTeams}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-text">{stats.totalMessages}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Avg Response Time</p>
              <p className="text-3xl font-bold text-text">{stats.avgResponseTime}h</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assigned Teams */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Assigned Teams</h2>
            <Link 
              to="/mentor/teams"
              className="text-primary hover:text-primary-2 transition-colors font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text mb-1">{team.name}</h3>
                    <p className="text-muted mb-2">{team.project}</p>
                    <p className="text-sm text-muted">{team.hackathon}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(team.status)}`}>
                      {team.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(team.priority)}`}>
                      {team.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted">Progress</span>
                    <span className="text-sm font-semibold text-text">{team.progress}%</span>
                  </div>
                  <div className="w-full bg-bg-elev rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${team.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>👥 {team.members} members</span>
                    <span>🕒 {team.lastActivity}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/mentor/chat?team=${team.id}`}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors"
                    >
                      Chat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Recent Messages</h2>
            <Link 
              to="/mentor/chat"
              className="text-primary hover:text-primary-2 transition-colors font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-text">{message.team}</h4>
                  {message.unread && (
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </div>
                <p className="text-muted text-sm mb-2 line-clamp-2">{message.message}</p>
                <p className="text-xs text-muted">{message.timestamp}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
