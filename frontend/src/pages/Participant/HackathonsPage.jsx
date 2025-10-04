import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const HackathonsPage = () => {
  const [filters, setFilters] = useState({
    technology: '',
    mode: '',
    eligibility: '',
    prizeMoney: '',
  });
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await api.getHackathons();
        setHackathons(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredHackathons = hackathons.filter((hackathon) => {
    return (
      (filters.technology === '' || (hackathon.tech && hackathon.tech.includes(filters.technology))) &&
      (filters.mode === '' || hackathon.mode === filters.mode) &&
      (filters.eligibility === '' || hackathon.eligibility === filters.eligibility) &&
      (filters.prizeMoney === '' || hackathon.prize === filters.prizeMoney) // This might need more complex logic for range matching
    );
  });

  if (loading) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-text">Loading hackathons...</main>;
  }

  if (error) {
    return <main className="flex-grow container mx-auto p-4 pt-24 text-center text-red-500">Error: {error.message}</main>;
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      <h1 className="text-4xl font-bold text-text mb-4">All Hackathons</h1>
      <p className="text-muted mb-8">Browse through all available hackathons and find your next challenge.</p>

      {/* Filter Options */}
      <div className="bg-card rounded-xl shadow-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="technology" className="block text-text text-sm font-medium mb-1">Technology</label>
          <select
            id="technology"
            name="technology"
            value={filters.technology}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Web Dev">Web Dev</option>
            <option value="Mobile Dev">Mobile Dev</option>
            <option value="Blockchain">Blockchain</option>
          </select>
        </div>
        <div>
          <label htmlFor="mode" className="block text-text text-sm font-medium mb-1">Mode</label>
          <select
            id="mode"
            name="mode"
            value={filters.mode}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div>
          <label htmlFor="eligibility" className="block text-text text-sm font-medium mb-1">Eligibility</label>
          <select
            id="eligibility"
            name="eligibility"
            value={filters.eligibility}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All</option>
            <option value="Students">Students</option>
            <option value="Professionals">Professionals</option>
          </select>
        </div>
        <div>
          <label htmlFor="prizeMoney" className="block text-text text-sm font-medium mb-1">Prize Money</label>
          <select
            id="prizeMoney"
            name="prizeMoney"
            value={filters.prizeMoney}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg bg-bg-elev border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All</option>
            <option value="$10,000+">$10,000+</option>
            <option value="$25,000+">$25,000+</option>
            <option value="$50,000+">$50,000+</option>
          </select>
        </div>
      </div>

      {/* Hackathon Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHackathons.map((hackathon) => (
          <div key={hackathon._id} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <img src={`https://picsum.photos/seed/${hackathon._id}/600/400`} alt={hackathon.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-text mb-2">{hackathon.name}</h3>
              <p className="text-muted text-sm mb-4">{hackathon.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-primary font-semibold">{hackathon.prize}</span>
                <span className="text-muted text-sm">Starts: {new Date(hackathon.startDate).toLocaleDateString()}</span>
              </div>
              <Link to={`/participant/hackathons/${hackathon._id}`} className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HackathonsPage;
