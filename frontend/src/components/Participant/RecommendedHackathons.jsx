import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedHackathons = () => {
  return (
    <section className="md:col-span-2">
      <h2 className="text-2xl font-semibold text-text mb-4">Recommended For You</h2>
      <p className="text-muted mb-6">AI-powered recommendations based on your skills and interests</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hackathon Card 1 */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <img src="https://picsum.photos/seed/hackathon1/600/400" alt="AI Innovation Challenge" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-text mb-2">AI Innovation Challenge</h3>
            <p className="text-muted text-sm mb-4">Build the next generation of AI-powered solutions</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">AI</span>
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">Machine Learning</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-primary font-semibold">$50,000</span>
              <span className="text-muted text-sm">245 registered</span>
            </div>
            <Link to="/participant/hackathons/1" className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Register Now</Link>
          </div>
        </div>
        {/* Hackathon Card 2 */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <img src="https://picsum.photos/seed/hackathon2/600/400" alt="Sustainable Tech Hack" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-text mb-2">Sustainable Tech Hack</h3>
            <p className="text-muted text-sm mb-4">Create technology solutions for environmental challenges</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Sustainability</span>
              <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">GreenTech</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-primary font-semibold">$25,000</span>
              <span className="text-muted text-sm">180 registered</span>
            </div>
            <Link to="/participant/hackathons/2" className="w-full px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 text-center block">Register Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedHackathons;
