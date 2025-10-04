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
