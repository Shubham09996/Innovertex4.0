import express from 'express';
const router = express.Router();
import { getTeamChatMessages, getMentorChatMessages } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

// @route   GET /api/chat/team/:hackathonId/:teamId
// @desc    Get team chat messages
// @access  Private
router.get('/team/:hackathonId/:teamId', protect, getTeamChatMessages);

// @route   GET /api/chat/mentor/:hackathonId/:mentorId
// @desc    Get mentor chat messages
// @access  Private
router.get('/mentor/:hackathonId/:mentorId', protect, getMentorChatMessages);

export default router;
