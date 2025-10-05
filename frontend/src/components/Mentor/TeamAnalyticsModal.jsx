import React from 'react';

export default function TeamAnalyticsModal({ isOpen, onClose, team }) {
  if (!isOpen || !team) return null;

  // Calculate analytics data
  const completedMilestones = team.milestones?.filter(m => m.completed).length || 0;
  const totalMilestones = team.milestones?.length || 0;
  const progressPercentage = team.progress || 0;
  const remainingProgress = 100 - progressPercentage;
  
  // Mock analytics data
  const analyticsData = {
    timeSpent: '45 hours',
    messagesExchanged: 28,
    avgResponseTime: '2.3 hours',
    satisfactionScore: 4.7,
    lastActivity: team.lastActivity || '2 hours ago',
    productivityScore: 85,
    collaborationScore: 92,
    innovationScore: 78
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-green-400';
    if (score >= 3.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-2">Team Analytics</h2>
              <p className="text-white text-lg">{team.name} - {team.project}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-200"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Progress Overview */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">📊 Progress Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-white">{progressPercentage}%</span>
                </div>
                <p className="text-lg font-semibold text-white">Overall Progress</p>
                <p className="text-sm text-gray-400">{remainingProgress}% remaining</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-400">{completedMilestones}</span>
                </div>
                <p className="text-lg font-semibold text-white">Milestones Completed</p>
                <p className="text-sm text-gray-400">out of {totalMilestones}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-400">{analyticsData.timeSpent}</span>
                </div>
                <p className="text-lg font-semibold text-white">Time Spent</p>
                <p className="text-sm text-gray-400">on project</p>
              </div>
            </div>
          </div>

          {/* Detailed Progress */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">🎯 Detailed Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">Project Progress</span>
                  <span className={`text-sm font-bold ${getProgressColor(progressPercentage)}`}>
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{completedMilestones} milestones</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Remaining</p>
                  <p className="text-2xl font-bold text-yellow-400">{totalMilestones - completedMilestones} milestones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Milestones Breakdown */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">🏆 Milestones Breakdown</h3>
            <div className="space-y-3">
              {team.milestones?.map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      milestone.completed ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      {milestone.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        milestone.completed ? 'text-white' : 'text-gray-400'
                      }`}>
                        {milestone.name}
                      </p>
                      <p className="text-xs text-gray-400">{milestone.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      milestone.completed ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {milestone.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">💬 Communication</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Messages Exchanged</span>
                  <span className="text-white font-semibold">{analyticsData.messagesExchanged}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Response Time</span>
                  <span className="text-white font-semibold">{analyticsData.avgResponseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Activity</span>
                  <span className="text-white font-semibold">{analyticsData.lastActivity}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">⭐ Performance Scores</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Satisfaction</span>
                  <span className={`font-semibold ${getScoreColor(analyticsData.satisfactionScore)}`}>
                    {analyticsData.satisfactionScore}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Productivity</span>
                  <span className="text-white font-semibold">{analyticsData.productivityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Collaboration</span>
                  <span className="text-white font-semibold">{analyticsData.collaborationScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Innovation</span>
                  <span className="text-white font-semibold">{analyticsData.innovationScore}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Performance */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">👥 Team Members Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.members?.map((member, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Contribution</span>
                      <span className="text-white">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Activity</span>
                      <span className="text-green-400">High</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 border-t border-gray-700 p-6 rounded-b-2xl">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-all duration-200"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                // You can add logic here to open chat with team
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              💬 Chat with Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
