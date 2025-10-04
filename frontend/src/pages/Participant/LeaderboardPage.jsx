import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import api from '../../utils/api';

const LeaderboardPage = () => {
  const { hackathonId } = useParams();
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [hackathonLeaderboard, setHackathonLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        // Fetch global leaderboard
        const globalData = await api.getGlobalLeaderboard();
        setGlobalLeaderboard(globalData);

        // Fetch hackathon-specific leaderboard if hackathonId is present
        if (hackathonId) {
          const hackathonData = await api.getHackathonLeaderboard(hackathonId);
          setHackathonLeaderboard(hackathonData);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboards:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, [hackathonId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <NavBar />
        <main className="flex-grow container mx-auto p-4 pt-20 text-center text-text">Loading leaderboards...</main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <NavBar />
        <main className="flex-grow container mx-auto p-4 pt-20 text-center text-red-500">Error: {error.message}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 pt-20">
        <h1 className="text-4xl font-bold text-text mb-8">Leaderboard {hackathonId ? `for Hackathon ${hackathonId}` : ''}</h1>
        <p className="text-muted mb-8">Check out the global and hackathon leaderboards here.</p>

        {hackathonId && hackathonLeaderboard.length > 0 && (
          <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">Hackathon Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-text">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-4">Rank</th>
                    <th className="py-2 px-4">Team Name</th>
                    <th className="py-2 px-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {hackathonLeaderboard.map((entry, index) => (
                    <tr key={entry._id} className="border-b border-border last:border-b-0 hover:bg-bg-elev">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{entry.teamName}</td>
                      <td className="py-2 px-4">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {globalLeaderboard.length > 0 && (
          <div className="bg-card rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">Global Leaderboard (Top Users)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-text">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-4">Rank</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Total Score</th>
                  </tr>
                </thead>
                <tbody>
                  {globalLeaderboard.map((entry, index) => (
                    <tr key={entry._id} className="border-b border-border last:border-b-0 hover:bg-bg-elev">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{entry.username}</td>
                      <td className="py-2 px-4">{entry.totalScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
