import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function MentorTeamsPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Mock data for demonstration
        setTimeout(() => {
          setTeams([
            {
              id: 1,
              name: 'TechTitans',
              project: 'AI-Powered Healthcare App',
              hackathon: 'AI Innovation Challenge 2024',
              members: [
                { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'SC' },
                { name: 'Mike Johnson', role: 'AI/ML Engineer', avatar: 'MJ' },
                { name: 'Emma Davis', role: 'UI/UX Designer', avatar: 'ED' },
                { name: 'Alex Kim', role: 'Backend Engineer', avatar: 'AK' }
              ],
              status: 'Active',
              progress: 75,
              priority: 'High',
              lastActivity: '2 hours ago',
              technologies: ['React Native', 'Python', 'TensorFlow', 'Node.js'],
              description: 'An innovative AI-powered mobile application designed to assist healthcare professionals in diagnosing diseases earlier and more accurately.',
              milestones: [
                { name: 'Project Setup', completed: true, date: 'Dec 10, 2024' },
                { name: 'UI/UX Design', completed: true, date: 'Dec 12, 2024' },
                { name: 'Backend Development', completed: false, date: 'Dec 18, 2024' },
                { name: 'AI Model Training', completed: false, date: 'Dec 20, 2024' }
              ]
            },
            {
              id: 2,
              name: 'DataDrivers',
              project: 'Smart Analytics Dashboard',
              hackathon: 'Web3 Development Hackathon',
              members: [
                { name: 'John Smith', role: 'Full Stack Developer', avatar: 'JS' },
                { name: 'Lisa Wang', role: 'Data Scientist', avatar: 'LW' },
                { name: 'David Lee', role: 'Blockchain Developer', avatar: 'DL' }
              ],
              status: 'Active',
              progress: 60,
              priority: 'Medium',
              lastActivity: '1 day ago',
              technologies: ['Vue.js', 'Python', 'D3.js', 'Blockchain'],
              description: 'A comprehensive analytics dashboard for blockchain data visualization and insights.',
              milestones: [
                { name: 'Project Setup', completed: true, date: 'Dec 8, 2024' },
                { name: 'Data Pipeline', completed: true, date: 'Dec 12, 2024' },
                { name: 'Frontend Development', completed: false, date: 'Dec 16, 2024' },
                { name: 'Blockchain Integration', completed: false, date: 'Dec 18, 2024' }
              ]
            },
            {
              id: 3,
              name: 'CodeCrafters',
              project: 'Blockchain Voting System',
              hackathon: 'Fintech Revolution',
              members: [
                { name: 'Anna Brown', role: 'Smart Contract Developer', avatar: 'AB' },
                { name: 'Tom Wilson', role: 'Frontend Developer', avatar: 'TW' },
                { name: 'Maria Garcia', role: 'Backend Developer', avatar: 'MG' },
                { name: 'James Taylor', role: 'Security Expert', avatar: 'JT' },
                { name: 'Sophie Chen', role: 'UI/UX Designer', avatar: 'SC' }
              ],
              status: 'Completed',
              progress: 100,
              priority: 'Low',
              lastActivity: '3 days ago',
              technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum'],
              description: 'A secure and transparent voting system built on blockchain technology.',
              milestones: [
                { name: 'Project Setup', completed: true, date: 'Dec 5, 2024' },
                { name: 'Smart Contract Development', completed: true, date: 'Dec 10, 2024' },
                { name: 'Frontend Development', completed: true, date: 'Dec 14, 2024' },
                { name: 'Security Audit', completed: true, date: 'Dec 16, 2024' }
              ]
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team => {
    if (filter === 'all') return true;
    return team.status.toLowerCase() === filter.toLowerCase();
  });


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
          <h1 className="text-4xl font-bold text-text mb-2">My Teams</h1>
          <p className="text-muted">Manage and mentor your assigned teams</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        {['all', 'active', 'completed', 'pending'].map((status) => (
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

      {/* Teams List */}
      <div className="space-y-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-text mb-2">{team.name}</h3>
                <p className="text-lg text-muted mb-2">{team.project}</p>
                <p className="text-sm text-muted mb-4">{team.hackathon}</p>
                <p className="text-muted leading-relaxed mb-4">{team.description}</p>
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

            {/* Team Members */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text mb-3">Team Members</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {team.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-text text-sm">{member.name}</p>
                      <p className="text-xs text-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {team.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-bg-elev text-text rounded-full text-sm border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-text">Project Progress</h4>
                <span className="text-sm font-semibold text-text">{team.progress}%</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-primary-2 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${team.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text mb-3">Project Milestones</h4>
              <div className="space-y-2">
                {team.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      milestone.completed ? 'bg-green-500' : 'bg-bg-elev border border-border'
                    }`}>
                      {milestone.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        milestone.completed ? 'text-text' : 'text-muted'
                      }`}>
                        {milestone.name}
                      </p>
                      <p className="text-xs text-muted">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div>
                <span className="text-muted">Members:</span>
                <span className="ml-2 text-text font-semibold">{team.members.length}</span>
              </div>
              <div>
                <span className="text-muted">Last Activity:</span>
                <span className="ml-2 text-text font-semibold">{team.lastActivity}</span>
              </div>
              <div>
                <span className="text-muted">Priority:</span>
                <span className="ml-2 text-text font-semibold">{team.priority}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                to={`/mentor/chat?team=${team.id}`}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors"
              >
                💬 Chat
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-bg-elev rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">👥</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">No teams found</h3>
          <p className="text-muted mb-6">No teams match your current filter criteria.</p>
          <button 
            onClick={() => setFilter('all')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
          >
            View All Teams
          </button>
        </div>
      )}

    </main>
  );
}
