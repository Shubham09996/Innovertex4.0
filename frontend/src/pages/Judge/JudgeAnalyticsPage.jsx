import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function JudgeAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalytics({
        overview: {
          totalEvaluations: 156,
          completedEvaluations: 144,
          pendingEvaluations: 12,
          averageRating: 4.8,
          totalMentorshipHours: 45,
          teamsMentored: 8,
          averageSessionRating: 4.9
        },
        performance: {
          evaluationSpeed: 2.3, // hours per evaluation
          accuracy: 95, // percentage
          consistency: 4.7, // rating consistency
          feedbackQuality: 4.8
        },
        trends: {
          evaluationsThisMonth: 23,
          evaluationsLastMonth: 18,
          mentorshipHoursThisMonth: 12,
          mentorshipHoursLastMonth: 8,
          averageRatingThisMonth: 4.9,
          averageRatingLastMonth: 4.6
        },
        topSkills: [
          { skill: 'AI/ML', evaluations: 45, rating: 4.9 },
          { skill: 'Web Development', evaluations: 38, rating: 4.7 },
          { skill: 'Blockchain', evaluations: 32, rating: 4.8 },
          { skill: 'Mobile Development', evaluations: 28, rating: 4.6 },
          { skill: 'Data Science', evaluations: 25, rating: 4.9 }
        ],
        recentActivity: [
          {
            id: 1,
            type: 'evaluation',
            team: 'TechTitans',
            project: 'AI Healthcare App',
            date: 'Dec 19, 2024',
            rating: 5,
            status: 'Completed'
          },
          {
            id: 2,
            type: 'mentorship',
            team: 'DataDrivers',
            project: 'Analytics Dashboard',
            date: 'Dec 18, 2024',
            rating: 4,
            status: 'Session Completed'
          },
          {
            id: 3,
            type: 'evaluation',
            team: 'CodeCrafters',
            project: 'Blockchain Voting',
            date: 'Dec 17, 2024',
            rating: 4,
            status: 'Completed'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (current, previous) => {
    if (current > previous) return '📈';
    if (current < previous) return '📉';
    return '➡️';
  };

  const getTrendColor = (current, previous) => {
    if (current > previous) return 'text-green-400';
    if (current < previous) return 'text-red-400';
    return 'text-gray-400';
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
          <h1 className="text-4xl font-bold text-text mb-2">Analytics</h1>
          <p className="text-muted">Track your performance and impact</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-bg-elev border border-border rounded-lg text-text"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
            📊 Export Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Total Evaluations</p>
              <p className="text-3xl font-bold text-blue-400">{analytics.overview?.totalEvaluations}</p>
              <p className="text-xs text-muted">
                {getTrendIcon(analytics.trends?.evaluationsThisMonth, analytics.trends?.evaluationsLastMonth)} 
                <span className={getTrendColor(analytics.trends?.evaluationsThisMonth, analytics.trends?.evaluationsLastMonth)}>
                  {analytics.trends?.evaluationsThisMonth - analytics.trends?.evaluationsLastMonth} this month
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-400">{analytics.overview?.completedEvaluations}</p>
              <p className="text-xs text-muted">
                {((analytics.overview?.completedEvaluations / analytics.overview?.totalEvaluations) * 100).toFixed(1)}% completion rate
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-purple-400">{analytics.overview?.averageRating}/5</p>
              <p className="text-xs text-muted">
                {getTrendIcon(analytics.trends?.averageRatingThisMonth, analytics.trends?.averageRatingLastMonth)} 
                <span className={getTrendColor(analytics.trends?.averageRatingThisMonth, analytics.trends?.averageRatingLastMonth)}>
                  {analytics.trends?.averageRatingThisMonth - analytics.trends?.averageRatingLastMonth} this month
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Mentorship Hours</p>
              <p className="text-3xl font-bold text-orange-400">{analytics.overview?.totalMentorshipHours}h</p>
              <p className="text-xs text-muted">
                {getTrendIcon(analytics.trends?.mentorshipHoursThisMonth, analytics.trends?.mentorshipHoursLastMonth)} 
                <span className={getTrendColor(analytics.trends?.mentorshipHoursThisMonth, analytics.trends?.mentorshipHoursLastMonth)}>
                  +{analytics.trends?.mentorshipHoursThisMonth - analytics.trends?.mentorshipHoursLastMonth}h this month
                </span>
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Metrics */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Performance Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-text">Evaluation Speed</span>
                <span className="text-sm text-muted">{analytics.performance?.evaluationSpeed}h avg</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-text">Accuracy</span>
                <span className="text-sm text-muted">{analytics.performance?.accuracy}%</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: `${analytics.performance?.accuracy}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-text">Consistency</span>
                <span className="text-sm text-muted">{analytics.performance?.consistency}/5</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: `${(analytics.performance?.consistency / 5) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-text">Feedback Quality</span>
                <span className="text-sm text-muted">{analytics.performance?.feedbackQuality}/5</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: `${(analytics.performance?.feedbackQuality / 5) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Top Evaluation Skills</h2>
          <div className="space-y-4">
            {analytics.topSkills?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-bg-elev border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text">{skill.skill}</p>
                    <p className="text-xs text-muted">{skill.evaluations} evaluations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{skill.rating}/5</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < skill.rating ? 'text-yellow-400' : 'text-gray-400'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold text-text mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {analytics.recentActivity?.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-bg-elev border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">
                    {activity.type === 'evaluation' ? '📊' : '🎓'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-text">{activity.team}</p>
                  <p className="text-sm text-muted">{activity.project}</p>
                  <p className="text-xs text-muted">{activity.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-text">{activity.status}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < activity.rating ? 'text-yellow-400' : 'text-gray-400'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
