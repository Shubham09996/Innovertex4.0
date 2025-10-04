import React from 'react';
import { Link } from 'react-router-dom';

const GlobalRankCard = () => {
  return (
    <section className="bg-card rounded-xl shadow-lg p-6 text-center">
      <h2 className="text-2xl font-semibold text-text mb-4">Global Rank</h2>
      <div className="text-4xl font-bold text-primary mb-2">#42</div>
      <p className="text-muted mb-4">2,847 total points</p>
      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">+5 this month</span>
      <Link to="/participant/global-leaderboard" className="w-full mt-6 px-4 py-2 bg-bg-elev border border-border text-text rounded-full font-semibold hover:bg-border-2 transition-colors duration-200 text-center block">View Full Leaderboard</Link>
    </section>
  );
};

export default GlobalRankCard;
