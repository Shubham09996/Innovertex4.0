import Submission from '../models/Submission.js';
import Team from '../models/Team.js';
import User from '../models/User.js';

// Get leaderboard for a specific hackathon
export const getHackathonLeaderboard = async (req, res) => {
  try {
    const { hackathonId } = req.params;

    const leaderboard = await Submission.aggregate([
      { $match: { hackathon: new mongoose.Types.ObjectId(hackathonId), status: 'evaluated' } },
      { $lookup: { from: 'teams', localField: 'team', foreignField: '_id', as: 'teamInfo' } },
      { $unwind: '$teamInfo' },
      { $project: {
        _id: '$teamInfo._id',
        teamName: '$teamInfo.name',
        score: { $sum: '$evaluation.score' }, // Assuming evaluation has a score field
        // Add other fields as needed for display
      } },
      { $sort: { score: -1 } },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get global leaderboard (example: top teams across all hackathons or top users)
export const getGlobalLeaderboard = async (req, res) => {
  try {
    // This is a more complex aggregation. For simplicity, let's assume we want top users by some metric.
    // A more realistic scenario would involve complex scoring across multiple hackathons.
    const globalLeaderboard = await User.aggregate([
      { $project: {
        _id: '$_id',
        username: '$username',
        totalScore: { $sum: '$hackathons.score' }, // Assuming user model has scores from hackathons
        // You might need to adjust this based on how you want to calculate global scores
      } },
      { $sort: { totalScore: -1 } },
      { $limit: 100 }, // Top 100 users globally
    ]);

    res.status(200).json(globalLeaderboard);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
