import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function MentorAnalyticsPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Mock data for demonstration
        setTimeout(() => {
          setAnalytics({
            overview: {
              totalTeams: 8,
              activeTeams: 5,
              completedTeams: 3,
              totalMessages: 156,
              avgResponseTime: 2.3,
              satisfactionScore: 4.7
            },
            teamPerformance: [
              {
                team: 'TechTitans',
                project: 'AI-Powered Healthcare App',
                progress: 85,
                messages: 45,
                lastActivity: '2 hours ago',
                satisfaction: 4.8
              },
              {
                team: 'DataDrivers',
                project: 'Smart Analytics Dashboard',
                progress: 72,
                messages: 32,
                lastActivity: '1 day ago',
                satisfaction: 4.5
              },
              {
                team: 'CodeCrafters',
                project: 'Blockchain Voting System',
                progress: 100,
                messages: 28,
                lastActivity: '3 days ago',
                satisfaction: 4.9
              },
              {
                team: 'InnovateLab',
                project: 'IoT Smart Home System',
                progress: 68,
                messages: 38,
                lastActivity: '4 hours ago',
                satisfaction: 4.6
              },
              {
                team: 'DataViz',
                project: 'Real-time Data Visualization',
                progress: 91,
                messages: 41,
                lastActivity: '6 hours ago',
                satisfaction: 4.7
              }
            ],
            messageStats: {
              totalMessages: 156,
              avgPerDay: 5.2,
              responseRate: 94,
              avgResponseTime: 2.3
            },
            satisfactionTrends: [
              { month: 'Oct', score: 4.2 },
              { month: 'Nov', score: 4.5 },
              { month: 'Dec', score: 4.7 }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

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
          <h1 className="text-4xl font-bold text-text mb-2">Mentor Analytics</h1>
          <p className="text-muted">Track your mentoring performance and team progress</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-bg-elev border border-border text-text rounded-lg focus:border-primary focus:outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Teams</p>
              <p className="text-3xl font-bold text-text">{analytics.overview?.totalTeams}</p>
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
              <p className="text-3xl font-bold text-text">{analytics.overview?.activeTeams}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-text">{analytics.overview?.completedTeams}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-text">{analytics.overview?.totalMessages}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Avg Response</p>
              <p className="text-3xl font-bold text-text">{analytics.overview?.avgResponseTime}h</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Satisfaction</p>
              <p className="text-3xl font-bold text-text">{analytics.overview?.satisfactionScore}/5</p>
            </div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Team Performance */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Team Performance</h3>
          <div className="space-y-4">
            {analytics.teamPerformance?.map((team, index) => (
              <div key={index} className="p-4 bg-bg-elev border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-text">{team.team}</h4>
                    <p className="text-sm text-muted">{team.project}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text">{team.progress}%</p>
                    <p className="text-xs text-muted">Progress</p>
                  </div>
                </div>
                
                <div className="w-full bg-bg rounded-full h-2 mb-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary-2 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${team.progress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted">Messages</p>
                    <p className="font-semibold text-text">{team.messages}</p>
                  </div>
                  <div>
                    <p className="text-muted">Satisfaction</p>
                    <p className="font-semibold text-text">{team.satisfaction}/5</p>
                  </div>
                  <div>
                    <p className="text-muted">Last Activity</p>
                    <p className="font-semibold text-text text-xs">{team.lastActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Statistics */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Message Statistics</h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">{analytics.messageStats?.totalMessages}</span>
              </div>
              <p className="text-lg font-semibold text-text">Total Messages</p>
              <p className="text-muted">Across all teams</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <p className="text-2xl font-bold text-text">{analytics.messageStats?.avgPerDay}</p>
                <p className="text-sm text-muted">Avg per day</p>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <p className="text-2xl font-bold text-text">{analytics.messageStats?.responseRate}%</p>
                <p className="text-sm text-muted">Response rate</p>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-primary/20 to-primary-2/20 rounded-lg">
              <p className="text-3xl font-bold text-primary">{analytics.messageStats?.avgResponseTime}h</p>
              <p className="text-muted">Average response time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Satisfaction Trends */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-text mb-6">Satisfaction Trends</h3>
        <div className="flex items-end justify-between h-32">
          {analytics.satisfactionTrends?.map((trend, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-16 bg-gradient-to-t from-primary to-primary-2 rounded-t-lg mb-2"
                style={{ height: `${(trend.score / 5) * 100}%` }}
              ></div>
              <p className="text-sm font-semibold text-text">{trend.score}</p>
              <p className="text-xs text-muted">{trend.month}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
