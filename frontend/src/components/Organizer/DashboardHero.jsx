import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardHero() {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary-2/10 rounded-2xl p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="flex-1 mb-6 lg:mb-0">
          <h1 className="text-4xl font-bold text-text mb-4">
            Welcome back, <span className="text-primary">Organizer</span>! 👋
          </h1>
          <p className="text-lg text-muted mb-6 max-w-2xl">
            Manage your hackathons, track participants, and create amazing experiences. 
            Your next successful event is just a click away.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/organizer/hackathons/create"
              className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span>+</span>
              <span>Create New Hackathon</span>
            </Link>
            <Link
              to="/organizer/analytics"
              className="btn secondary text-text bg-transparent border border-border px-6 py-3 rounded-full font-semibold hover:border-primary-300 transition-all flex items-center gap-2"
            >
              <span>📊</span>
              <span>View Analytics</span>
            </Link>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-2 rounded-full flex items-center justify-center text-6xl">
            🏆
          </div>
        </div>
      </div>
    </div>
  );
}
