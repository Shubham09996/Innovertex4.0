import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function MentorChatPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [message, setMessage] = useState('');
  const [teams, setTeams] = useState([]);
  const [messages, setMessages] = useState([]);

  // Mock data for teams
  const mockTeams = [
    {
      id: 1,
      name: 'TechTitans',
      project: 'AI-Powered Healthcare App',
      lastMessage: 'Need help with API integration',
      timestamp: '2 hours ago',
      unread: 3,
      avatar: 'TT'
    },
    {
      id: 2,
      name: 'DataDrivers',
      project: 'Smart Analytics Dashboard',
      lastMessage: 'Database optimization suggestions?',
      timestamp: '4 hours ago',
      unread: 1,
      avatar: 'DD'
    },
    {
      id: 3,
      name: 'CodeCrafters',
      project: 'Blockchain Voting System',
      lastMessage: 'Thank you for the guidance!',
      timestamp: '1 day ago',
      unread: 0,
      avatar: 'CC'
    }
  ];

  // Mock data for messages
  const mockMessages = {
    1: [
      {
        id: 1,
        sender: 'Sarah Chen',
        message: 'Hi! We need help with integrating the AI model with our React Native app.',
        timestamp: '2 hours ago',
        isMentor: false
      },
      {
        id: 2,
        sender: 'You',
        message: 'Sure! I can help you with that. What specific issues are you facing?',
        timestamp: '2 hours ago',
        isMentor: true
      },
      {
        id: 3,
        sender: 'Mike Johnson',
        message: 'We\'re having trouble with the API endpoints and data formatting.',
        timestamp: '1 hour ago',
        isMentor: false
      },
      {
        id: 4,
        sender: 'You',
        message: 'Let me share some best practices for API integration with React Native...',
        timestamp: '1 hour ago',
        isMentor: true
      }
    ],
    2: [
      {
        id: 1,
        sender: 'John Smith',
        message: 'Do you have any suggestions for optimizing our database queries?',
        timestamp: '4 hours ago',
        isMentor: false
      },
      {
        id: 2,
        sender: 'You',
        message: 'I\'d recommend implementing indexing and query optimization. Let me show you some examples.',
        timestamp: '3 hours ago',
        isMentor: true
      }
    ],
    3: [
      {
        id: 1,
        sender: 'Anna Brown',
        message: 'Thank you so much for all your guidance throughout the project!',
        timestamp: '1 day ago',
        isMentor: false
      },
      {
        id: 2,
        sender: 'You',
        message: 'You\'re welcome! You all did an amazing job. Best of luck with the presentation!',
        timestamp: '1 day ago',
        isMentor: true
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTeams(mockTeams);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      setMessages(mockMessages[selectedTeam.id] || []);
    }
  }, [selectedTeam]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedTeam) return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      message: message.trim(),
      timestamp: 'Just now',
      isMentor: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Update team's last message
    setTeams(prev => prev.map(team => 
      team.id === selectedTeam.id 
        ? { ...team, lastMessage: message.trim(), timestamp: 'Just now' }
        : team
    ));
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    // Mark messages as read
    setTeams(prev => prev.map(t => 
      t.id === team.id ? { ...t, unread: 0 } : t
    ));
  };

  if (loading) {
    return (
      <main className="flex-grow container mx-auto p-4 pt-24">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Team Chat</h1>
          <p className="text-muted">Communicate with your assigned teams</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
            📊 Chat Analytics
          </button>
          <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
            📋 Export Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
        {/* Teams List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-4 h-full">
            <h3 className="text-lg font-semibold text-text mb-4">Teams</h3>
            <div className="space-y-3">
              {teams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => handleTeamSelect(team)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTeam?.id === team.id
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-bg-elev border border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{team.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-text text-sm truncate">{team.name}</h4>
                        {team.unread > 0 && (
                          <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                            {team.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted truncate">{team.project}</p>
                      <p className="text-xs text-muted">{team.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl h-full flex flex-col max-h-[calc(100vh-350px)]">
            {selectedTeam ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{selectedTeam.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">{selectedTeam.name}</h3>
                      <p className="text-sm text-muted">{selectedTeam.project}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-500px)]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMentor ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.isMentor
                            ? 'bg-primary text-white'
                            : 'bg-bg-elev text-text border border-border'
                        }`}
                      >
                        <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.isMentor ? 'text-white/70' : 'text-muted'
                        }`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-3 bg-bg-elev border border-border rounded-lg text-text placeholder-muted focus:border-primary focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bg-elev rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">Select a Team</h3>
                  <p className="text-muted">Choose a team from the sidebar to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
