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
});

export default mongoose.model('User', userSchema);
