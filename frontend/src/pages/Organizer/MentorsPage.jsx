import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoleAssignmentModal from '../../components/Organizer/RoleAssignmentModal';
import TeamAssignmentModal from '../../components/Organizer/TeamAssignmentModal';
import AssignedTeams from '../../components/Organizer/AssignedTeams';
import InviteMentorModal from '../../components/Organizer/InviteMentorModal';

export default function MentorsPage() {
  const [selectedHackathon, setSelectedHackathon] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: 'Dr. Emily Watson',
      email: 'emily.watson@email.com',
      role: 'Mentor',
      hackathon: 'AI Innovation Challenge 2024',
      skills: ['AI Research', 'Computer Vision', 'NLP'],
      status: 'Active',
      joinedDate: 'Dec 5, 2024',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      assignedTeams: 2,
      sessionsCompleted: 8
    },
    {
      id: 2,
      name: 'Prof. David Kim',
      email: 'david.kim@email.com',
      role: 'Mentor',
      hackathon: 'Web3 Development Hackathon',
      skills: ['Blockchain', 'Solidity', 'DeFi'],
      status: 'Active',
      joinedDate: 'Dec 3, 2024',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      assignedTeams: 3,
      sessionsCompleted: 12
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      email: 'lisa.chen@email.com',
      role: 'Mentor',
      hackathon: 'HealthTech Innovation',
      skills: ['Healthcare Tech', 'IoT', 'Data Analytics'],
      status: 'Active',
      joinedDate: 'Dec 1, 2024',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      assignedTeams: 1,
      sessionsCompleted: 5
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

  const filteredMentors = mentors.filter(mentor => {
    const matchesHackathon = selectedHackathon === 'all' || mentor.hackathon === hackathons.find(h => h.id === selectedHackathon)?.name;
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHackathon && matchesSearch;
  });

  const handleAssignTeams = (mentor) => {
    setSelectedMentor(mentor);
    setIsTeamModalOpen(true);
  };

  const handleTeamAssignment = (assignment) => {
    console.log('Teams assigned to mentor:', assignment);
    setIsTeamModalOpen(false);
    setSelectedMentor(null);
  };

  const handleInviteMentor = (inviteData) => {
    console.log('Mentor invited:', inviteData);
    // Here you would typically make an API call to invite the mentor
    alert(`Invitation sent to ${inviteData.mentor ? inviteData.mentor.name : inviteData.email}`);
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
          <h1 className="text-4xl font-bold text-text mb-2">Mentors Management</h1>
          <p className="text-muted">Manage mentors and assign teams for guidance</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span>+</span>
            <span>Invite Mentor</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search mentors..."
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

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-200 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-text">{mentor.name}</h3>
                  <p className="text-sm text-muted">{mentor.email}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-green-500/20 text-green-400 border-green-500/30">
                Mentor
              </span>
            </div>

            {/* Hackathon Info */}
            <div className="mb-4">
              <p className="text-sm text-muted mb-1">Hackathon</p>
              <p className="text-sm text-text font-medium">{mentor.hackathon}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{mentor.assignedTeams}</div>
                <div className="text-xs text-muted">Assigned Teams</div>
              </div>
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{mentor.sessionsCompleted}</div>
                <div className="text-xs text-muted">Sessions</div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="text-sm text-muted mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {mentor.skills.map((skill, index) => (
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
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(mentor.status)}`}>
                {mentor.status}
              </span>
              <span className="text-xs text-muted">Joined: {mentor.joinedDate}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button 
                onClick={() => handleAssignTeams(mentor)}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                Assign Teams
              </button>
              <Link
                to={`/organizer/mentors/${mentor.id}/profile`}
                className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎓</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-4">No Mentors Found</h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            {searchTerm || selectedHackathon !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No mentors have been assigned to your hackathons yet'
            }
          </p>
          <button className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
            Invite Mentors
          </button>
        </div>
      )}

      {/* Team Assignment Modal */}
      <TeamAssignmentModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        judgeOrMentor={selectedMentor}
        hackathon={{ id: 1, name: 'AI Innovation Challenge 2024' }}
        onAssign={handleTeamAssignment}
      />

      {/* Invite Mentor Modal */}
      <InviteMentorModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteMentor}
      />
    </main>
  );
}
