import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AnalyticsPage() {
  const [selectedHackathon, setSelectedHackathon] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  // Mock data for analytics
  const analyticsData = {
    overview: {
      totalHackathons: 15,
      totalParticipants: 2847,
      totalSubmissions: 156,
      averageRating: 4.7,
      completionRate: 78.5,
      totalPrizeMoney: 125000
    },
    hackathons: [
      {
        id: 1,
        name: 'AI Innovation Challenge 2024',
        participants: 284,
        submissions: 42,
        completionRate: 85.2,
        averageScore: 4.8,
        prize: 25000,
        status: 'Active'
      },
      {
        id: 2,
        name: 'Web3 Development Hackathon',
        participants: 156,
        submissions: 0,
        completionRate: 0,
        averageScore: 0,
        prize: 15000,
        status: 'Upcoming'
      },
      {
        id: 3,
        name: 'Fintech Revolution',
        participants: 445,
        submissions: 78,
        completionRate: 82.1,
        averageScore: 4.6,
        prize: 35000,
        status: 'Ended'
      },
      {
        id: 4,
        name: 'HealthTech Innovation',
        participants: 198,
        submissions: 36,
        completionRate: 76.3,
        averageScore: 4.4,
        prize: 20000,
        status: 'Active'
      }
    ],
    participantGrowth: [
      { month: 'Jan', participants: 120 },
      { month: 'Feb', participants: 180 },
      { month: 'Mar', participants: 250 },
      { month: 'Apr', participants: 320 },
      { month: 'May', participants: 450 },
      { month: 'Jun', participants: 580 },
      { month: 'Jul', participants: 720 },
      { month: 'Aug', participants: 890 },
      { month: 'Sep', participants: 1100 },
      { month: 'Oct', participants: 1350 },
      { month: 'Nov', participants: 1650 },
      { month: 'Dec', participants: 2847 }
    ],
    technologyStats: [
      { name: 'AI/ML', count: 45, percentage: 28.8 },
      { name: 'Web Development', count: 38, percentage: 24.4 },
      { name: 'Mobile Development', count: 32, percentage: 20.5 },
      { name: 'Blockchain', count: 25, percentage: 16.0 },
      { name: 'Data Science', count: 16, percentage: 10.3 }
    ],
    topPerformers: [
      { name: 'TechTitans', hackathon: 'AI Innovation Challenge', score: 98.5, prize: 10000 },
      { name: 'CodeMasters', hackathon: 'Fintech Revolution', score: 96.2, prize: 15000 },
      { name: 'InnovationHub', hackathon: 'HealthTech Innovation', score: 94.8, prize: 8000 },
      { name: 'DataDrivers', hackathon: 'AI Innovation Challenge', score: 93.1, prize: 5000 },
      { name: 'WebWizards', hackathon: 'Web3 Development', score: 91.7, prize: 7000 }
    ],
    recentActivity: [
      { action: 'New submission', hackathon: 'AI Innovation Challenge', time: '2 min ago' },
      { action: 'Team formed', hackathon: 'HealthTech Innovation', time: '15 min ago' },
      { action: 'Judge feedback', hackathon: 'Fintech Revolution', time: '1 hour ago' },
      { action: 'Registration spike', hackathon: 'Web3 Development', time: '2 hours ago' },
      { action: 'Submission deadline', hackathon: 'AI Innovation Challenge', time: '3 hours ago' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Analytics Dashboard</h1>
          <p className="text-muted">Comprehensive insights into your hackathon performance</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <select
            value={selectedHackathon}
            onChange={(e) => setSelectedHackathon(e.target.value)}
            className="px-4 py-2 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
          >
            <option value="all">All Hackathons</option>
            {analyticsData.hackathons.map(hackathon => (
              <option key={hackathon.id} value={hackathon.id}>{hackathon.name}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            🏆
          </div>
          <div className="text-3xl font-bold text-text mb-1">{analyticsData.overview.totalHackathons}</div>
          <div className="text-sm text-muted">Total Hackathons</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            👥
          </div>
          <div className="text-3xl font-bold text-text mb-1">{analyticsData.overview.totalParticipants.toLocaleString()}</div>
          <div className="text-sm text-muted">Total Participants</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            📝
          </div>
          <div className="text-3xl font-bold text-text mb-1">{analyticsData.overview.totalSubmissions}</div>
          <div className="text-sm text-muted">Total Submissions</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            ⭐
          </div>
          <div className="text-3xl font-bold text-text mb-1">{analyticsData.overview.averageRating}</div>
          <div className="text-sm text-muted">Avg Rating</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            📊
          </div>
          <div className="text-3xl font-bold text-text mb-1">{analyticsData.overview.completionRate}%</div>
          <div className="text-sm text-muted">Completion Rate</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
            💰
          </div>
          <div className="text-3xl font-bold text-text mb-1">${(analyticsData.overview.totalPrizeMoney / 1000).toFixed(0)}K</div>
          <div className="text-sm text-muted">Prize Money</div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Participant Growth Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Participant Growth</h3>
          <div className="space-y-4">
            {analyticsData.participantGrowth.slice(-6).map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-muted">{data.month}</span>
                <div className="flex items-center gap-3 flex-1 mx-4">
                  <div className="flex-1 bg-bg-elev rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.participants / 3000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-text w-16 text-right">{data.participants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Technology Stack Distribution</h3>
          <div className="space-y-4">
            {analyticsData.technologyStats.map((tech, index) => (
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

      {/* Hackathon Performance Table */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-text mb-6">Hackathon Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Hackathon</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Participants</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Submissions</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Completion Rate</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Avg Score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Prize</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text">Status</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.hackathons.map((hackathon) => (
                <tr key={hackathon.id} className="border-b border-border/50 hover:bg-bg-elev/50">
                  <td className="py-3 px-4 text-sm text-text font-medium">{hackathon.name}</td>
                  <td className="py-3 px-4 text-sm text-text">{hackathon.participants}</td>
                  <td className="py-3 px-4 text-sm text-text">{hackathon.submissions}</td>
                  <td className="py-3 px-4 text-sm text-text">{hackathon.completionRate}%</td>
                  <td className="py-3 px-4 text-sm text-text">{hackathon.averageScore}</td>
                  <td className="py-3 px-4 text-sm text-text">${hackathon.prize.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      hackathon.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      hackathon.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {hackathon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Top Performing Teams</h3>
          <div className="space-y-4">
            {analyticsData.topPerformers.map((team, index) => (
              <div key={team.name} className="flex items-center justify-between p-3 bg-bg-elev rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-2 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-text">{team.name}</div>
                    <div className="text-sm text-muted">{team.hackathon}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-text">{team.score}</div>
                  <div className="text-sm text-muted">${team.prize.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">
                  📊
                </div>
                <div className="flex-1">
                  <div className="text-sm text-text font-medium">{activity.action}</div>
                  <div className="text-xs text-muted">{activity.hackathon}</div>
                </div>
                <div className="text-xs text-muted">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
