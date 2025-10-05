import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Participant', 'Organizer', 'Mentor', 'Judge'],
    default: 'Participant',
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  certificates: [
    {
      name: { type: String, trim: true },
      authority: { type: String, trim: true },
      date: { type: String, trim: true }, // Store as string for flexibility (e.g., "Jan 2022")
    },
  ],
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  avatar: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=User', // Default avatar
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hackathonsParticipating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
    },
  ],
  assignedHackathons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hackathon',
    },
  ],
  assignedTeams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  evaluationsCompleted: {
    type: Number,
    default: 0,
  },
  sessionsCompleted: {
    type: Number,
    default: 0,
  },
  organizerRank: {
    type: String,
    default: 'N/A',
  },
  eventXP: {
    type: Number,
    default: 0,
  },
  eventSuccessRate: {
    type: Number,
    default: 0,
  },
  participantSatisfaction: {
    type: Number,
    default: 0,
  },
  communityGrowth: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('User', userSchema);
