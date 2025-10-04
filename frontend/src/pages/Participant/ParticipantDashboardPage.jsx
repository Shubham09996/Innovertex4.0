import React from 'react';
import DashboardHero from '../../components/Participant/DashboardHero';
import RecommendedHackathons from '../../components/Participant/RecommendedHackathons';
import ActiveHackathons from '../../components/Participant/ActiveHackathons';

const DashboardPage = () => {
  return (
    <main className="flex-grow container mx-auto p-4 pt-20">
      <DashboardHero />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Active Hackathons */}
        <div className="md:col-span-1 space-y-8">
          <ActiveHackathons />
        </div>

        {/* Right Column: Recommended Hackathons */}
        <div className="md:col-span-2">
          <RecommendedHackathons />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
