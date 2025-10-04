import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 pt-20">
        <h1 className="text-4xl font-bold text-text mb-8">Leaderboard</h1>
        <p className="text-muted">Check out the global and hackathon leaderboards here.</p>
        {/* Add leaderboard components here */}
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
