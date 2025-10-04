import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MentorProfilePage() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mentor, setMentor] = useState(null);

  // Mock data for mentor profile
  const mentorData = {
    id: mentorId,
    name: 'Dr. Lisa Rodriguez',
    email: 'lisa.rodriguez@techcorp.com',
    title: 'Senior Software Engineer',
    institution: 'Microsoft',
    avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
    bio: 'Dr. Lisa Rodriguez is a Senior Software Engineer at Microsoft with over 12 years of experience in full-stack development and cloud computing. She has mentored numerous hackathon teams and has a passion for helping developers grow their skills and build innovative solutions.',
    skills: ['Full Stack', 'Cloud Computing', 'Leadership', 'React', 'Node.js', 'Azure'],
    experience: '12+ years',
    rating: 4.8,
    hackathonsMentored: 20,
    totalSessions: 120,
    averageRating: 4.8,
    isAvailable: true,
    location: 'Seattle, WA',
    linkedin: 'https://linkedin.com/in/lisa-rodriguez',
    github: 'https://github.com/lisa-rodriguez',
    website: 'https://lisa-rodriguez.dev',
    joinedDate: 'Feb 10, 2024',
    lastActive: '1 hour ago',
    specializations: [
      'Full Stack Development',
      'Cloud Architecture',
      'Team Leadership',
      'Code Review',
      'Technical Mentoring',
      'Career Guidance'
    ],
    achievements: [
      'Microsoft MVP (2023)',
      'Best Mentor Award - Hackathon Central 2023',
      'Top 1% Contributor - GitHub 2022-2023',
      'Speaker at 15+ Tech Conferences'
    ],
    currentHackathons: [
      {
        id: 1,
        name: 'AI Innovation Challenge 2024',
        role: 'Lead Mentor',
        status: 'Active',
        assignedTeams: 3,
        sessionsCompleted: 8
      },
      {
        id: 2,
        name: 'HealthTech Innovation',
        role: 'Mentor',
        status: 'Active',
        assignedTeams: 2,
        sessionsCompleted: 5
      }
    ],
    pastHackathons: [
      {
        id: 3,
        name: 'Web3 Development Hackathon',
        role: 'Mentor',
        status: 'Completed',
        assignedTeams: 4,
        sessionsCompleted: 12,
        completedDate: 'Nov 2024'
      },
      {
        id: 4,
        name: 'FinTech Revolution',
        role: 'Lead Mentor',
        status: 'Completed',
        assignedTeams: 5,
        sessionsCompleted: 15,
        completedDate: 'Oct 2024'
      }
    ],
    mentoringStats: {
      totalSessions: 120,
      averageRating: 4.8,
      responseTime: '2 hours',
      availability: 95.5,
      satisfaction: 4.9
    },
    recentSessions: [
      {
        id: 1,
        teamName: 'TechTitans',
        project: 'AI-Powered Healthcare App',
        sessionType: 'Technical Review',
        duration: '45 minutes',
        feedback: 'Great progress on the AI model! Focus on improving the user interface and consider adding more validation.',
        sessionDate: 'Dec 20, 2024'
      },
      {
        id: 2,
        teamName: 'DataDrivers',
        project: 'ML Fraud Detection System',
        sessionType: 'Architecture Discussion',
        duration: '60 minutes',
        feedback: 'Excellent architecture design. Consider implementing microservices for better scalability.',
        sessionDate: 'Dec 19, 2024'
      },
      {
        id: 3,
        teamName: 'InnovationHub',
        project: 'IoT Smart Home Solution',
        sessionType: 'Code Review',
        duration: '30 minutes',
        feedback: 'Code quality is good. Add more error handling and consider using TypeScript for better type safety.',
        sessionDate: 'Dec 18, 2024'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMentor(mentorData);
      setLoading(false);
    }, 1000);
  }, [mentorId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Mentor Not Found</h2>
          <button
            onClick={() => navigate('/organizer/mentors')}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back to Mentors
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/organizer/mentors')}
            className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-4xl font-bold text-text">{mentor.name}</h1>
            <p className="text-muted">{mentor.title} • {mentor.institution}</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            mentor.isAvailable 
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}>
            {mentor.isAvailable ? 'Available' : 'Busy'}
          </span>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Assign Teams
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Overview */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-6">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-text mb-2">{mentor.name}</h2>
                <p className="text-lg text-primary font-semibold mb-1">{mentor.title}</p>
                <p className="text-muted mb-4">{mentor.institution} • {mentor.location}</p>
                <p className="text-muted leading-relaxed">{mentor.bio}</p>
              </div>
            </div>
          </div>

          {/* Skills & Specializations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Skills & Specializations</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-muted mb-2">Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Current Hackathons */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Current Hackathons</h3>
            <div className="space-y-4">
              {mentor.currentHackathons.map((hackathon) => (
                <div key={hackathon.id} className="bg-bg-elev border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-text">{hackathon.name}</h4>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      {hackathon.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted mb-3">Role: {hackathon.role}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-bg rounded-lg">
                      <div className="text-2xl font-bold text-text">{hackathon.assignedTeams}</div>
                      <div className="text-xs text-muted">Assigned Teams</div>
                    </div>
                    <div className="text-center p-3 bg-bg rounded-lg">
                      <div className="text-2xl font-bold text-text">{hackathon.sessionsCompleted}</div>
                      <div className="text-xs text-muted">Sessions</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Recent Mentoring Sessions</h3>
            <div className="space-y-4">
              {mentor.recentSessions.map((session) => (
                <div key={session.id} className="bg-bg-elev border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-text">{session.teamName}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted">{session.duration}</span>
                      <span className="text-xs text-muted">{session.sessionDate}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-2">{session.project}</p>
                  <p className="text-sm text-primary font-medium mb-2">Session: {session.sessionType}</p>
                  <p className="text-sm text-text">{session.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Mentoring Statistics</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-3xl font-bold text-text mb-1">{mentor.rating}</div>
                <div className="text-sm text-muted">Overall Rating</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{mentor.hackathonsMentored}</div>
                <div className="text-sm text-muted">Hackathons Mentored</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{mentor.totalSessions}</div>
                <div className="text-sm text-muted">Total Sessions</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{mentor.mentoringStats.availability}%</div>
                <div className="text-sm text-muted">Availability</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted">Email</span>
                <p className="text-text font-medium">{mentor.email}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Location</span>
                <p className="text-text font-medium">{mentor.location}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Experience</span>
                <p className="text-text font-medium">{mentor.experience}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Last Active</span>
                <p className="text-text font-medium">{mentor.lastActive}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Social Links</h3>
            <div className="space-y-3">
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors"
              >
                <span className="text-2xl">💼</span>
                <div>
                  <div className="font-semibold text-text">LinkedIn</div>
                  <div className="text-sm text-muted">Professional Profile</div>
                </div>
              </a>
              <a
                href={mentor.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors"
              >
                <span className="text-2xl">🐙</span>
                <div>
                  <div className="font-semibold text-text">GitHub</div>
                  <div className="text-sm text-muted">Code Repository</div>
                </div>
              </a>
              <a
                href={mentor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors"
              >
                <span className="text-2xl">🌐</span>
                <div>
                  <div className="font-semibold text-text">Website</div>
                  <div className="text-sm text-muted">Personal Website</div>
                </div>
              </a>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Achievements</h3>
            <div className="space-y-2">
              {mentor.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-bg-elev rounded-lg">
                  <span className="text-yellow-400">🏆</span>
                  <span className="text-sm text-text">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
