import ChatMessage from '../models/ChatMessage.js';
import mongoose from 'mongoose';

// Get team chat messages for a specific hackathon and team
export const getTeamChatMessages = async (req, res) => {
  try {
    const { hackathonId, teamId } = req.params;

    const messages = await ChatMessage.find({
      hackathon: new mongoose.Types.ObjectId(hackathonId),
      team: new mongoose.Types.ObjectId(teamId),
      messageType: 'team',
    })
      .populate('sender', 'username avatar')
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching team chat messages:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get mentor chat messages for a specific hackathon and user/mentor
export const getMentorChatMessages = async (req, res) => {
  try {
    const { hackathonId, mentorId } = req.params;
    const userId = req.user.id; // Authenticated user

    const messages = await ChatMessage.find({
      hackathon: new mongoose.Types.ObjectId(hackathonId),
      messageType: 'mentor',
      $or: [
        { sender: new mongoose.Types.ObjectId(userId), recipient: new mongoose.Types.ObjectId(mentorId) },
        { sender: new mongoose.Types.ObjectId(mentorId), recipient: new mongoose.Types.ObjectId(userId) },
      ],
    })
      .populate('sender', 'username avatar')
      .populate('recipient', 'username avatar')
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching mentor chat messages:', error);
    res.status(500).json({ message: error.message });
  }
};

// Send a team chat message
export const sendTeamChatMessage = async (req, res) => {
  try {
    const { hackathonId, teamId } = req.params;
    const { message, senderName } = req.body; // senderName now comes from req.body
    const sender = req.user.id;
    // const senderName = req.user.username; // Removed, now from req.body or derived from req.user for validation

    console.log("Backend sendTeamChatMessage - req.user:", req.user); // Debugging
    console.log("Backend sendTeamChatMessage - req.body:", req.body); // Debugging

    if (!mongoose.Types.ObjectId.isValid(hackathonId) || !mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: 'Invalid Hackathon ID or Team ID' });
    }

    // Additional check for senderName if coming from body
    if (!senderName) {
      return res.status(400).json({ message: 'Sender name is required' });
    }

    const newChatMessage = new ChatMessage({
      hackathon: hackathonId,
      team: teamId,
      sender,
      senderName,
      message,
      messageType: 'team',
    });

    await newChatMessage.save();
    // For real-time, emit this message via socket.io
    // io.to(`team-${teamId}`).emit('teamMessage', newChatMessage);
    res.status(201).json(newChatMessage);
  } catch (error) {
    console.error('Error sending team chat message:', error);
    res.status(500).json({ message: error.message });
  }
};

// Send a mentor chat message
export const sendMentorChatMessage = async (req, res) => {
  try {
    const { hackathonId, mentorId } = req.params;
    const { message, senderName } = req.body; // senderName now comes from req.body
    const sender = req.user.id;
    // const senderName = req.user.username; // Removed, now from req.body or derived from req.user for validation
    const recipient = mentorId; // The mentor is the recipient

    console.log("Backend sendMentorChatMessage - req.user:", req.user); // Debugging
    console.log("Backend sendMentorChatMessage - req.body:", req.body); // Debugging

    if (!mongoose.Types.ObjectId.isValid(hackathonId) || !mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: 'Invalid Hackathon ID or Mentor ID' });
    }

    // Additional check for senderName if coming from body
    if (!senderName) {
      return res.status(400).json({ message: 'Sender name is required' });
    }

    const newChatMessage = new ChatMessage({
      hackathon: hackathonId,
      sender,
      senderName,
      recipient,
      message,
      messageType: 'mentor',
    });

    await newChatMessage.save();
    // For real-time, emit this message via socket.io
    // io.to(`mentor-${mentorId}`).emit('mentorMessage', newChatMessage);
    res.status(201).json(newChatMessage);
  } catch (error) {
    console.error('Error sending mentor chat message:', error);
    res.status(500).json({ message: error.message });
  }
};