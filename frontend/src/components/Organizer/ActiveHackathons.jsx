import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'; // Import useState, useEffect, useContext
import api from '../../utils/api'; // Import api
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function ActiveHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchHackathons = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getAllPublicHackathons(); // Call the new API to get all public hackathons
        const filteredHackathons = data;
        setHackathons(filteredHackathons);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hackathons:", err);
        setError(err.message || 'Failed to fetch hackathons');
        setLoading(false);
      }
    };
    fetchHackathons();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Ended': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-br from-primary to-primary-2 rounded-lg flex items-center justify-center text-white text-sm">🏆</span>
          Your Hackathons
        </h2>
        <Link
          to="/organizer/hackathons"
          className="text-primary hover:text-primary-2 transition-colors font-semibold"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-text">Loading hackathons...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        ) : hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <div
              key={hackathon._id} // Use _id from MongoDB
              className="bg-bg-elev border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-200"
            >
              {hackathon.imageUrl && (
                <img
                  src={hackathon.imageUrl}
                  alt={hackathon.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text mb-1">{hackathon.name}</h3>
                  <p className="text-muted text-sm mb-2">
                    {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(hackathon.status)}`}>
                  {hackathon.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hackathon.participants ? hackathon.participants.length : 0}</div>
                  <div className="text-xs text-muted">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hackathon.teams ? hackathon.teams.length : 0}</div>
                  <div className="text-xs text-muted">Teams</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{hackathon.submissions ? hackathon.submissions.length : 0}</div>
                  <div className="text-xs text-muted">Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">${hackathon.prizePool ? (hackathon.prizePool / 1000).toFixed(0) : 0}K</div>
                  <div className="text-xs text-muted">Prize Pool</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/organizer/hackathons/${hackathon._id}`} // Use _id for navigation
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors text-center"
                >
                  Manage
                </Link>
                <Link
                  to={`/organizer/hackathons/${hackathon._id}/analytics`} // Use _id for navigation
                  className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors text-center"
                >
                  Analytics
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-text mb-2">No Hackathons Yet</h3>
            <p className="text-muted mb-4">Create your first hackathon to get started</p>
            <Link
              to="/organizer/hackathons/create"
              className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-6 py-2 rounded-full font-semibold"
            >
              Create Hackathon
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
