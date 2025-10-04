import React, { useState, useEffect } from 'react';
import DashboardHero from '../../components/Organizer/DashboardHero';
import ActiveHackathons from '../../components/Organizer/ActiveHackathons';
import StatsCard from '../../components/Organizer/StatsCard';
import RecentActivity from '../../components/Organizer/RecentActivity';

const OrganizerDashboardPage = () => {
  const [stats, setStats] = useState({
    totalHackathons: 0,
    activeHackathons: 0,
    totalParticipants: 0,
    totalSubmissions: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalHackathons: 15,
        activeHackathons: 4,
        totalParticipants: 2847,
        totalSubmissions: 156
      });
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
    <main className="flex-grow container mx-auto p-4 pt-20">
      <DashboardHero />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Hackathons"
          value={stats.totalHackathons}
          icon="🏆"
          color="from-blue-500 to-blue-600"
          change="+3 this month"
        />
        <StatsCard
          title="Active Events"
          value={stats.activeHackathons}
          icon="⚡"
          color="from-green-500 to-green-600"
          change="4 running now"
        />
        <StatsCard
          title="Total Participants"
          value={stats.totalParticipants.toLocaleString()}
          icon="👥"
          color="from-purple-500 to-purple-600"
          change="+284 this week"
        />
        <StatsCard
          title="Submissions"
          value={stats.totalSubmissions}
          icon="📝"
          color="from-orange-500 to-orange-600"
          change="+23 today"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Hackathons */}
        <div className="lg:col-span-2">
          <ActiveHackathons />
        </div>

        {/* Right Column: Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </main>
  );
};

export default OrganizerDashboardPage;
