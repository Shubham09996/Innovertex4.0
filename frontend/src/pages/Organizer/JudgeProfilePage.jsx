import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function JudgeProfilePage() {
  const { judgeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [judge, setJudge] = useState(null);

  // Mock data for judge profile
  const judgeData = {
    id: judgeId,
    name: 'Dr. Emily Watson',
    email: 'emily.watson@university.edu',
    title: 'Professor of Computer Science',
    institution: 'Stanford University',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Dr. Emily Watson is a distinguished professor of Computer Science at Stanford University with over 15 years of experience in artificial intelligence and machine learning. She has published over 100 research papers and has been a judge for numerous international hackathons and competitions.',
    skills: ['AI/ML', 'Data Science', 'Research', 'Python', 'TensorFlow', 'PyTorch'],
    experience: '15+ years',
    rating: 4.9,
    hackathonsJudged: 25,
    totalEvaluations: 150,
    averageScore: 87.5,
    isAvailable: true,
    location: 'Stanford, CA',
    linkedin: 'https://linkedin.com/in/emily-watson',
    github: 'https://github.com/emily-watson',
    website: 'https://emilywatson.stanford.edu',
    joinedDate: 'Jan 15, 2024',
    lastActive: '2 hours ago',
    specializations: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Data Mining',
      'Research Methodology'
    ],
    achievements: [
      'IEEE Fellow (2023)',
      'Best Paper Award - ICML 2022',
      'Outstanding Judge Award - Hackathon Central 2023',
      'Top 1% Reviewer - NeurIPS 2021-2023'
    ],
    currentHackathons: [
      {
        id: 1,
        name: 'AI Innovation Challenge 2024',
        role: 'Lead Judge',
        status: 'Active',
        assignedTeams: 5,
        evaluationsCompleted: 12
      },
      {
        id: 2,
        name: 'HealthTech Innovation',
        role: 'Judge',
        status: 'Active',
        assignedTeams: 3,
        evaluationsCompleted: 8
      }
    ],
    pastHackathons: [
      {
        id: 3,
        name: 'Web3 Development Hackathon',
        role: 'Judge',
        status: 'Completed',
        assignedTeams: 4,
        evaluationsCompleted: 15,
        completedDate: 'Nov 2024'
      },
      {
        id: 4,
        name: 'FinTech Revolution',
        role: 'Lead Judge',
        status: 'Completed',
        assignedTeams: 6,
        evaluationsCompleted: 18,
        completedDate: 'Oct 2024'
      }
    ],
    evaluationStats: {
      totalEvaluations: 150,
      averageScore: 87.5,
      consistency: 92.3,
      feedbackQuality: 4.8,
      onTimeRate: 98.5
    },
    recentEvaluations: [
      {
        id: 1,
        teamName: 'TechTitans',
        project: 'AI-Powered Healthcare App',
        score: 92,
        feedback: 'Excellent technical implementation with innovative AI approach. The user interface is intuitive and the integration with hospital systems shows great potential.',
        evaluatedAt: 'Dec 20, 2024'
      },
      {
        id: 2,
        teamName: 'DataDrivers',
        project: 'ML Fraud Detection System',
        score: 88,
        feedback: 'Strong technical foundation and good use of machine learning. The project addresses a real healthcare need effectively.',
        evaluatedAt: 'Dec 19, 2024'
      },
      {
        id: 3,
        teamName: 'InnovationHub',
        project: 'IoT Smart Home Solution',
        score: 95,
        feedback: 'Outstanding innovation and technical excellence. The project demonstrates deep understanding of IoT technologies.',
        evaluatedAt: 'Dec 18, 2024'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJudge(judgeData);
      setLoading(false);
    }, 1000);
  }, [judgeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!judge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Judge Not Found</h2>
          <button
            onClick={() => navigate('/organizer/judges')}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back to Judges
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
            onClick={() => navigate('/organizer/judges')}
            className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-4xl font-bold text-text">{judge.name}</h1>
            <p className="text-muted">{judge.title} • {judge.institution}</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            judge.isAvailable 
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}>
            {judge.isAvailable ? 'Available' : 'Busy'}
          </span>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors">
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
                src={judge.avatar}
                alt={judge.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-text mb-2">{judge.name}</h2>
                <p className="text-lg text-primary font-semibold mb-1">{judge.title}</p>
                <p className="text-muted mb-4">{judge.institution} • {judge.location}</p>
                <p className="text-muted leading-relaxed">{judge.bio}</p>
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
                  {judge.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {judge.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full font-medium"
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
              {judge.currentHackathons.map((hackathon) => (
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
                      <div className="text-2xl font-bold text-text">{hackathon.evaluationsCompleted}</div>
                      <div className="text-xs text-muted">Evaluations</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Evaluations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Recent Evaluations</h3>
            <div className="space-y-4">
              {judge.recentEvaluations.map((evaluation) => (
                <div key={evaluation.id} className="bg-bg-elev border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-text">{evaluation.teamName}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{evaluation.score}/100</span>
                      <span className="text-xs text-muted">{evaluation.evaluatedAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-2">{evaluation.project}</p>
                  <p className="text-sm text-text">{evaluation.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Judge Statistics</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-3xl font-bold text-text mb-1">{judge.rating}</div>
                <div className="text-sm text-muted">Overall Rating</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{judge.hackathonsJudged}</div>
                <div className="text-sm text-muted">Hackathons Judged</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{judge.totalEvaluations}</div>
                <div className="text-sm text-muted">Total Evaluations</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{judge.averageScore}</div>
                <div className="text-sm text-muted">Average Score</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted">Email</span>
                <p className="text-text font-medium">{judge.email}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Location</span>
                <p className="text-text font-medium">{judge.location}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Experience</span>
                <p className="text-text font-medium">{judge.experience}</p>
              </div>
              <div>
                <span className="text-sm text-muted">Last Active</span>
                <p className="text-text font-medium">{judge.lastActive}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Social Links</h3>
            <div className="space-y-3">
              <a
                href={judge.linkedin}
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
                href={judge.github}
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
                href={judge.website}
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
              {judge.achievements.map((achievement, index) => (
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
