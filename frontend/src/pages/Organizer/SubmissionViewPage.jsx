import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SubmissionViewPage() {
  const { teamId, hackathonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState(null);

  // Mock data for team submission
  const submissionData = {
    id: teamId,
    hackathonId: hackathonId,
    teamName: 'TechTitans',
    projectName: 'AI-Powered Healthcare App',
    hackathon: 'AI Innovation Challenge 2024',
    status: 'Submitted',
    submittedAt: 'Dec 19, 2024 at 11:45 PM',
    members: [
      {
        name: 'Sarah Chen',
        role: 'Team Lead',
        email: 'sarah@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        name: 'Mike Johnson',
        role: 'Developer',
        email: 'mike@email.com',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        name: 'Emma Davis',
        role: 'Designer',
        email: 'emma@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
      },
      {
        name: 'Alex Kim',
        role: 'Developer',
        email: 'alex@email.com',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
      }
    ],
    description: 'An innovative AI-powered healthcare application that uses machine learning to predict patient health outcomes and provide personalized treatment recommendations. The app integrates with hospital systems to analyze patient data and provide real-time insights to healthcare professionals.',
    technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB', 'Docker'],
    features: [
      'Real-time health monitoring',
      'AI-powered diagnosis assistance',
      'Patient data visualization',
      'Treatment recommendation engine',
      'Integration with hospital systems',
      'Mobile-responsive design'
    ],
    githubLink: 'https://github.com/techtitans/ai-healthcare-app',
    demoLink: 'https://ai-healthcare-demo.vercel.app',
    videoLink: 'https://youtube.com/watch?v=demo123',
    documents: [
      {
        name: 'Project Presentation',
        type: 'PDF',
        size: '2.4 MB',
        url: '#'
      },
      {
        name: 'Technical Documentation',
        type: 'PDF',
        size: '1.8 MB',
        url: '#'
      },
      {
        name: 'API Documentation',
        type: 'PDF',
        size: '1.2 MB',
        url: '#'
      }
    ],
    screenshots: [
      'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Dashboard+View',
      'https://via.placeholder.com/800x600/059669/FFFFFF?text=Patient+Profile',
      'https://via.placeholder.com/800x600/DC2626/FFFFFF?text=AI+Analysis',
      'https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=Reports+View'
    ],
    progress: 95,
    judges: [
      {
        name: 'Dr. Sarah Johnson',
        status: 'Evaluated',
        score: 92,
        feedback: 'Excellent technical implementation with innovative AI approach. The user interface is intuitive and the integration with hospital systems shows great potential.',
        evaluatedAt: 'Dec 20, 2024'
      },
      {
        name: 'Prof. Michael Chen',
        status: 'Evaluated',
        score: 88,
        feedback: 'Strong technical foundation and good use of machine learning. The project addresses a real healthcare need effectively.',
        evaluatedAt: 'Dec 20, 2024'
      },
      {
        name: 'Marcus Rodriguez',
        status: 'Pending',
        score: null,
        feedback: null,
        evaluatedAt: null
      }
    ],
    averageScore: 90,
    totalScore: 270,
    maxScore: 300
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubmission(submissionData);
      setLoading(false);
    }, 1000);
  }, [teamId, hackathonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Submission Not Found</h2>
          <button
            onClick={() => navigate('/organizer/participants')}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back to Teams
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate('/organizer/participants')}
              className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
            >
              ←
            </button>
            <h1 className="text-4xl font-bold text-text">{submission.teamName} Submission</h1>
          </div>
          <p className="text-muted">{submission.projectName} - {submission.hackathon}</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            submission.status === 'Submitted' 
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
          }`}>
            {submission.status}
          </span>
          <span className="text-muted">Submitted: {submission.submittedAt}</span>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-text mb-6">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {submission.members.map((member, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-bg-elev rounded-lg">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-text">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
                <p className="text-xs text-muted">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Description */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Project Description</h2>
            <p className="text-muted leading-relaxed">{submission.description}</p>
          </div>

          {/* Technologies Used */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {submission.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Key Features</h2>
            <ul className="space-y-2">
              {submission.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-muted">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshots */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submission.screenshots.map((screenshot, index) => (
                <div key={index} className="relative group">
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold">
                      View Full Size
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Project Links</h2>
            <div className="space-y-3">
              <a
                href={submission.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors"
              >
                <span className="text-2xl">🐙</span>
                <div>
                  <div className="font-semibold text-text">GitHub Repository</div>
                  <div className="text-sm text-muted">{submission.githubLink}</div>
                </div>
              </a>
              <a
                href={submission.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors"
              >
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="font-semibold text-text">Live Demo</div>
                  <div className="text-sm text-muted">{submission.demoLink}</div>
                </div>
              </a>
              <a
                href={submission.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg hover:bg-bg-elev/80 transition-colors"
              >
                <span className="text-2xl">🎥</span>
                <div>
                  <div className="font-semibold text-text">Demo Video</div>
                  <div className="text-sm text-muted">{submission.videoLink}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-4">Documents</h2>
            <div className="space-y-3">
              {submission.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-bg-elev rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <div className="font-semibold text-text">{doc.name}</div>
                      <div className="text-sm text-muted">{doc.type} • {doc.size}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Project Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Completion</span>
                  <span className="text-sm font-semibold text-text">{submission.progress}%</span>
                </div>
                <div className="w-full bg-bg-elev rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-2 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${submission.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Status */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Evaluation Status</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-3xl font-bold text-text mb-1">{submission.averageScore}/100</div>
                <div className="text-sm text-muted">Average Score</div>
              </div>
              <div className="text-center p-4 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text mb-1">{submission.totalScore}/{submission.maxScore}</div>
                <div className="text-sm text-muted">Total Points</div>
              </div>
            </div>
          </div>

          {/* Judge Evaluations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Judge Evaluations</h3>
            <div className="space-y-4">
              {submission.judges.map((judge, index) => (
                <div key={index} className="p-3 bg-bg-elev rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-text">{judge.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      judge.status === 'Evaluated'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {judge.status}
                    </span>
                  </div>
                  {judge.score && (
                    <div className="text-sm text-muted mb-2">Score: {judge.score}/100</div>
                  )}
                  {judge.feedback && (
                    <p className="text-sm text-muted">{judge.feedback}</p>
                  )}
                  {judge.evaluatedAt && (
                    <div className="text-xs text-muted mt-2">Evaluated: {judge.evaluatedAt}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-text mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors">
                Download All Files
              </button>
              <button className="w-full px-4 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors">
                Message Team
              </button>
              <button className="w-full px-4 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
