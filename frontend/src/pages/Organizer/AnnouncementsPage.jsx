import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnnouncementsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('announcements');
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  // Mock data for announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Hackathon Registration Extended',
      content: 'Due to popular demand, we are extending the registration deadline by 2 days. The new deadline is December 22nd, 2024 at 11:59 PM.',
      type: 'general',
      priority: 'high',
      createdAt: 'Dec 20, 2024',
      createdBy: 'Admin Team',
      isActive: true,
      hackathonId: 1,
      hackathonName: 'AI Innovation Challenge 2024'
    },
    {
      id: 2,
      title: 'Submission Guidelines Updated',
      content: 'Please review the updated submission guidelines. All teams must include a 2-minute demo video and a detailed README file in their submission.',
      type: 'submission',
      priority: 'medium',
      createdAt: 'Dec 19, 2024',
      createdBy: 'Judging Panel',
      isActive: true,
      hackathonId: 1,
      hackathonName: 'AI Innovation Challenge 2024'
    },
    {
      id: 3,
      title: 'Mentor Office Hours Available',
      content: 'Our industry mentors are available for office hours every day from 2-4 PM. Book your slot through the platform to get personalized guidance.',
      type: 'mentorship',
      priority: 'low',
      createdAt: 'Dec 18, 2024',
      createdBy: 'Mentor Team',
      isActive: true,
      hackathonId: 1,
      hackathonName: 'AI Innovation Challenge 2024'
    },
    {
      id: 4,
      title: 'Technical Support Available 24/7',
      content: 'Our technical support team is available round the clock to help with any platform issues. Contact us through the support chat.',
      type: 'support',
      priority: 'medium',
      createdAt: 'Dec 17, 2024',
      createdBy: 'Tech Support',
      isActive: true,
      hackathonId: null,
      hackathonName: 'All Hackathons'
    }
  ]);

  // Mock data for FAQs
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How do I submit my project?',
      answer: 'You can submit your project by going to the submission workspace and uploading your files. Make sure to include all required documents and a demo video.',
      category: 'submission',
      isActive: true
    },
    {
      id: 2,
      question: 'What is the team size limit?',
      answer: 'The maximum team size is 4 members. You can have fewer members, but the maximum is 4.',
      category: 'team',
      isActive: true
    },
    {
      id: 3,
      question: 'How are projects evaluated?',
      answer: 'Projects are evaluated based on innovation, technical implementation, user experience, and presentation. Each criterion carries equal weight.',
      category: 'evaluation',
      isActive: true
    },
    {
      id: 4,
      question: 'Can I change my team members?',
      answer: 'Yes, you can change team members until the registration deadline. After that, no changes are allowed.',
      category: 'team',
      isActive: true
    },
    {
      id: 5,
      question: 'What technologies can I use?',
      answer: 'You can use any technology stack you prefer. We recommend using modern frameworks and tools that showcase your technical skills.',
      category: 'technical',
      isActive: true
    }
  ]);

  // Mock data for chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      message: 'Hi everyone! Excited to be part of this hackathon.',
      timestamp: '2 minutes ago',
      senderType: 'participant',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 2,
      sender: 'Admin Team',
      message: 'Welcome Sarah! We\'re glad to have you here. Don\'t forget to check the latest announcements.',
      timestamp: '1 minute ago',
      senderType: 'admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      message: 'Quick question - can we use external APIs in our project?',
      timestamp: '30 seconds ago',
      senderType: 'participant',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'general': return '📢';
      case 'submission': return '📝';
      case 'mentorship': return '👥';
      case 'support': return '🛠️';
      default: return '📄';
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: newMessage,
        timestamp: 'Just now',
        senderType: 'organizer',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    // Handle announcement creation
    setShowCreateModal(false);
  };

  const handleCreateFAQ = (e) => {
    e.preventDefault();
    // Handle FAQ creation
    setShowFAQModal(false);
  };

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Communication Hub</h1>
          <p className="text-muted">Manage announcements, FAQs, and community chat</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary-2 text-white rounded-lg font-semibold hover:from-primary-2 hover:to-primary transition-all duration-200 shadow-lg hover:shadow-primary/25"
          >
            📢 Create Announcement
          </button>
          <button
            onClick={() => setShowFAQModal(true)}
            className="px-6 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors"
          >
            ❓ Add FAQ
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-bg-elev p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-6 py-3 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'announcements'
              ? 'bg-primary text-white shadow-lg'
              : 'text-muted hover:text-text'
          }`}
        >
          📢 Announcements
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'faq'
              ? 'bg-primary text-white shadow-lg'
              : 'text-muted hover:text-text'
          }`}
        >
          ❓ FAQ
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-6 py-3 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'chat'
              ? 'bg-primary text-white shadow-lg'
              : 'text-muted hover:text-text'
          }`}
        >
          💬 Community Chat
        </button>
      </div>

      {/* Content */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{getTypeIcon(announcement.type)}</div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-text">{announcement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      announcement.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {announcement.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <p className="text-muted mb-4">{announcement.content}</p>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <div className="flex items-center gap-4">
                      <span>By: {announcement.createdBy}</span>
                      <span>•</span>
                      <span>{announcement.createdAt}</span>
                      <span>•</span>
                      <span>{announcement.hackathonName}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <button className="p-4 bg-card border border-border rounded-lg text-left hover:border-primary-300 transition-colors">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-semibold text-text">Submission</div>
              <div className="text-sm text-muted">2 FAQs</div>
            </button>
            <button className="p-4 bg-card border border-border rounded-lg text-left hover:border-primary-300 transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-semibold text-text">Team</div>
              <div className="text-sm text-muted">2 FAQs</div>
            </button>
            <button className="p-4 bg-card border border-border rounded-lg text-left hover:border-primary-300 transition-colors">
              <div className="text-2xl mb-2">⚖️</div>
              <div className="font-semibold text-text">Evaluation</div>
              <div className="text-sm text-muted">1 FAQ</div>
            </button>
          </div>

          {faqs.map((faq) => (
            <div key={faq.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-text mb-2">{faq.question}</h3>
                  <p className="text-muted">{faq.answer}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {faq.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      faq.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {faq.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-bg-elev">
            <h3 className="text-lg font-semibold text-text">Community Chat</h3>
            <p className="text-sm text-muted">Real-time communication with participants</p>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.senderType === 'organizer' ? 'justify-end' : ''}`}>
                {message.senderType !== 'organizer' && (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div className={`max-w-xs lg:max-w-md ${message.senderType === 'organizer' ? 'order-first' : ''}`}>
                  <div className={`p-3 rounded-lg ${
                    message.senderType === 'organizer'
                      ? 'bg-primary text-white'
                      : message.senderType === 'admin'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-bg-elev text-text'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted">{message.sender}</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs text-muted">{message.timestamp}</span>
                  </div>
                </div>
                {message.senderType === 'organizer' && (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-bg-elev border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary-300"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-bold text-text mb-4">Create Announcement</h2>
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Content</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300"
                  placeholder="Enter announcement content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">Type</label>
                  <select className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300">
                    <option value="general">General</option>
                    <option value="submission">Submission</option>
                    <option value="mentorship">Mentorship</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">Priority</label>
                  <select className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-transparent border border-border text-text rounded-lg hover:border-primary-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
                >
                  Create Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create FAQ Modal */}
      {showFAQModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-bold text-text mb-4">Add FAQ</h2>
            <form onSubmit={handleCreateFAQ} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Question</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300"
                  placeholder="Enter FAQ question"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Answer</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300"
                  placeholder="Enter FAQ answer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Category</label>
                <select className="w-full px-4 py-2 bg-bg-elev border border-border rounded-lg text-text focus:outline-none focus:border-primary-300">
                  <option value="submission">Submission</option>
                  <option value="team">Team</option>
                  <option value="evaluation">Evaluation</option>
                  <option value="technical">Technical</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowFAQModal(false)}
                  className="px-4 py-2 bg-transparent border border-border text-text rounded-lg hover:border-primary-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
                >
                  Add FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
