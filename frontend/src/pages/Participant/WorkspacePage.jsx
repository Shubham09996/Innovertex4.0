import React from 'react';
import { useLocation } from 'react-router-dom';

const WorkspacePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('teamId');

  // Dummy data for team members
  const teamMembers = [
    { id: 'mem1', name: 'Alice' },
    { id: 'mem2', name: 'Bob' },
    { id: 'mem3', name: 'Charlie' },
  ];

  return (
    <main className="flex-grow container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold text-text mb-8">Hackathon Workspace</h1>
      <p className="text-muted mb-8">This is your dedicated workspace for the hackathon.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Workspace Content */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-text mb-4">Your Project</h2>
          <p className="text-muted mb-4">Here you can manage your project, upload submissions, and find resources.</p>
          {/* Placeholder for project management tools */}
          <div className="h-48 bg-bg-elev rounded-lg flex items-center justify-center text-muted mb-4">
            Project management dashboard placeholder
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">Submit Project</button>
        </div>

        {/* Team Information & Chat Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">Team Details</h2>
            <p className="text-text mb-2"><strong>Team ID:</strong> {teamId || 'N/A'}</p>
            <h3 className="text-xl font-semibold text-text mt-6 mb-3">Members:</h3>
            <ul className="list-disc pl-5 text-text">
              {teamMembers.map((member) => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">Team Chat</h2>
            <div className="h-64 bg-bg-elev rounded-lg p-4 flex items-center justify-center text-muted">
              <p>Team chat interface will go here.</p>
            </div>
            <textarea
              className="w-full mt-4 p-3 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Type your message here..."
            ></textarea>
            <button className="mt-4 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200">Send Message</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkspacePage;
