import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoleAssignmentModal from '../../components/Organizer/RoleAssignmentModal';
import TeamAssignmentModal from '../../components/Organizer/TeamAssignmentModal';
import AssignedTeams from '../../components/Organizer/AssignedTeams';

export default function ParticipantsPage() {
  const [selectedHackathon, setSelectedHackathon] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedJudgeOrMentor, setSelectedJudgeOrMentor] = useState(null);
  const [viewMode, setViewMode] = useState('participants'); // 'participants' or 'teams'

  // Mock data for teams (participants)
  const teams = [
    {
      id: 1,
      name: 'TechTitans',
      hackathon: 'AI Innovation Challenge 2024',
      members: [
        { name: 'Sarah Chen', role: 'Team Lead', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Mike Johnson', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
        { name: 'Emma Davis', role: 'Designer', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
        { name: 'Alex Kim', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' }
      ],
      project: 'AI-Powered Healthcare App',
      skills: ['React', 'Node.js', 'AI/ML', 'Python'],
      status: 'Active',
      progress: 75,
      joinedDate: 'Dec 10, 2024',
      submissionStatus: 'In Progress'
    },
    {
      id: 2,
      name: 'CodeMasters',
      hackathon: 'Web3 Development Hackathon',
      members: [
        { name: 'Alex Johnson', role: 'Team Lead', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { name: 'Sophie Wilson', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
        { name: 'David Lee', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' }
      ],
      project: 'Blockchain Voting System',
      skills: ['Solidity', 'Web3', 'Blockchain', 'React'],
      status: 'Active',
      progress: 60,
      joinedDate: 'Dec 12, 2024',
      submissionStatus: 'In Progress'
    },
    {
      id: 3,
      name: 'InnovationHub',
      hackathon: 'HealthTech Innovation',
      members: [
        { name: 'Lisa Wang', role: 'Team Lead', avatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
        { name: 'James Brown', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/40.jpg' },
        { name: 'Maria Garcia', role: 'Designer', avatar: 'https://randomuser.me/api/portraits/women/50.jpg' },
        { name: 'Tom Wilson', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
        { name: 'Anna Taylor', role: 'Researcher', avatar: 'https://randomuser.me/api/portraits/women/70.jpg' }
      ],
      project: 'IoT Smart Home Solution',
      skills: ['React', 'Python', 'Healthcare', 'IoT', 'Data Analytics'],
      status: 'Active',
      progress: 90,
      joinedDate: 'Dec 9, 2024',
      submissionStatus: 'Submitted'
    },
    {
      id: 4,
      name: 'DataDrivers',
      hackathon: 'AI Innovation Challenge 2024',
      members: [
        { name: 'Kevin Park', role: 'Team Lead', avatar: 'https://randomuser.me/api/portraits/men/30.jpg' },
        { name: 'Rachel Green', role: 'Data Scientist', avatar: 'https://randomuser.me/api/portraits/women/40.jpg' },
        { name: 'Chris Martin', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/50.jpg' }
      ],
      project: 'ML Fraud Detection System',
      skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
      status: 'Active',
      progress: 85,
      joinedDate: 'Dec 11, 2024',
      submissionStatus: 'In Progress'
    }
  ];

  const hackathons = [
    { id: 'all', name: 'All Hackathons' },
    { id: 1, name: 'AI Innovation Challenge 2024' },
    { id: 2, name: 'Web3 Development Hackathon' },
    { id: 3, name: 'HealthTech Innovation' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Participant': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Judge': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Mentor': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400';
      case 'Inactive': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesHackathon = selectedHackathon === 'all' || team.hackathon === hackathons.find(h => h.id === selectedHackathon)?.name;
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesHackathon && matchesSearch;
  });

  const handleAssignRole = (participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const handleRoleAssignment = (assignment) => {
    console.log('Role assigned:', assignment);
    // Here you would typically make an API call to assign the role
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };

  const handleAssignTeams = (participant) => {
    if (participant.role === 'Judge' || participant.role === 'Mentor') {
      setSelectedJudgeOrMentor(participant);
      setIsTeamModalOpen(true);
    }
  };

  const handleTeamAssignment = (assignment) => {
    console.log('Teams assigned:', assignment);
    // Here you would typically make an API call to assign teams
    setIsTeamModalOpen(false);
    setSelectedJudgeOrMentor(null);
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
          <h1 className="text-4xl font-bold text-text mb-2">Teams Management</h1>
          <p className="text-muted">Manage participating teams and track their progress</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <div className="flex bg-bg-elev rounded-lg p-1">
            <button
              onClick={() => setViewMode('participants')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                viewMode === 'participants'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-text'
              }`}
            >
              Teams
            </button>
            <button
              onClick={() => setViewMode('teams')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                viewMode === 'teams'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-text'
              }`}
            >
              Team Assignments
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search teams..."
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
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            >
              <option value="all">All Teams</option>
              <option value="active">Active Teams</option>
              <option value="submitted">Submitted</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'participants' ? (
        <>
          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2 group relative overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {team.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors duration-300">{team.name}</h3>
                  <p className="text-xs text-muted font-medium">{team.project}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold border shadow-lg ${
                team.submissionStatus === 'Submitted' 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}>
                {team.submissionStatus}
              </span>
            </div>

            {/* Hackathon Info */}
            <div className="mb-3 relative z-10">
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-md p-2 border border-primary/20">
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Hackathon</p>
                <p className="text-xs text-text font-bold">{team.hackathon}</p>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-3 relative z-10">
              <p className="text-xs text-muted mb-1 font-semibold">Team ({team.members.length})</p>
              <div className="flex -space-x-1">
                {team.members.slice(0, 4).map((member, index) => (
                  <div key={index} className="relative group/member">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-6 h-6 rounded-full border-2 border-card object-cover shadow-lg group-hover/member:scale-110 transition-transform duration-200"
                      title={`${member.name} - ${member.role}`}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-card"></div>
                  </div>
                ))}
                {team.members.length > 4 && (
                  <div className="w-6 h-6 rounded-full border-2 border-card bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-xs font-bold text-primary shadow-lg">
                    +{team.members.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-3 relative z-10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted font-semibold">Progress</span>
                <span className="text-xs font-bold text-text bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">{team.progress}%</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-1.5 shadow-inner">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 shadow-lg ${
                    team.progress >= 80 
                      ? 'bg-gradient-to-r from-green-400 to-green-600' 
                      : team.progress >= 60 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${team.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-3 relative z-10">
              <p className="text-xs text-muted mb-1 font-semibold">Skills</p>
              <div className="flex flex-wrap gap-1">
                {team.skills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary text-xs font-bold rounded-full border border-primary/30 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
                {team.skills.length > 2 && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-bg-elev to-bg-elev/80 text-muted text-xs font-bold rounded-full border border-border shadow-sm">
                    +{team.skills.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Status and Date */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg ${getStatusColor(team.status)}`}>
                {team.status}
              </span>
              <div className="text-right">
                <span className="text-xs text-muted font-medium">Joined</span>
                <p className="text-xs text-text font-bold">{team.joinedDate}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button 
                onClick={() => window.open(`/organizer/teams/${team.id}/submission/1`, '_blank')}
                className="flex-1 bg-gradient-to-r from-primary via-purple-500 to-primary-2 text-white py-1.5 px-3 rounded-md text-xs font-bold hover:from-primary-2 hover:via-purple-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-primary/30 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-1">
                  <span className="text-xs">📋</span>
                  <span>View Submission</span>
                </span>
              </button>
            </div>
          </div>
        ))}
          </div>

          {/* Empty State */}
          {filteredTeams.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👥</span>
          </div>
          <h3 className="text-2xl font-bold text-text mb-4">No Teams Found</h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            {searchTerm || filterRole !== 'all' || selectedHackathon !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No teams have joined your hackathons yet'
            }
          </p>
          <button className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
            Invite Teams
          </button>
        </div>
          )}
        </>
      ) : (
        /* Team Assignments View */
        <div className="space-y-6">
          {/* Mock judges and mentors for team assignments */}
          {[
            {
              id: 1,
              name: 'Dr. Sarah Johnson',
              email: 'sarah.johnson@email.com',
              role: 'Judge',
              avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
              assignedTeams: 3,
              evaluationsCompleted: 8
            },
            {
              id: 2,
              name: 'Prof. Michael Chen',
              email: 'michael.chen@email.com',
              role: 'Judge',
              avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
              assignedTeams: 2,
              evaluationsCompleted: 5
            },
            {
              id: 3,
              name: 'Dr. Emily Watson',
              email: 'emily.watson@email.com',
              role: 'Mentor',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              assignedTeams: 4,
              sessionsCompleted: 12
            },
            {
              id: 4,
              name: 'Marcus Rodriguez',
              email: 'marcus.rodriguez@email.com',
              role: 'Mentor',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              assignedTeams: 3,
              sessionsCompleted: 8
            }
          ].map((judgeOrMentor) => (
              <div key={judgeOrMentor.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={judgeOrMentor.avatar}
                    alt={judgeOrMentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-text">{judgeOrMentor.name}</h3>
                    <p className="text-muted">{judgeOrMentor.email}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                      judgeOrMentor.role === 'Judge' 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {judgeOrMentor.role}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => handleAssignTeams(judgeOrMentor)}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors"
                    >
                      Manage Teams
                    </button>
                  </div>
                </div>
                <AssignedTeams 
                  judgeOrMentor={judgeOrMentor} 
                  hackathon={{ id: 1, name: 'AI Innovation Challenge 2024' }}
                />
              </div>
            ))}
        </div>
      )}

      {/* Role Assignment Modal */}
      <RoleAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        participant={selectedParticipant}
        onAssign={handleRoleAssignment}
      />

      {/* Team Assignment Modal */}
      <TeamAssignmentModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        judgeOrMentor={selectedJudgeOrMentor}
        hackathon={{ id: 1, name: 'AI Innovation Challenge 2024' }}
        onAssign={handleTeamAssignment}
      />
    </main>
  );
}
