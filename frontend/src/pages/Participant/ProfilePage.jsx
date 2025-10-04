import React from 'react';
import GlobalRankCard from '../../components/Participant/GlobalRankCard';

const ProfilePage = () => {
  return (
    <main className="flex-grow container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold text-text mb-8">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card rounded-xl shadow-lg p-6">
          <p className="text-muted mb-4">View and edit your participant profile.</p>
          {/* Placeholder for profile details and edit forms */}
          <div className="space-y-4">
            <div>
              <label className="block text-text text-sm font-medium mb-1">Name</label>
              <input type="text" value="John Doe" className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text" readOnly />
            </div>
            <div>
              <label className="block text-text text-sm font-medium mb-1">Email</label>
              <input type="email" value="john.doe@example.com" className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text" readOnly />
            </div>
            <div>
              <label className="block text-text text-sm font-medium mb-1">Skills</label>
              <input type="text" value="React, Node.js, Tailwind CSS" className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text" readOnly />
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">Edit Profile</button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <GlobalRankCard />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
