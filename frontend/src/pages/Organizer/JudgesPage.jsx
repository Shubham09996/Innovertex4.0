import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoleAssignmentModal from '../../components/Organizer/RoleAssignmentModal';
import TeamAssignmentModal from '../../components/Organizer/TeamAssignmentModal';
import AssignedTeams from '../../components/Organizer/AssignedTeams';
import InviteJudgeModal from '../../components/Organizer/InviteJudgeModal';

export default function JudgesPage() {
  const [selectedHackathon, setSelectedHackathon] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('judges');

  // Mock data for judges
  const judges = [
    {
      id: 1,
      name: 'Marcus Rodriguez',
      email: 'marcus.rodriguez@email.com',
      role: 'Judge',
      hackathon: 'AI Innovation Challenge 2024',
      skills: ['Python', 'Data Science', 'Machine Learning'],
      status: 'Active',
      joinedDate: 'Dec 8, 2024',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      assignedTeams: 3,
      evaluationsCompleted: 12
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'Judge',
      hackathon: 'Web3 Development Hackathon',
      skills: ['Blockchain', 'Solidity', 'Web3'],
      status: 'Active',
      joinedDate: 'Dec 5, 2024',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      assignedTeams: 2,
      evaluationsCompleted: 8
    },
    {
      id: 3,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@email.com',
      role: 'Judge',
      hackathon: 'HealthTech Innovation',
      skills: ['AI Research', 'Computer Vision', 'NLP'],
      status: 'Active',
      joinedDate: 'Dec 3, 2024',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      assignedTeams: 4,
      evaluationsCompleted: 15
    }
  ];

  const hackathons = [
    { id: 'all', name: 'All Hackathons' },
    { id: 1, name: 'AI Innovation Challenge 2024' },
    { id: 2, name: 'Web3 Development Hackathon' },
    { id: 3, name: 'HealthTech Innovation' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Inactive': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredJudges = judges.filter(judge => {
    const matchesHackathon = selectedHackathon === 'all' || judge.hackathon === hackathons.find(h => h.id === selectedHackathon)?.name;
    const matchesSearch = judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         judge.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHackathon && matchesSearch;
  });

  const handleAssignTeams = (judge) => {
    setSelectedJudge(judge);
    setIsTeamModalOpen(true);
  };

  const handleTeamAssignment = (assignment) => {
    console.log('Teams assigned to judge:', assignment);
    setIsTeamModalOpen(false);
    setSelectedJudge(null);
  };

  const handleInviteJudge = (inviteData) => {
    console.log('Judge invited:', inviteData);
    // Here you would typically make an API call to invite the judge
    alert(`Invitation sent to ${inviteData.judge ? inviteData.judge.name : inviteData.email}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Judges Management</h1>
          <p className="text-muted">Manage judges and assign teams for evaluation</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span>+</span>
            <span>Invite Judge</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search judges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedHackathon}
              onChange={(e) => setSelectedHackathon(e.target.value)}
              className="px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            >
              {hackathons.map(hackathon => (
                <option key={hackathon.id} value={hackathon.id}>{hackathon.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Judges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJudges.map((judge) => (
          <div
            key={judge.id}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-200 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={judge.avatar}
                  alt={judge.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-text">{judge.name}</h3>
                  <p className="text-sm text-muted">{judge.email}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-purple-500/20 text-purple-400 border-purple-500/30">
                Judge
              </span>
            </div>

            {/* Hackathon Info */}
            <div className="mb-4">
              <p className="text-sm text-muted mb-1">Hackathon</p>
              <p className="text-sm text-text font-medium">{judge.hackathon}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{judge.assignedTeams}</div>
                <div className="text-xs text-muted">Assigned Teams</div>
              </div>
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{judge.evaluationsCompleted}</div>
                <div className="text-xs text-muted">Evaluations</div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="text-sm text-muted mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {judge.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Status and Date */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(judge.status)}`}>
                {judge.status}
              </span>
              <span className="text-xs text-muted">Joined: {judge.joinedDate}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button 
                onClick={() => handleAssignTeams(judge)}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                Assign Teams
              </button>
              <Link
                to={`/organizer/judges/${judge.id}/profile`}
                className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJudges.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚖️</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-4">No Judges Found</h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            {searchTerm || selectedHackathon !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No judges have been assigned to your hackathons yet'
            }
          </p>
          <button className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
            Invite Judges
          </button>
        </div>
      )}

      {/* Team Assignment Modal */}
      <TeamAssignmentModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        judgeOrMentor={selectedJudge}
        hackathon={{ id: 1, name: 'AI Innovation Challenge 2024' }}
        onAssign={handleTeamAssignment}
      />

      {/* Invite Judge Modal */}
      <InviteJudgeModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteJudge}
      />
    </main>
  );
}
