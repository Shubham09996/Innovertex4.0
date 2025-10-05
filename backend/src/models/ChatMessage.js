import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true,
  },
  messageType: {
    type: String,
    enum: ['team', 'mentor'], // 'team' for team chat, 'mentor' for mentor chat
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  senderName: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ChatMessage', chatMessageSchema);
