import React from 'react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'submission',
      message: 'New submission received for AI Innovation Challenge',
      time: '2 minutes ago',
      icon: '📝',
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'registration',
      message: '28 new participants joined Web3 Hackathon',
      time: '15 minutes ago',
      icon: '👥',
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'team',
      message: 'Team "TechTitans" formed in HealthTech Innovation',
      time: '1 hour ago',
      icon: '🤝',
      color: 'text-purple-500'
    },
    {
      id: 4,
      type: 'judge',
      message: 'Judge feedback submitted for 5 projects',
      time: '2 hours ago',
      icon: '⚖️',
      color: 'text-orange-500'
    },
    {
      id: 5,
      type: 'hackathon',
      message: 'HealthTech Innovation hackathon started',
      time: '3 hours ago',
      icon: '🏆',
      color: 'text-red-500'
    },
    {
      id: 6,
      type: 'submission',
      message: '3 new submissions for Fintech Revolution',
      time: '4 hours ago',
      icon: '📝',
      color: 'text-blue-500'
    },
    {
      id: 7,
      type: 'registration',
      message: '12 new participants joined AI Innovation Challenge',
      time: '6 hours ago',
      icon: '👥',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-gradient-to-br from-primary to-primary-2 rounded-lg flex items-center justify-center text-white text-sm">📊</span>
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors">
            <div className={`w-8 h-8 rounded-full bg-bg flex items-center justify-center text-lg ${activity.color}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text font-medium leading-tight">
                {activity.message}
              </p>
              <p className="text-xs text-muted mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-primary hover:text-primary-2 transition-colors font-semibold text-sm">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
