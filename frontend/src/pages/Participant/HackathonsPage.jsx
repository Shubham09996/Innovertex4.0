import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const HackathonsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 pt-20">
        <h1 className="text-4xl font-bold text-text mb-8">All Hackathons</h1>
        <p className="text-muted">Here you can browse through all available hackathons.</p>
        {/* Add hackathon listing components here */}
      </main>
      <Footer />
    </div>
  );
};

export default HackathonsPage;
