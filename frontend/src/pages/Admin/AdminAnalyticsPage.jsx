import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminAnalyticsPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalHackathons: 0,
    totalSubmissions: 0,
    activeUsers: 0,
    platformGrowth: 0,
    userEngagement: 0
  });

  // Mock data for platform analytics
  const [platformStats] = useState({
    totalUsers: 1250,
    totalHackathons: 45,
    totalSubmissions: 320,
    activeUsers: 890,
    platformGrowth: 25.5,
    userEngagement: 78.2
  });

  const [userStats] = useState([
    { role: 'Participants', count: 850, percentage: 68, color: 'from-blue-500 to-blue-600' },
    { role: 'Organizers', count: 120, percentage: 9.6, color: 'from-green-500 to-green-600' },
    { role: 'Judges', count: 180, percentage: 14.4, color: 'from-purple-500 to-purple-600' },
    { role: 'Mentors', count: 100, percentage: 8, color: 'from-orange-500 to-orange-600' }
  ]);

  const [hackathonStats] = useState([
    { status: 'Active', count: 12, color: 'bg-green-500' },
    { status: 'Completed', count: 28, color: 'bg-blue-500' },
    { status: 'Upcoming', count: 5, color: 'bg-yellow-500' }
  ]);

  const [recentActivity] = useState([
    { action: 'New hackathon created', user: 'TechCorp', time: '2 hours ago', type: 'hackathon' },
    { action: 'User registered', user: 'john.doe@email.com', time: '4 hours ago', type: 'user' },
    { action: 'Submission received', user: 'Team Alpha', time: '6 hours ago', type: 'submission' },
    { action: 'Judge evaluation completed', user: 'Dr. Smith', time: '8 hours ago', type: 'evaluation' },
    { action: 'Mentor assigned', user: 'Sarah Johnson', time: '12 hours ago', type: 'mentor' }
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAnalytics(platformStats);
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'hackathon': return '🏆';
      case 'user': return '👤';
      case 'submission': return '📝';
      case 'evaluation': return '⭐';
      case 'mentor': return '🎓';
      default: return '📊';
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Platform Analytics</h1>
        <p className="text-muted">Comprehensive overview of platform performance and user activity</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-text">{analytics.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-400">+{analytics.platformGrowth}% this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Hackathons</p>
              <p className="text-3xl font-bold text-text">{analytics.totalHackathons}</p>
              <p className="text-sm text-blue-400">12 active</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-text">{analytics.totalSubmissions}</p>
              <p className="text-sm text-purple-400">+45 this week</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-text">{analytics.activeUsers}</p>
              <p className="text-sm text-orange-400">71% of total</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">Platform Growth</p>
              <p className="text-3xl font-bold text-text">+{analytics.platformGrowth}%</p>
              <p className="text-sm text-green-400">Monthly growth</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm mb-1">User Engagement</p>
              <p className="text-3xl font-bold text-text">{analytics.userEngagement}%</p>
              <p className="text-sm text-blue-400">High engagement</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">User Distribution</h3>
          <div className="space-y-4">
            {userStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${stat.color}`}></div>
                  <span className="text-text font-medium">{stat.role}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text font-bold">{stat.count}</span>
                  <span className="text-muted text-sm">({stat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Status */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Hackathon Status</h3>
          <div className="space-y-4">
            {hackathonStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${stat.color}`}></div>
                  <span className="text-text font-medium">{stat.status}</span>
                </div>
                <span className="text-text font-bold">{stat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-bold text-text mb-6">Recent Platform Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-bg-elev rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-text font-medium">{activity.action}</p>
                  <p className="text-sm text-muted">by {activity.user}</p>
                </div>
                <span className="text-sm text-muted">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
