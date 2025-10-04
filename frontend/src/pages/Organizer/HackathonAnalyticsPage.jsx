import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function HackathonAnalyticsPage() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hackathon, setHackathon] = useState(null);

  // Mock data for specific hackathon analytics
  const hackathonData = {
    id: hackathonId,
    name: 'AI Innovation Challenge 2024',
    status: 'Active',
    startDate: 'Dec 15, 2024',
    endDate: 'Dec 20, 2024',
    totalParticipants: 284,
    totalTeams: 56,
    totalSubmissions: 42,
    prizePool: 25000,
    overview: {
      registrationRate: 85.2,
      submissionRate: 78.5,
      averageScore: 4.6,
      completionRate: 82.1
    },
    dailyStats: [
      { date: 'Dec 15', registrations: 45, submissions: 0, activity: 120 },
      { date: 'Dec 16', registrations: 38, submissions: 2, activity: 156 },
      { date: 'Dec 17', registrations: 42, submissions: 8, activity: 189 },
      { date: 'Dec 18', registrations: 35, submissions: 15, activity: 203 },
      { date: 'Dec 19', registrations: 28, submissions: 12, activity: 178 },
      { date: 'Dec 20', registrations: 15, submissions: 5, activity: 145 }
    ],
    topTeams: [
      { name: 'TechTitans', score: 98.5, members: 4, project: 'AI Healthcare App', status: 'Submitted' },
      { name: 'DataDrivers', score: 96.2, members: 3, project: 'ML Fraud Detection', status: 'Submitted' },
      { name: 'CodeMasters', score: 94.8, members: 3, project: 'Blockchain Voting', status: 'In Progress' },
      { name: 'InnovationHub', score: 93.1, members: 5, project: 'IoT Smart Home', status: 'Submitted' },
      { name: 'WebWizards', score: 91.7, members: 4, project: 'E-commerce Platform', status: 'In Progress' }
    ],
    technologyBreakdown: [
      { name: 'AI/ML', count: 18, percentage: 42.9 },
      { name: 'Web Development', count: 12, percentage: 28.6 },
      { name: 'Mobile Development', count: 8, percentage: 19.0 },
      { name: 'Blockchain', count: 4, percentage: 9.5 }
    ],
    judgeEvaluations: [
      { judge: 'Dr. Sarah Johnson', assignedTeams: 8, evaluationsCompleted: 6, averageScore: 4.7 },
      { judge: 'Prof. Michael Chen', assignedTeams: 7, evaluationsCompleted: 5, averageScore: 4.5 },
      { judge: 'Marcus Rodriguez', assignedTeams: 9, evaluationsCompleted: 7, averageScore: 4.8 }
    ],
    recentActivity: [
      { action: 'New submission received', team: 'TechTitans', time: '2 minutes ago' },
      { action: 'Judge evaluation completed', judge: 'Dr. Sarah Johnson', team: 'DataDrivers', time: '15 minutes ago' },
      { action: 'Team formed', team: 'CodeMasters', time: '1 hour ago' },
      { action: 'Submission deadline reminder', time: '2 hours ago' },
      { action: 'New registration', participant: 'Alex Kim', time: '3 hours ago' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHackathon(hackathonData);
      setLoading(false);
    }, 1000);
  }, [hackathonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Hackathon Not Found</h2>
          <button
            onClick={() => navigate('/organizer/hackathons')}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back to Hackathons
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate('/organizer/hackathons')}
              className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
            >
              ←
            </button>
            <h1 className="text-4xl font-bold text-text">{hackathon.name} Analytics</h1>
          </div>
          <p className="text-muted">Detailed insights and performance metrics</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            hackathon.status === 'Active' 
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
          }`}>
            {hackathon.status}
          </span>
          <span className="text-muted">{hackathon.startDate} - {hackathon.endDate}</span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            👥
          </div>
          <div className="text-3xl font-bold text-text mb-1">{hackathon.totalParticipants}</div>
          <div className="text-sm text-muted">Total Participants</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            🏆
          </div>
          <div className="text-3xl font-bold text-text mb-1">{hackathon.totalTeams}</div>
          <div className="text-sm text-muted">Total Teams</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            📝
          </div>
          <div className="text-3xl font-bold text-text mb-1">{hackathon.totalSubmissions}</div>
          <div className="text-sm text-muted">Submissions</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            💰
          </div>
          <div className="text-3xl font-bold text-text mb-1">${(hackathon.prizePool / 1000).toFixed(0)}K</div>
          <div className="text-sm text-muted">Prize Pool</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Registration Rate</h3>
          <div className="text-3xl font-bold text-text mb-2">{hackathon.overview.registrationRate}%</div>
          <div className="w-full bg-bg-elev rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full"
              style={{ width: `${hackathon.overview.registrationRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Submission Rate</h3>
          <div className="text-3xl font-bold text-text mb-2">{hackathon.overview.submissionRate}%</div>
          <div className="w-full bg-bg-elev rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
              style={{ width: `${hackathon.overview.submissionRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Average Score</h3>
          <div className="text-3xl font-bold text-text mb-2">{hackathon.overview.averageScore}/5</div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < Math.floor(hackathon.overview.averageScore) ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Completion Rate</h3>
          <div className="text-3xl font-bold text-text mb-2">{hackathon.overview.completionRate}%</div>
          <div className="w-full bg-bg-elev rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
              style={{ width: `${hackathon.overview.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Activity Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Daily Activity</h3>
          <div className="space-y-4">
            {hackathon.dailyStats.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-muted w-16">{day.date}</span>
                <div className="flex items-center gap-3 flex-1 mx-4">
                  <div className="flex-1 bg-bg-elev rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(day.activity / 250) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-muted">
                    <div>Reg: {day.registrations}</div>
                    <div>Sub: {day.submissions}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Breakdown */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Technology Stack</h3>
          <div className="space-y-4">
            {hackathon.technologyBreakdown.map((tech, index) => (
              <div key={tech.name} className="flex items-center justify-between">
                <span className="text-sm text-text">{tech.name}</span>
                <div className="flex items-center gap-3 flex-1 mx-4">
                  <div className="flex-1 bg-bg-elev rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${tech.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-text w-16 text-right">{tech.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Teams and Judge Evaluations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Performing Teams */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Top Performing Teams</h3>
          <div className="space-y-4">
            {hackathon.topTeams.map((team, index) => (
              <div key={team.name} className="flex items-center justify-between p-3 bg-bg-elev rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-2 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-text">{team.name}</div>
                    <div className="text-sm text-muted">{team.project}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-text">{team.score}</div>
                  <div className="text-sm text-muted">{team.members} members</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Judge Evaluations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Judge Evaluations</h3>
          <div className="space-y-4">
            {hackathon.judgeEvaluations.map((judge, index) => (
              <div key={judge.judge} className="flex items-center justify-between p-3 bg-bg-elev rounded-lg">
                <div>
                  <div className="font-semibold text-text">{judge.judge}</div>
                  <div className="text-sm text-muted">{judge.assignedTeams} teams assigned</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-text">{judge.evaluationsCompleted} completed</div>
                  <div className="text-sm text-muted">Avg: {judge.averageScore}/5</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-text mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {hackathon.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">
                📊
              </div>
              <div className="flex-1">
                <div className="text-sm text-text font-medium">{activity.action}</div>
                <div className="text-xs text-muted">
                  {activity.team && `Team: ${activity.team}`}
                  {activity.judge && `Judge: ${activity.judge}`}
                  {activity.participant && `Participant: ${activity.participant}`}
                </div>
              </div>
              <div className="text-xs text-muted">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
