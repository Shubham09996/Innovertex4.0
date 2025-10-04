import { io } from '../app.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'; // Import mongoose
import ChatMessage from '../models/ChatMessage.js';
import User from '../models/User.js';

const initSocket = () => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Authenticate user for Socket.IO
    socket.on('authenticate', async (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.user.id;
        socket.userRole = decoded.user.role;
        console.log(`Socket ${socket.id} authenticated as user ${socket.userId} (${socket.userRole})`);
      } catch (err) {
        console.error('Socket authentication error:', err.message);
        socket.disconnect();
      }
    });

    socket.on('joinTeamChat', async ({ teamId, hackathonId }) => {
      if (!socket.userId || !socket.userRole) {
        socket.emit('chatError', 'Authentication required to join chat.');
        return;
      }
      // Check if user is part of the team
      // For simplicity, we'll assume the user is authorized to join if authenticated.
      // In a real app, you'd verify if the user is a member of teamId for hackathonId.

      const roomName = `team-${teamId}`;
      socket.join(roomName);
      console.log(`User ${socket.userId} joined team chat room: ${roomName}`);

      // Emit previous messages
      try {
        const messages = await ChatMessage.find({ team: teamId, hackathon: hackathonId, messageType: 'team' })
          .populate('sender', 'username avatar')
          .sort({ timestamp: 1 });
        socket.emit('previousMessages', messages);
      } catch (err) {
        console.error('Error fetching previous team messages:', err);
        socket.emit('chatError', 'Error fetching previous messages.');
      }
    });

    socket.on('joinMentorChat', async ({ hackathonId, mentorId }) => {
      if (!socket.userId || !socket.userRole) {
        socket.emit('chatError', 'Authentication required to join chat.');
        return;
      }
      // In a real app, verify if the user is assigned to this mentor for this hackathon.
      const roomName = `mentor-${hackathonId}-${mentorId}`;
      socket.join(roomName);
      console.log(`User ${socket.userId} joined mentor chat room: ${roomName}`);

      // Emit previous messages
      try {
        // For mentor chat, we might query based on hackathon, sender, and recipient
        const messages = await ChatMessage.find({
          hackathon: hackathonId,
          messageType: 'mentor',
          $or: [
            { sender: socket.userId, recipient: mentorId },
            { sender: mentorId, recipient: socket.userId },
          ],
        })
          .populate('sender', 'username avatar')
          .populate('recipient', 'username avatar')
          .sort({ timestamp: 1 });
        socket.emit('previousMessages', messages);
      } catch (err) {
        console.error('Error fetching previous mentor messages:', err);
        socket.emit('chatError', 'Error fetching previous messages.');
      }
    });

    socket.on('sendTeamMessage', async ({ teamId, hackathonId, content }) => {
      if (!socket.userId) {
        socket.emit('chatError', 'Authentication required to send message.');
        return;
      }

      try {
        const newMessage = new ChatMessage({
          sender: socket.userId,
          team: teamId,
          hackathon: hackathonId,
          messageType: 'team',
          content,
        });
        await newMessage.save();

        const populatedMessage = await ChatMessage.findById(newMessage._id)
          .populate('sender', 'username avatar');

        io.to(`team-${teamId}`).emit('receiveMessage', populatedMessage);
      } catch (err) {
        console.error('Error saving or emitting team message:', err);
        socket.emit('chatError', 'Failed to send message.');
      }
    });

    socket.on('sendMentorMessage', async ({ hackathonId, mentorId, content }) => {
      if (!socket.userId) {
        socket.emit('chatError', 'Authentication required to send message.');
        return;
      }

      try {
        const newMessage = new ChatMessage({
          sender: socket.userId,
          recipient: mentorId, // Assuming mentorId is the recipient
          hackathon: hackathonId,
          messageType: 'mentor',
          content,
        });
        await newMessage.save();

        const populatedMessage = await ChatMessage.findById(newMessage._id)
          .populate('sender', 'username avatar')
          .populate('recipient', 'username avatar');

        // Emit to both sender and recipient's rooms
        io.to(`mentor-${hackathonId}-${mentorId}`).emit('receiveMessage', populatedMessage);
        if (socket.userId !== mentorId) { // If mentor is also a user, they might be in their own room
          io.to(`mentor-${hackathonId}-${socket.userId}`).emit('receiveMessage', populatedMessage); // Assuming mentor also joins a room for themselves
        }

      } catch (err) {
        console.error('Error saving or emitting mentor message:', err);
        socket.emit('chatError', 'Failed to send message.');
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default initSocket;
