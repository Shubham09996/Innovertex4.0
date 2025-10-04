import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JudgeMentorshipPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('teams');
  const [assignedTeams, setAssignedTeams] = useState([]);
  const [mentorshipSessions, setMentorshipSessions] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAssignedTeams([
        {
          id: 1,
          name: 'TechTitans',
          hackathon: 'AI Innovation Challenge 2024',
          members: [
            { name: 'Sarah Chen', role: 'Team Lead', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Mike Johnson', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
            { name: 'Emma Davis', role: 'Designer', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
            { name: 'Alex Kim', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' }
          ],
          project: 'AI-Powered Healthcare App',
          status: 'Active',
          progress: 75,
          lastActivity: '2 hours ago',
          nextSession: 'Dec 20, 2024 at 2:00 PM',
          totalSessions: 5,
          completedSessions: 3
        },
        {
          id: 2,
          name: 'DataDrivers',
          hackathon: 'Web3 Development Hackathon',
          members: [
            { name: 'John Smith', role: 'Team Lead', avatar: 'https://randomuser.me/api/portraits/men/30.jpg' },
            { name: 'Lisa Wang', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
            { name: 'David Lee', role: 'Designer', avatar: 'https://randomuser.me/api/portraits/men/40.jpg' }
          ],
          project: 'Smart Analytics Dashboard',
          status: 'Active',
          progress: 60,
          lastActivity: '5 hours ago',
          nextSession: 'Dec 22, 2024 at 10:00 AM',
          totalSessions: 4,
          completedSessions: 2
        }
      ]);

      setMentorshipSessions([
        {
          id: 1,
          teamName: 'TechTitans',
          date: 'Dec 18, 2024',
          time: '2:00 PM - 3:00 PM',
          type: 'Technical Review',
          status: 'Completed',
          notes: 'Reviewed AI model architecture and provided feedback on data preprocessing techniques.',
          rating: 5
        },
        {
          id: 2,
          teamName: 'DataDrivers',
          date: 'Dec 19, 2024',
          time: '10:00 AM - 11:00 AM',
          type: 'Code Review',
          status: 'Completed',
          notes: 'Analyzed blockchain integration and suggested improvements for smart contract efficiency.',
          rating: 4
        },
        {
          id: 3,
          teamName: 'TechTitans',
          date: 'Dec 20, 2024',
          time: '2:00 PM - 3:00 PM',
          type: 'Project Planning',
          status: 'Scheduled',
          notes: 'Upcoming session to discuss final implementation and deployment strategy.',
          rating: null
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
          <h1 className="text-4xl font-bold text-text mb-2">Mentorship</h1>
          <p className="text-muted">Guide and support assigned teams</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
            📅 Schedule Session
          </button>
          <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
            📊 View Reports
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-6 py-3 text-lg font-semibold transition-colors ${
            activeTab === 'teams' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-text'
          }`}
        >
          Assigned Teams
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`px-6 py-3 text-lg font-semibold transition-colors ${
            activeTab === 'sessions' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-text'
          }`}
        >
          Mentorship Sessions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'teams' && (
        <div className="space-y-6">
          {assignedTeams.map((team) => (
            <div key={team.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text mb-2">{team.name}</h3>
                  <p className="text-lg text-muted mb-2">{team.project}</p>
                  <p className="text-sm text-muted mb-4">{team.hackathon}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(team.status)}`}>
                    {team.status}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-muted">Progress</p>
                    <p className="text-lg font-bold text-primary">{team.progress}%</p>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-text mb-3">Team Members</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {team.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev border border-border rounded-lg">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-text text-sm">{member.name}</p>
                        <p className="text-xs text-muted">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-text">Project Progress</span>
                  <span className="text-sm text-muted">{team.progress}%</span>
                </div>
                <div className="w-full bg-bg-elev rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${team.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Session Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-muted">Last Activity:</span>
                  <span className="ml-2 text-text font-semibold">{team.lastActivity}</span>
                </div>
                <div>
                  <span className="text-muted">Next Session:</span>
                  <span className="ml-2 text-text font-semibold">{team.nextSession}</span>
                </div>
                <div>
                  <span className="text-muted">Sessions:</span>
                  <span className="ml-2 text-text font-semibold">{team.completedSessions}/{team.totalSessions}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                  💬 Start Chat
                </button>
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                  📅 Schedule Session
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                  📋 View Project
                </button>
                <button className="px-6 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                  📊 Progress Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-6">
          {mentorshipSessions.map((session) => (
            <div key={session.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text mb-2">{session.teamName}</h3>
                  <p className="text-lg text-muted mb-2">{session.type}</p>
                  <p className="text-sm text-muted">{session.date} • {session.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                  {session.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < session.rating ? 'text-yellow-400' : 'text-gray-400'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {session.notes && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text mb-2">Session Notes</h4>
                  <p className="text-muted leading-relaxed">{session.notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                {session.status === 'Scheduled' ? (
                  <>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                      🎥 Join Session
                    </button>
                    <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                      ✏️ Edit Session
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                      📋 View Notes
                    </button>
                    <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                      📊 Rate Session
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {activeTab === 'teams' && assignedTeams.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-bg-elev rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">👥</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">No teams assigned</h3>
          <p className="text-muted mb-6">You haven't been assigned to any teams yet.</p>
        </div>
      )}

      {activeTab === 'sessions' && mentorshipSessions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-bg-elev rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📅</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">No sessions scheduled</h3>
          <p className="text-muted mb-6">No mentorship sessions have been scheduled yet.</p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors">
            Schedule First Session
          </button>
        </div>
      )}
    </main>
  );
}
