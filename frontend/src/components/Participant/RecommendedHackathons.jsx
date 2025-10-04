import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

const RecommendedHackathons = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [recommendedHackathons, setRecommendedHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedHackathons = async () => {
      if (authLoading) {
        setLoading(false);
        return;
      }
      try {
        const allHackathons = await api.getHackathons();
        let userParticipatingHackathonIds = [];

        if (user && token) {
          const userProfile = await api.getProfile(token);
          if (userProfile && userProfile.hackathonsParticipating) {
            userParticipatingHackathonIds = userProfile.hackathonsParticipating;
          }
        }

        const filteredAndRecommended = allHackathons.filter(hackathon => {
          const isRegistered = userParticipatingHackathonIds.includes(hackathon._id);
          const isStillOpen = new Date(hackathon.endDate) > new Date();
          // Add more complex recommendation logic here if desired (e.g., based on user skills)
          return !isRegistered && isStillOpen;
        });

        setRecommendedHackathons(filteredAndRecommended);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recommended hackathons:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchRecommendedHackathons();
  }, [user, token, authLoading]);

  if (authLoading || loading) {
    return <section className="md:col-span-2 text-center text-text">Loading recommendations...</section>;
  }

  if (error) {
    return <section className="md:col-span-2 text-center text-red-500">Error: {error.message}</section>;
  }

  return (
    <section className="md:col-span-2">
      <h2 className="text-2xl font-semibold text-text mb-4">Recommended For You</h2>
      <p className="text-muted mb-6">AI-powered recommendations based on your skills and interests</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedHackathons.length > 0 ? (
          recommendedHackathons.map((hackathon, index) => (
            <div key={hackathon._id} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300">
              <img src={hackathon.imageUrl || `https://picsum.photos/seed/${hackathon._id}/600/400`} alt={hackathon.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-text mb-2">{hackathon.name}</h3>
                <p className="text-muted text-sm mb-4">{hackathon.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  {hackathon.technologies && hackathon.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{tech}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary font-semibold">{hackathon.prize || 'N/A'}</span>
                  <span className="text-muted text-sm">Starts: {new Date(hackathon.startDate).toLocaleDateString()}</span>
                </div>
                <Link to={`/participant/hackathons/${hackathon._id}`} className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Register Now</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center lg:col-span-2">No new hackathons recommended at this time.</p>
        )}
      </div>
    </section>
  );
};

export default RecommendedHackathons;
