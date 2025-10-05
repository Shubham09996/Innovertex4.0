import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';
import api from '../utils/api'; // Import the API utility

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [teamMessages, setTeamMessages] = useState({}); // Stores messages for different team chats
  const teamChatRefs = useRef({}); // To manage scroll for team chats
  const [mentorMessages, setMentorMessages] = useState({}); // Stores messages for different mentor chats (keyed by hackathonId_mentorId)
  const mentorChatRefs = useRef({}); // To manage scroll for mentor chats
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

  // Function to join a team chat room
  const joinTeamChat = (teamId, hackathonId) => {
    if (socket) {
      socket.emit('joinTeamChat', { teamId, hackathonId });
      // Initialize messages array for this team if not already present
      setTeamMessages(prev => ({
        ...prev,
        [teamId]: prev[teamId] || []
      }));
    }
  };

  // Function to join a mentor chat room
  const joinMentorChat = (hackathonId, mentorId) => {
    if (socket) {
      socket.emit('joinMentorChat', { hackathonId, mentorId, userId: user._id });
      const chatKey = `${hackathonId}_${mentorId}`;
       // Initialize messages array for this mentor chat if not already present
      setMentorMessages(prev => ({
        ...prev,
        [chatKey]: prev[chatKey] || []
      }));
    }
  };

  // Function to send a team message
  const sendTeamMessage = async (teamId, hackathonId, message) => {
    if (socket && user && message.trim()) {
      try {
        const newMessage = await api.sendTeamChatMessage(hackathonId, teamId, message, user.username, token); // Use API to send
        // Socket will emit to others, but we add to our state immediately for responsiveness
        setTeamMessages(prevMessages => ({
          ...prevMessages,
          [teamId]: [...(prevMessages[teamId] || []), newMessage]
        }));
        socket.emit('teamMessage', newMessage); // Emit for real-time update on other clients
      } catch (error) {
        console.error("Error sending team message:", error);
      }
    }
  };

  // Function to send a mentor message
  const sendMentorMessage = async (hackathonId, mentorId, message) => {
    if (socket && user && message.trim()) {
      try {
        const newMessage = await api.sendMentorChatMessage(hackathonId, mentorId, message, user.username, token); // Use API to send
        const chatKey = `${hackathonId}_${mentorId}`;
        setMentorMessages(prevMessages => ({
          ...prevMessages,
          [chatKey]: [...(prevMessages[chatKey] || []), newMessage]
        }));
        socket.emit('mentorMessage', newMessage); // Emit for real-time update on other clients
      } catch (error) {
        console.error("Error sending mentor message:", error);
      }
    }
  };

  // Function to load historical team messages
  const loadHistoricalTeamMessages = async (hackathonId, teamId) => {
    if (token) {
      try {
        const messages = await api.getTeamChatMessages(hackathonId, teamId, token);
        setTeamMessages(prev => ({ ...prev, [teamId]: messages }));
      } catch (error) {
        console.error("Failed to load historical team messages:", error);
      }
    }
  };

  // Function to load historical mentor messages
  const loadHistoricalMentorMessages = async (hackathonId, mentorId) => {
    if (token) {
      const chatKey = `${hackathonId}_${mentorId}`;
      try {
        const messages = await api.getMentorChatMessages(hackathonId, mentorId, token);
        setMentorMessages(prev => ({ ...prev, [chatKey]: messages }));
      } catch (error) {
        console.error("Failed to load historical mentor messages:", error);
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        teamMessages,
        mentorMessages,
        sendTeamMessage,
        sendMentorMessage,
        joinTeamChat,
        joinMentorChat,
        loadHistoricalTeamMessages,
        loadHistoricalMentorMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
