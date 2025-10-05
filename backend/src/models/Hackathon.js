import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1678903458/default-hackathon.png', // Default image
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Active', 'Completed', 'Archived'],
    default: 'Upcoming',
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    default: 'Online',
  },
  maxTeamSize: {
    type: Number,
    default: 4,
  },
  eligibility: {
    type: String,
    trim: true,
    default: 'Open to all',
  },
  registrationDeadline: {
    type: Date,
  },
  prizePool: {
    type: Number,
    default: 0,
  },
  technologyStack: [
    {
      type: String,
    },
  ],
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  mentors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  judges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
    },
  ],
  announcements: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Hackathon', hackathonSchema);
