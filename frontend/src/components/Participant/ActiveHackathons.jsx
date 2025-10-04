import React from 'react';
import { Link } from 'react-router-dom';

const ActiveHackathons = () => {
  return (
    <section className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-text mb-4">My Active Hackathons</h2>
      <p className="text-muted mb-6">Hackathons you're currently participating in</p>
      {/* Hackathon 1 */}
      <div className="mb-4 p-4 bg-bg-elev rounded-lg border border-border hover:shadow-md hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-center mb-2">  
          <h3 className="text-lg font-semibold text-text">FinTech Revolution</h3>
          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Development Phase</span>
        </div>
        <p className="text-muted text-sm mb-2">DeFi & Blockchain Innovation</p>
        <div className="text-muted text-sm mb-2">
          Submission in: <span className="font-semibold text-text">8 days</span>
        </div>
        <div className="mb-4">
          <div className="w-full bg-bg-dark rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-sm text-muted mt-1">Progress: 65%</p>
        </div>
        <Link to="/participant/workspace/fintech-revolution?teamId=team-fintech" className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Go to Workspace</Link>
      </div>
      {/* Hackathon 2 */}
      <div className="p-4 bg-bg-elev rounded-lg border border-border hover:shadow-md hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-text">HealthTech Challenge</h3>
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Prototype Review</span>
        </div>
        <p className="text-muted text-sm mb-2">Digital Health Solutions</p>
        <div className="text-muted text-sm mb-2">
          Submission in: <span className="font-semibold text-text">11 days</span>
        </div>
        <div className="mb-4">
          <div className="w-full bg-bg-dark rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <p className="text-sm text-muted mt-1">Progress: 40%</p>
        </div>
        <Link to="/participant/workspace/healthtech-challenge?teamId=team-healthtech" className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Go to Workspace</Link>
      </div>
    </section>
  );
};

export default ActiveHackathons;
