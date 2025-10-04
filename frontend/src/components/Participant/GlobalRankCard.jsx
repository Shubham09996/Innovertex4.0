import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import { AuthContext } from '../../../context/AuthContext';

const GlobalRankCard = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [globalRank, setGlobalRank] = useState('N/A');
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGlobalRank = async () => {
      if (!user || !token || authLoading) {
        setLoading(false);
        return;
      }
      try {
        const leaderboard = await api.getGlobalLeaderboard();
        const userEntry = leaderboard.find(entry => entry._id === user.id); // Assuming user.id is the user's ID

        if (userEntry) {
          const rank = leaderboard.indexOf(userEntry) + 1;
          setGlobalRank(`#${rank}`);
          setTotalPoints(userEntry.totalScore);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching global rank:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchGlobalRank();
  }, [user, token, authLoading]);

  if (authLoading || loading) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-text">Loading global rank...</section>;
  }

  if (error) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-red-500">Error: {error.message}</section>;
  }

  if (!user) {
    return <section className="bg-card rounded-xl shadow-lg p-6 text-center text-text">Please log in to see your global rank.</section>;
  }

  return (
    <section className="bg-card rounded-xl shadow-lg p-6 text-center">
      <h2 className="text-2xl font-semibold text-text mb-4">Global Rank</h2>
      <div className="text-4xl font-bold text-primary mb-2">{globalRank}</div>
      <p className="text-muted mb-4">{totalPoints} total points</p>
      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">+5 this month</span> {/* This is static, can be dynamic later */}
      <Link to="/participant/global-leaderboard" className="w-full mt-6 px-4 py-2 bg-bg-elev border border-border text-text rounded-full font-semibold hover:bg-border-2 transition-colors duration-200 text-center block">View Full Leaderboard</Link>
    </section>
  );
};

export default GlobalRankCard;
