import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HackathonsPage = () => {
  const [filters, setFilters] = useState({
    technology: '',
    mode: '',
    eligibility: '',
    prizeMoney: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const dummyHackathons = [
    {
      id: 'hack1',
      title: 'AI Innovation Challenge',
      description: 'Build the next generation of AI-powered solutions.',
      tech: ['AI', 'Machine Learning'],
      mode: 'Online',
      eligibility: 'Students',
      prize: '$50,000',
      registered: 245,
    },
    {
      id: 'hack2',
      title: 'Sustainable Tech Hack',
      description: 'Create technology solutions for environmental challenges.',
      tech: ['Sustainability', 'GreenTech'],
      mode: 'Offline',
      eligibility: 'Professionals',
      prize: '$25,000',
      registered: 180,
    },
    {
      id: 'hack3',
      title: 'Web Dev Mastery',
      description: 'Develop innovative web applications using modern frameworks.',
      tech: ['Web Dev', 'React', 'Node.js'],
      mode: 'Online',
      eligibility: 'All',
      prize: '$30,000',
      registered: 300,
    },
    {
      id: 'hack4',
      title: 'Mobile App Innovation',
      description: 'Design and build cutting-edge mobile applications.',
      tech: ['Mobile Dev', 'Flutter', 'React Native'],
      mode: 'Offline',
      eligibility: 'Students',
      prize: '$40,000',
      registered: 210,
    },
  ];

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
        {dummyHackathons.map((hackathon, index) => (
          <div key={hackathon.id} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <img src={`https://picsum.photos/seed/hackathon${index}/600/400`} alt={hackathon.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-text mb-2">{hackathon.title}</h3>
              <p className="text-muted text-sm mb-4">{hackathon.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {hackathon.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{tech}</span>
                ))}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-primary font-semibold">{hackathon.prize}</span>
                <span className="text-muted text-sm">{hackathon.registered} registered</span>
              </div>
              <Link to={`/participant/hackathons/${hackathon.id}`} className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HackathonsPage;
