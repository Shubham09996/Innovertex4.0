import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [teamMessages, setTeamMessages] = useState({}); // { teamId: [messages] }
  const [mentorMessages, setMentorMessages] = useState({}); // { hackathonId_mentorId: [messages] }
  const socketRef = useRef(null); // To persist socket instance across renders

  useEffect(() => {
    if (token && user) {
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: { token },
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('Connected to Socket.IO');
        newSocket.emit('authenticate', token); // Explicitly authenticate
      });

      newSocket.on('receiveMessage', (message) => {
        console.log('Received message:', message);
        if (message.messageType === 'team') {
          setTeamMessages((prevMessages) => ({
            ...prevMessages,
            [message.team]: [...(prevMessages[message.team] || []), message],
          }));
        } else if (message.messageType === 'mentor') {
          // Mentor messages are typically between two users for a specific hackathon
          // We need to identify the correct room to add the message to.
          // The room name is `mentor-<hackathonId>-<mentorId>`.
          // When a user (participant or mentor) receives a message, they should see it in their respective chat with the other person.
          // So, if the message is from me to mentor, or from mentor to me, it goes into my chat with that mentor.
          const chatRoomId = message.sender._id === user.id ? 
                             `${message.hackathon}_${message.recipient._id}` : 
                             `${message.hackathon}_${message.sender._id}`;
          setMentorMessages((prevMessages) => ({
            ...prevMessages,
            [chatRoomId]: [...(prevMessages[chatRoomId] || []), message],
          }));
        }
      });

      newSocket.on('chatError', (errorMsg) => {
        console.error('Chat Error:', errorMsg);
        // Handle chat errors (e.g., display to user)
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO');
      });

      setSocket(newSocket);
      socketRef.current = newSocket;

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } else if (!token && socketRef.current) {
      // If token is removed (logout), disconnect socket
      socketRef.current.disconnect();
      setSocket(null);
      socketRef.current = null;
      setTeamMessages({});
      setMentorMessages({});
    }
  }, [token, user]);

  const joinTeamChat = (teamId, hackathonId) => {
    if (socket) {
      socket.emit('joinTeamChat', { teamId, hackathonId });
    }
  };

  const sendTeamMessage = (teamId, hackathonId, content) => {
    if (socket && user) {
      socket.emit('sendTeamMessage', { teamId, hackathonId, content, senderId: user.id });
    }
  };

  const joinMentorChat = (hackathonId, mentorId) => {
    if (socket) {
      socket.emit('joinMentorChat', { hackathonId, mentorId });
    }
  };

  const sendMentorMessage = (hackathonId, mentorId, content) => {
    if (socket && user) {
      socket.emit('sendMentorMessage', { hackathonId, mentorId, content, senderId: user.id });
    }
  };

  // Function to load historical messages (from REST API for robustness)
  const loadHistoricalTeamMessages = async (hackathonId, teamId) => {
    if (token) {
      try {
        const messages = await api.getTeamChatMessages(hackathonId, teamId, token);
        setTeamMessages((prevMessages) => ({
          ...prevMessages,
          [teamId]: messages,
        }));
      } catch (err) {
        console.error('Failed to load historical team messages:', err);
      }
    }
  };

  const loadHistoricalMentorMessages = async (hackathonId, mentorId) => {
    if (token) {
      try {
        const messages = await api.getMentorChatMessages(hackathonId, mentorId, token);
        const chatRoomId = `${hackathonId}_${mentorId}`;
        setMentorMessages((prevMessages) => ({
          ...prevMessages,
          [chatRoomId]: messages,
        }));
      } catch (err) {
        console.error('Failed to load historical mentor messages:', err);
      }
    }
  };

  return (
    <ChatContext.Provider value={{
      socket,
      teamMessages,
      mentorMessages,
      joinTeamChat,
      sendTeamMessage,
      joinMentorChat,
      sendMentorMessage,
      loadHistoricalTeamMessages,
      loadHistoricalMentorMessages,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
