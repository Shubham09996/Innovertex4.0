import React, { useState } from 'react';

export default function TeamAssignmentModal({ isOpen, onClose, judgeOrMentor, hackathon, onAssign }) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock teams data for the hackathon
  const teams = [
    { id: 1, name: 'TechTitans', members: 4, project: 'AI-Powered Healthcare App', status: 'Active' },
    { id: 2, name: 'CodeMasters', members: 3, project: 'Blockchain Voting System', status: 'Active' },
    { id: 3, name: 'InnovationHub', members: 5, project: 'IoT Smart Home Solution', status: 'Active' },
    { id: 4, name: 'DataDrivers', members: 3, project: 'ML Fraud Detection', status: 'Active' },
    { id: 5, name: 'WebWizards', members: 4, project: 'E-commerce Platform', status: 'Active' },
    { id: 6, name: 'CloudBuilders', members: 2, project: 'Cloud Migration Tool', status: 'Active' }
  ];

  const handleTeamToggle = (teamId) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onAssign({
        judgeOrMentorId: judgeOrMentor.id,
        hackathonId: hackathon.id,
        teamIds: selectedTeams
      });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">Assign Teams</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Judge/Mentor Info */}
        {judgeOrMentor && (
          <div className="flex items-center gap-3 mb-6 p-4 bg-bg-elev rounded-lg">
            <img
              src={judgeOrMentor.avatar}
              alt={judgeOrMentor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-text text-lg">{judgeOrMentor.name}</h3>
              <p className="text-muted">{judgeOrMentor.email}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                judgeOrMentor.role === 'Judge' 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}>
                {judgeOrMentor.role}
              </span>
            </div>
          </div>
        )}

        {/* Hackathon Info */}
        {hackathon && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="font-semibold text-primary mb-1">{hackathon.name}</h4>
            <p className="text-sm text-primary/80">
              {judgeOrMentor?.role === 'Judge' 
                ? 'Select teams to evaluate and score their submissions'
                : 'Select teams to mentor and guide during the hackathon'
              }
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text mb-4">
              Select Teams to Assign *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team) => (
                <label
                  key={team.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTeams.includes(team.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-bg-elev hover:border-primary/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team.id)}
                    onChange={() => handleTeamToggle(team.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-text">{team.name}</div>
                      <span className="text-xs text-muted">{team.members} members</span>
                    </div>
                    <div className="text-sm text-muted mb-2">{team.project}</div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        team.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></span>
                      <span className="text-xs text-muted">{team.status}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Selected Teams Summary */}
          {selectedTeams.length > 0 && (
            <div className="p-4 bg-bg-elev rounded-lg">
              <h4 className="font-semibold text-text mb-2">
                Selected Teams ({selectedTeams.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTeams.map(teamId => {
                  const team = teams.find(t => t.id === teamId);
                  return (
                    <span
                      key={teamId}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                    >
                      {team?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Role-specific Information */}
          {judgeOrMentor?.role === 'Judge' && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Judge Responsibilities:</h4>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Evaluate assigned team submissions</li>
                <li>• Score based on predefined criteria</li>
                <li>• Provide detailed feedback</li>
                <li>• Participate in judging discussions</li>
                <li>• Ensure fair and consistent evaluation</li>
              </ul>
            </div>
          )}

          {judgeOrMentor?.role === 'Mentor' && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Mentor Responsibilities:</h4>
              <ul className="text-sm text-green-300 space-y-1">
                <li>• Guide assigned teams during hackathon</li>
                <li>• Answer technical questions</li>
                <li>• Provide feedback on project direction</li>
                <li>• Help with problem-solving</li>
                <li>• Support team collaboration</li>
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selectedTeams.length === 0}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Assigning...
                </>
              ) : (
                `Assign ${selectedTeams.length} Team${selectedTeams.length !== 1 ? 's' : ''}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
