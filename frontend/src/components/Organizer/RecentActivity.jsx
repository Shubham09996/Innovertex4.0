import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'; // Import useState, useEffect, useContext
import api from '../../utils/api'; // Import api
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getRecentActivities(token);
        setActivities(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recent activities:", err);
        setError(err.message || 'Failed to fetch recent activities');
        setLoading(false);
      }
    };
    fetchRecentActivities();
  }, [token]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const seconds = Math.floor((now - activityTime) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const getActivityDisplay = (activity) => {
    let icon = '⚫'; // Default icon
    let color = 'text-gray-500';
    let message = activity.message;

    switch (activity.type) {
      case 'hackathonCreated':
        icon = '🏆';
        color = 'text-red-500';
        message = `New hackathon \"${activity.hackathonName}\" created.`;
        break;
      case 'teamFormed':
        icon = '🤝';
        color = 'text-purple-500';
        message = `Team \"${activity.teamName}\" formed in ${activity.hackathonName}.`;
        break;
      case 'submissionReceived':
        icon = '📝';
        color = 'text-blue-500';
        message = `New submission received for \"${activity.hackathonName}\" by team \"${activity.teamName}\".`;
        break;
      case 'participantRegistered':
        icon = '👥';
        color = 'text-green-500';
        message = `${activity.count} new participants joined ${activity.hackathonName}.`; // Assuming count is passed
        break;
      case 'announcementCreated':
        icon = '📢';
        color = 'text-orange-500';
        message = `New announcement for \"${activity.hackathonName}\": ${activity.announcementTitle}.`;
        break;
      default:
        break;
    }
    return { icon, color, message };
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-gradient-to-br from-primary to-primary-2 rounded-lg flex items-center justify-center text-white text-sm">📊</span>
        Recent Activity
      </h2>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-text">Loading activities...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        ) : activities.length > 0 ? (
          activities.map((activity) => {
            const { icon, color, message } = getActivityDisplay(activity);
            return (
              <div key={activity._id} className="flex items-start gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-bg flex items-center justify-center text-lg ${color}`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text font-medium leading-tight">
                    {message}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {getTimeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤷‍♀️</span>
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">No Recent Activity</h3>
            <p className="text-muted mb-4">Check back later for updates or start a new hackathon!</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-primary hover:text-primary-2 transition-colors font-semibold text-sm">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
