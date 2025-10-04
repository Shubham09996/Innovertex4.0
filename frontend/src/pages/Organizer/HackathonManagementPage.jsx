import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function HackathonManagementPage() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hackathon, setHackathon] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for hackathon management
  const hackathonData = {
    id: hackathonId,
    name: 'AI Innovation Challenge 2024',
    description: 'A cutting-edge hackathon focused on AI and machine learning innovations to solve real-world problems.',
    status: 'Active',
    startDate: 'Dec 15, 2024',
    endDate: 'Dec 20, 2024',
    registrationDeadline: 'Dec 14, 2024',
    mode: 'Online',
    technologyStack: ['AI/ML', 'Python', 'TensorFlow', 'React'],
    prizePool: 25000,
    maxTeamSize: 4,
    eligibility: 'Students and Professionals',
    totalParticipants: 284,
    totalTeams: 56,
    totalSubmissions: 42,
    overview: {
      registrationRate: 85.2,
      submissionRate: 78.5,
      averageScore: 4.6,
      completionRate: 82.1
    },
    teams: [
      {
        id: 1,
        name: 'TechTitans',
        members: [
          { name: 'Sarah Chen', role: 'Team Lead', email: 'sarah@email.com' },
          { name: 'Mike Johnson', role: 'Developer', email: 'mike@email.com' },
          { name: 'Emma Davis', role: 'Designer', email: 'emma@email.com' },
          { name: 'Alex Kim', role: 'Developer', email: 'alex@email.com' }
        ],
        project: 'AI-Powered Healthcare App',
        status: 'Active',
        progress: 75,
        submissionStatus: 'In Progress',
        joinedDate: 'Dec 10, 2024'
      },
      {
        id: 2,
        name: 'DataDrivers',
        members: [
          { name: 'Kevin Park', role: 'Team Lead', email: 'kevin@email.com' },
          { name: 'Rachel Green', role: 'Data Scientist', email: 'rachel@email.com' },
          { name: 'Chris Martin', role: 'Developer', email: 'chris@email.com' }
        ],
        project: 'ML Fraud Detection System',
        status: 'Active',
        progress: 85,
        submissionStatus: 'In Progress',
        joinedDate: 'Dec 11, 2024'
      }
    ],
    judges: [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@email.com',
        assignedTeams: 8,
        evaluationsCompleted: 6,
        status: 'Active'
      },
      {
        id: 2,
        name: 'Prof. Michael Chen',
        email: 'michael.chen@email.com',
        assignedTeams: 7,
        evaluationsCompleted: 5,
        status: 'Active'
      }
    ],
    mentors: [
      {
        id: 1,
        name: 'Dr. Emily Watson',
        email: 'emily.watson@email.com',
        assignedTeams: 5,
        sessionsCompleted: 8,
        status: 'Active'
      },
      {
        id: 2,
        name: 'Marcus Rodriguez',
        email: 'marcus.rodriguez@email.com',
        assignedTeams: 6,
        sessionsCompleted: 12,
        status: 'Active'
      }
    ],
    announcements: [
      {
        id: 1,
        title: 'Submission Deadline Reminder',
        content: 'Just a friendly reminder that submissions are due by 11:59 PM on Dec 20, 2024.',
        createdAt: 'Dec 18, 2024',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Judging Criteria Update',
        content: 'We have updated the judging criteria. Please review the new guidelines in your dashboard.',
        createdAt: 'Dec 17, 2024',
        priority: 'medium'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHackathon(hackathonData);
      setLoading(false);
    }, 1000);
  }, [hackathonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Hackathon Not Found</h2>
          <button
            onClick={() => navigate('/organizer/hackathons')}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back to Hackathons
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'teams', name: 'Teams', icon: '👥' },
    { id: 'judges', name: 'Judges', icon: '⚖️' },
    { id: 'mentors', name: 'Mentors', icon: '🎓' },
    { id: 'announcements', name: 'Announcements', icon: '📢' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">{hackathon.totalParticipants}</div>
          <div className="text-sm text-muted">Total Participants</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">{hackathon.totalTeams}</div>
          <div className="text-sm text-muted">Total Teams</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">{hackathon.totalSubmissions}</div>
          <div className="text-sm text-muted">Submissions</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">${(hackathon.prizePool / 1000).toFixed(0)}K</div>
          <div className="text-sm text-muted">Prize Pool</div>
        </div>
      </div>

      {/* Hackathon Details */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-text mb-4">Hackathon Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-text mb-2">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted">Status:</span> <span className="text-text">{hackathon.status}</span></div>
              <div><span className="text-muted">Mode:</span> <span className="text-text">{hackathon.mode}</span></div>
              <div><span className="text-muted">Max Team Size:</span> <span className="text-text">{hackathon.maxTeamSize}</span></div>
              <div><span className="text-muted">Eligibility:</span> <span className="text-text">{hackathon.eligibility}</span></div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-2">Timeline</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted">Start Date:</span> <span className="text-text">{hackathon.startDate}</span></div>
              <div><span className="text-muted">End Date:</span> <span className="text-text">{hackathon.endDate}</span></div>
              <div><span className="text-muted">Registration Deadline:</span> <span className="text-text">{hackathon.registrationDeadline}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-text mb-4">Technology Stack</h3>
        <div className="flex flex-wrap gap-2">
          {hackathon.technologyStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Teams ({hackathon.teams.length})</h3>
        <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
          Export Teams
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hackathon.teams.map((team) => (
          <div key={team.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text">{team.name}</h4>
                <p className="text-muted text-sm">{team.project}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                team.submissionStatus === 'Submitted' 
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {team.submissionStatus}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted">Progress</span>
                <span className="text-sm font-semibold text-text">{team.progress}%</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    team.progress >= 80 ? 'bg-green-500' : team.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${team.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-semibold text-text mb-2">Team Members ({team.members.length})</h5>
              <div className="space-y-1">
                {team.members.map((member, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-text">{member.name}</span>
                    <span className="text-muted">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                View Details
              </button>
              <button className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJudges = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Judges ({hackathon.judges.length})</h3>
        <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
          Add Judge
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathon.judges.map((judge) => (
          <div key={judge.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text">{judge.name}</h4>
                <p className="text-muted text-sm">{judge.email}</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                {judge.status}
              </span>
            </div>
            
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

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                Manage Teams
              </button>
              <button className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Mentors ({hackathon.mentors.length})</h3>
        <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
          Add Mentor
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathon.mentors.map((mentor) => (
          <div key={mentor.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text">{mentor.name}</h4>
                <p className="text-muted text-sm">{mentor.email}</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                {mentor.status}
              </span>
            </div>
            
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

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                Manage Teams
              </button>
              <button className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Announcements ({hackathon.announcements.length})</h3>
        <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
          Create Announcement
        </button>
      </div>
      <div className="space-y-4">
        {hackathon.announcements.map((announcement) => (
          <div key={announcement.id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-lg font-semibold text-text">{announcement.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                announcement.priority === 'high' 
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {announcement.priority}
              </span>
            </div>
            <p className="text-muted text-sm mb-3">{announcement.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Created: {announcement.createdAt}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-2 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 bg-transparent border border-border text-text rounded-lg text-xs font-semibold hover:border-primary-300 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-text">Hackathon Settings</h3>
      <div className="bg-card border border-border rounded-xl p-6">
        <h4 className="text-lg font-semibold text-text mb-4">General Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Hackathon Name</label>
            <input
              type="text"
              value={hackathon.name}
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Description</label>
            <textarea
              value={hackathon.description}
              rows={4}
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Start Date</label>
              <input
                type="date"
                value="2024-12-15"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">End Date</label>
              <input
                type="date"
                value="2024-12-20"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-2 transition-colors">
            Save Changes
          </button>
          <button className="bg-transparent border border-border text-text px-6 py-3 rounded-lg font-semibold hover:border-primary-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate('/organizer/hackathons')}
              className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
            >
              ←
            </button>
            <h1 className="text-4xl font-bold text-text">{hackathon.name} Management</h1>
          </div>
          <p className="text-muted">Manage teams, judges, mentors, and settings</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            hackathon.status === 'Active' 
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
          }`}>
            {hackathon.status}
          </span>
          <Link
            to={`/organizer/hackathons/${hackathon.id}/analytics`}
            className="btn bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span>📊</span>
            <span>Analytics</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-bg-elev text-text hover:bg-bg-elev/80'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'teams' && renderTeams()}
        {activeTab === 'judges' && renderJudges()}
        {activeTab === 'mentors' && renderMentors()}
        {activeTab === 'announcements' && renderAnnouncements()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </main>
  );
}
