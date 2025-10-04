import express from 'express';
import { getHackathonLeaderboard, getGlobalLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

// Get hackathon specific leaderboard
router.get('/hackathon/:hackathonId', getHackathonLeaderboard);

// Get global leaderboard
router.get('/global', getGlobalLeaderboard);

export default router;
