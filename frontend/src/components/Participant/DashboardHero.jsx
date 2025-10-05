import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHero = () => {
  return (
    <section className="mb-8 p-6 bg-card rounded-xl shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">Your Mission Control for Innovation 🚀</h1>
      <p className="text-base sm:text-lg text-muted text-lg mb-6">Ready to build something amazing? Your personalized hackathon journey starts here.</p>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/participant/hackathons" className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">+ Discover Hackathons</Link>
      </div>
    </section>
  );
};

export default DashboardHero;
