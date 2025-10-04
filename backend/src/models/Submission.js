import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  repoUrl: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Submission', submissionSchema);
