import React, { useState } from 'react';

export default function RoleAssignmentModal({ isOpen, onClose, participant, onAssign }) {
  const [selectedRole, setSelectedRole] = useState(participant?.role || '');
  const [selectedHackathon, setSelectedHackathon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { value: 'Participant', label: 'Participant', description: 'Regular hackathon participant' },
    { value: 'Judge', label: 'Judge', description: 'Evaluate and score submissions' },
    { value: 'Mentor', label: 'Mentor', description: 'Guide and help participants' }
  ];

  const hackathons = [
    { id: 1, name: 'AI Innovation Challenge 2024' },
    { id: 2, name: 'Web3 Development Hackathon' },
    { id: 3, name: 'HealthTech Innovation' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onAssign({
        participantId: participant.id,
        role: selectedRole,
        hackathonId: selectedHackathon
      });
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">Assign Role</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
          >
            ×
          </button>
        </div>

        {participant && (
          <div className="flex items-center gap-3 mb-6 p-3 bg-bg-elev rounded-lg">
            <img
              src={participant.avatar}
              alt={participant.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-text">{participant.name}</h3>
              <p className="text-sm text-muted">{participant.email}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Select Role *
            </label>
            <div className="space-y-3">
              {roles.map((role) => (
                <label
                  key={role.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedRole === role.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-bg-elev hover:border-primary/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold text-text">{role.label}</div>
                    <div className="text-sm text-muted">{role.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Assign to Hackathon *
            </label>
            <select
              value={selectedHackathon}
              onChange={(e) => setSelectedHackathon(e.target.value)}
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            >
              <option value="">Select Hackathon</option>
              {hackathons.map((hackathon) => (
                <option key={hackathon.id} value={hackathon.id}>
                  {hackathon.name}
                </option>
              ))}
            </select>
          </div>

          {selectedRole === 'Judge' && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Judge Responsibilities:</h4>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Evaluate assigned submissions</li>
                <li>• Provide detailed feedback</li>
                <li>• Score based on criteria</li>
                <li>• Participate in judging discussions</li>
              </ul>
            </div>
          )}

          {selectedRole === 'Mentor' && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Mentor Responsibilities:</h4>
              <ul className="text-sm text-green-300 space-y-1">
                <li>• Guide participants during hackathon</li>
                <li>• Answer technical questions</li>
                <li>• Provide feedback on projects</li>
                <li>• Help with problem-solving</li>
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
              disabled={isSubmitting || !selectedRole || !selectedHackathon}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Assigning...
                </>
              ) : (
                'Assign Role'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
