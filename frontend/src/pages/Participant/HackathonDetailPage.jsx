import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const HackathonDetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 pt-20">
        <h1 className="text-4xl font-bold text-text mb-8">Hackathon Details</h1>
        <p className="text-muted">Details about a specific hackathon and registration options.</p>
        {/* Add hackathon details and registration forms here */}
      </main>
      <Footer />
    </div>
  );
};

export default HackathonDetailPage;
