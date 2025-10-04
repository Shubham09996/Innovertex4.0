import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InviteMentorModal({ isOpen, onClose, onInvite }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHackathon, setSelectedHackathon] = useState('');
  const [inviteMethod, setInviteMethod] = useState('email'); // email or platform
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data for suggested mentors
  const suggestedMentors = [
    {
      id: 1,
      name: 'Dr. Lisa Rodriguez',
      email: 'lisa.rodriguez@techcorp.com',
      title: 'Senior Software Engineer',
      institution: 'Microsoft',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
      skills: ['Full Stack', 'Cloud Computing', 'Leadership'],
      experience: '12+ years',
      rating: 4.8,
      hackathonsMentored: 20,
      isAvailable: true
    },
    {
      id: 2,
      name: 'James Wilson',
      email: 'james.wilson@startup.io',
      title: 'CTO & Co-founder',
      institution: 'TechStartup Inc.',
      avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
      skills: ['Product Management', 'Startup Strategy', 'Mentoring'],
      experience: '10+ years',
      rating: 4.7,
      hackathonsMentored: 15,
      isAvailable: true
    },
    {
      id: 3,
      name: 'Dr. Maria Garcia',
      email: 'maria.garcia@research.org',
      title: 'Research Director',
      institution: 'MIT',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      skills: ['AI Research', 'Blockchain', 'Innovation'],
      experience: '18+ years',
      rating: 4.9,
      hackathonsMentored: 28,
      isAvailable: false
    },
    {
      id: 4,
      name: 'Alex Thompson',
      email: 'alex.thompson@google.com',
      title: 'Senior Developer Advocate',
      institution: 'Google',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      skills: ['Developer Relations', 'Open Source', 'Community'],
      experience: '8+ years',
      rating: 4.6,
      hackathonsMentored: 12,
      isAvailable: true
    },
    {
      id: 5,
      name: 'Sarah Chen',
      email: 'sarah.chen@designstudio.com',
      title: 'UX Design Lead',
      institution: 'Design Studio',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      skills: ['UX/UI Design', 'User Research', 'Design Systems'],
      experience: '9+ years',
      rating: 4.8,
      hackathonsMentored: 18,
      isAvailable: true
    }
  ];

  const hackathons = [
    { id: 1, name: 'AI Innovation Challenge 2024' },
    { id: 2, name: 'Web3 Development Hackathon' },
    { id: 3, name: 'HealthTech Innovation' },
    { id: 4, name: 'FinTech Revolution' }
  ];

  const filteredMentors = suggestedMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         mentor.institution.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleInviteMentor = async (mentor) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onInvite) {
        onInvite({
          mentor,
          hackathon: hackathons.find(h => h.id === selectedHackathon),
          method: inviteMethod,
          message
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error inviting mentor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailInvite = async (e) => {
    e.preventDefault();
    if (!email || !selectedHackathon) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onInvite) {
        onInvite({
          email,
          hackathon: hackathons.find(h => h.id === selectedHackathon),
          method: 'email',
          message
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error sending email invite:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text">Invite Mentor</h2>
              <p className="text-muted mt-1">Invite experienced mentors to guide hackathon participants</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Invite Method Tabs */}
          <div className="flex gap-1 mb-6 bg-bg-elev p-1 rounded-lg w-fit">
            <button
              onClick={() => setInviteMethod('platform')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                inviteMethod === 'platform'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted hover:text-text'
              }`}
            >
              👥 Platform Mentors
            </button>
            <button
              onClick={() => setInviteMethod('email')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                inviteMethod === 'email'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted hover:text-text'
              }`}
            >
              📧 Email Invite
            </button>
          </div>

          {/* Hackathon Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text mb-2">Select Hackathon</label>
            <select
              value={selectedHackathon}
              onChange={(e) => setSelectedHackathon(e.target.value)}
              className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
            >
              <option value="">Choose a hackathon...</option>
              {hackathons.map(hackathon => (
                <option key={hackathon.id} value={hackathon.id}>{hackathon.name}</option>
              ))}
            </select>
          </div>

          {inviteMethod === 'platform' ? (
            <>
              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search mentors by name, skills, or institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
                />
              </div>

              {/* Suggested Mentors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text">Suggested Mentors</h3>
                {filteredMentors.map((mentor) => (
                  <div key={mentor.id} className="bg-bg-elev border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-text">{mentor.name}</h4>
                            <p className="text-sm text-muted">{mentor.title}</p>
                            <p className="text-sm text-primary font-medium">{mentor.institution}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-sm font-semibold text-text">{mentor.rating}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              mentor.isAvailable 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {mentor.isAvailable ? 'Available' : 'Busy'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm text-muted">
                          <span>Experience: {mentor.experience}</span>
                          <span>•</span>
                          <span>Mentored: {mentor.hackathonsMentored} hackathons</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentor.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleInviteMentor(mentor)}
                            disabled={!mentor.isAvailable || !selectedHackathon || loading}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? 'Inviting...' : 'Invite Mentor'}
                          </button>
                          <button 
                            onClick={() => {
                              onClose();
                              navigate(`/organizer/mentors/${mentor.id}/profile`);
                            }}
                            className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Email Invite Form */
            <form onSubmit={handleEmailInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Mentor Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter mentor's email address"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">Invitation Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a personalized invitation message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!email || !selectedHackathon || loading}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Invitation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
