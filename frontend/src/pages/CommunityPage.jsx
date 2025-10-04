import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const CommunityPage = ({ theme, onToggleTheme, isLoggedIn }) => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [activeSection, setActiveSection] = useState('announcements');
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Initialize chat messages when hackathon is selected
  React.useEffect(() => {
    if (selectedHackathon) {
      setChatMessages(selectedHackathon.chatMessages);
    }
  }, [selectedHackathon]);

  // Send message function
  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      alert('Please write a message first');
      return;
    }

    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'participant'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  // Mock data for joined hackathons
  const joinedHackathons = [
    {
      id: 'fintech-revolution',
      name: 'Fintech Revolution 2024',
      teamName: 'Innovators Guild',
      status: 'Active',
      startDate: 'Dec 15, 2024',
      endDate: 'Dec 20, 2024',
      participants: 150,
      announcements: [
        {
          id: 1,
          title: 'Welcome to Fintech Revolution 2024!',
          content: 'We are excited to have you all here. The hackathon has officially begun. Good luck to all participants!',
          author: 'Organizer Team',
          timestamp: '2 hours ago',
          priority: 'high'
        },
        {
          id: 2,
          title: 'Submission Guidelines Updated',
          content: 'Please note that the submission deadline has been extended by 2 hours. Make sure to submit your projects before the new deadline.',
          author: 'Admin',
          timestamp: '1 day ago',
          priority: 'medium'
        },
        {
          id: 3,
          title: 'Mentor Office Hours',
          content: 'Our mentors will be available for office hours from 2 PM to 6 PM today. Join the mentor channel for assistance.',
          author: 'Mentor Team',
          timestamp: '2 days ago',
          priority: 'low'
        }
      ],
      chatMessages: [
        {
          id: 1,
          user: 'Alex Chen',
          message: 'Hey everyone! Excited to be here. Looking forward to collaborating!',
          timestamp: '2:30 PM',
          type: 'participant'
        },
        {
          id: 2,
          user: 'Organizer Team',
          message: 'Welcome Alex! We are here to help if you need any assistance.',
          timestamp: '2:32 PM',
          type: 'organizer'
        },
        {
          id: 3,
          user: 'Sarah Kim',
          message: 'Does anyone know if we can use external APIs?',
          timestamp: '3:15 PM',
          type: 'participant'
        },
        {
          id: 4,
          user: 'Mentor Team',
          message: 'Yes, you can use external APIs as long as they are publicly available and free to use.',
          timestamp: '3:18 PM',
          type: 'mentor'
        },
        {
          id: 5,
          user: 'Mike Johnson',
          message: 'Great! I was planning to use the OpenAI API for our project.',
          timestamp: '3:20 PM',
          type: 'participant'
        },
        {
          id: 6,
          user: 'Organizer Team',
          message: 'That sounds perfect! Just make sure to follow the API usage guidelines.',
          timestamp: '3:22 PM',
          type: 'organizer'
        }
      ],
      faqs: [
        {
          id: 1,
          question: 'What is the submission deadline?',
          answer: 'The submission deadline is December 20, 2024 at 11:59 PM EST. Late submissions will not be accepted.'
        },
        {
          id: 2,
          question: 'Can I work in a team?',
          answer: 'Yes, you can work in teams of up to 4 members. Make sure to register your team before the deadline.'
        },
        {
          id: 3,
          question: 'What technologies can I use?',
          answer: 'You can use any programming language, framework, or technology stack. The choice is completely yours.'
        },
        {
          id: 4,
          question: 'How will the judging work?',
          answer: 'Projects will be judged based on innovation, technical implementation, user experience, and potential impact.'
        }
      ]
    },
    {
      id: 'healthtech-challenge',
      name: 'HealthTech Challenge',
      teamName: 'MediMinds',
      status: 'Active',
      startDate: 'Dec 10, 2024',
      endDate: 'Dec 18, 2024',
      participants: 200,
      announcements: [
        {
          id: 1,
          title: 'HealthTech Challenge Kickoff',
          content: 'Welcome to the HealthTech Challenge! We are excited to see innovative solutions in healthcare technology.',
          author: 'Organizer Team',
          timestamp: '3 days ago',
          priority: 'high'
        }
      ],
      chatMessages: [
        {
          id: 1,
          user: 'Jane Smith',
          message: 'Hello everyone! Ready to build something amazing for healthcare!',
          timestamp: '3 days ago',
          type: 'participant'
        }
      ],
      faqs: [
        {
          id: 1,
          question: 'What healthcare domains are we focusing on?',
          answer: 'We are looking for solutions in telemedicine, patient management, medical diagnostics, and health monitoring.'
        }
      ]
    }
  ];

  const handleHackathonSelect = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-500/10';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-l-green-500 bg-green-500/10';
      default: return 'border-l-gray-500 bg-gray-500/10';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'organizer': return 'bg-primary/20 border-primary/30';
      case 'mentor': return 'bg-blue-500/20 border-blue-500/30';
      case 'participant': return 'bg-gray-500/20 border-gray-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  if (!selectedHackathon) {
    return (
      <div className="min-h-screen flex flex-col bg-bg pt-[80px]">
        <NavBar theme={theme} onToggleTheme={onToggleTheme} isLoggedIn={isLoggedIn} />
        <div className="flex-grow">
          {/* Hero Section */}
          <div className="relative py-20 text-center bg-gradient-to-br from-bg to-bg-elev overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-2 rounded-full flex items-center justify-center text-3xl mb-6">
                👥
              </div>
              <h1 className="text-6xl font-extrabold text-text mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-2">
                Community
              </h1>
              <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
                Connect with fellow participants and organizers in your hackathon communities
              </p>
            </div>
          </div>

          {/* Joined Hackathons */}
          <div className="py-16 bg-gradient-to-br from-bg-elev to-bg">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-text mb-4">Your Hackathons</h2>
                <p className="text-lg text-muted max-w-2xl mx-auto">
                  Select a hackathon to access its community features
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {joinedHackathons.map((hackathon) => (
                  <div
                    key={hackathon.id}
                    onClick={() => handleHackathonSelect(hackathon)}
                    className="bg-card border border-border rounded-2xl p-6 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        hackathon.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {hackathon.status}
                      </span>
                      <span className="text-muted text-sm">{hackathon.participants} participants</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text mb-2">{hackathon.name}</h3>
                    <p className="text-muted mb-4">Team: <span className="text-primary font-semibold">{hackathon.teamName}</span></p>
                    
                    <div className="space-y-2 text-sm text-muted">
                      <p>📅 {hackathon.startDate} - {hackathon.endDate}</p>
                      <p>📢 {hackathon.announcements.length} announcements</p>
                      <p>💬 {hackathon.chatMessages.length} messages</p>
                    </div>
                    
                    <div className="mt-6">
                      <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors duration-200">
                        Open Community
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg pt-[80px]">
      <NavBar theme={theme} onToggleTheme={onToggleTheme} isLoggedIn={isLoggedIn} />
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary-2/10 py-8">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text mb-2">{selectedHackathon.name}</h1>
                <p className="text-muted">Team: {selectedHackathon.teamName}</p>
              </div>
              <button
                onClick={() => setSelectedHackathon(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                ← Back to Hackathons
              </button>
            </div>
          </div>
        </div>

        {/* Community Content */}
        <div className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar with Section Tabs */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-8">
                  <h3 className="text-xl font-bold text-text mb-6">Community Sections</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveSection('announcements')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        activeSection === 'announcements'
                          ? 'bg-primary text-white'
                          : 'bg-bg-elev text-text hover:bg-bg-elev/80'
                      }`}
                    >
                      <span className="text-lg">📢</span>
                      <span className="font-semibold">Announcements</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveSection('chat')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        activeSection === 'chat'
                          ? 'bg-primary text-white'
                          : 'bg-bg-elev text-text hover:bg-bg-elev/80'
                      }`}
                    >
                      <span className="text-lg">💬</span>
                      <span className="font-semibold">Hackathon Chat</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveSection('faq')}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        activeSection === 'faq'
                          ? 'bg-primary text-white'
                          : 'bg-bg-elev text-text hover:bg-bg-elev/80'
                      }`}
                    >
                      <span className="text-lg">❓</span>
                      <span className="font-semibold">FAQ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-2xl p-6">
                  {/* Announcements Section */}
                  {activeSection === 'announcements' && (
                    <div>
                      <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-primary to-primary-2 rounded-full flex items-center justify-center text-white">📢</span>
                        Announcements
                      </h2>
                      
                      <div className="space-y-4">
                        {selectedHackathon.announcements.map((announcement) => (
                          <div
                            key={announcement.id}
                            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(announcement.priority)}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-text">{announcement.title}</h3>
                              <span className="text-muted text-sm">{announcement.timestamp}</span>
                            </div>
                            <p className="text-muted mb-2">{announcement.content}</p>
                            <p className="text-sm text-primary">By: {announcement.author}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat Section */}
                  {activeSection === 'chat' && (
                    <div>
                      <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">💬</span>
                        Hackathon Chat
                      </h2>
                      
                      {/* WhatsApp-style Chat Container */}
                      <div className="bg-bg-elev rounded-2xl p-4 max-h-96 overflow-y-auto mb-4 border border-border">
                        <div className="space-y-3">
                          {chatMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.type === 'participant' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                message.type === 'participant'
                                  ? 'bg-primary text-white rounded-br-sm'
                                  : message.type === 'organizer'
                                  ? 'bg-card text-text rounded-bl-sm border border-border'
                                  : 'bg-blue-500 text-white rounded-bl-sm'
                              }`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-xs opacity-80">{message.user}</span>
                                  <span className="text-xs opacity-70">{message.timestamp}</span>
                                </div>
                                <p className="text-sm">{message.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Message Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-border rounded-full bg-bg text-text placeholder-muted focus:outline-none focus:border-primary"
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-2 transition-colors duration-200 flex items-center gap-2"
                        >
                          <span>Send</span>
                          <span>📤</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FAQ Section */}
                  {activeSection === 'faq' && (
                    <div>
                      <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white">❓</span>
                        Frequently Asked Questions
                      </h2>
                      
                      <div className="space-y-6">
                        {selectedHackathon.faqs.map((faq) => (
                          <div key={faq.id} className="border border-border rounded-lg p-4">
                            <h4 className="font-semibold text-text mb-3 text-lg">{faq.question}</h4>
                            <p className="text-muted">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
