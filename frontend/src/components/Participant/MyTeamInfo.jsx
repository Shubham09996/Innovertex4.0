import React from 'react';
import { Link } from 'react-router-dom';

const MyTeamInfo = () => {
  return (
    <section className="bg-card rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-text mb-4">My Team</h2>
      <p className="text-muted mb-6">Code Wizards • FinTech Revolution</p>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img src="https://via.placeholder.com/40" alt="Alex Chen" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold text-text">Alex Chen (You)</h3>
            <p className="text-muted text-sm">Full Stack Dev</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src="https://via.placeholder.com/40" alt="Sarah Kim" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold text-text">Sarah Kim</h3>
            <p className="text-muted text-sm">UI/UX Designer</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src="https://via.placeholder.com/40" alt="Mike Johnson" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold text-text">Mike Johnson</h3>
            <p className="text-muted text-sm">Backend Dev</p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-muted text-sm">Last activity: 2 hours ago <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">3 new</span></div>
      <Link to="/participant/team" className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Open Team Chat</Link>
    </section>
  );
};

export default MyTeamInfo;
