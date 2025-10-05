import express from 'express';
const router = express.Router();
import { getTeamChatMessages, getMentorChatMessages, sendTeamChatMessage, sendMentorChatMessage } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

// @route   GET /api/chat/team/:hackathonId/:teamId
// @desc    Get team chat messages
// @access  Private
router.get('/team/:hackathonId/:teamId', protect, getTeamChatMessages);

// @route   POST /api/chat/team/:hackathonId/:teamId
// @desc    Send a team chat message
// @access  Private
router.post('/team/:hackathonId/:teamId', protect, sendTeamChatMessage);

// @route   GET /api/chat/mentor/:hackathonId/:mentorId
// @desc    Get mentor chat messages
// @access  Private
router.get('/mentor/:hackathonId/:mentorId', protect, getMentorChatMessages);

// @route   POST /api/chat/mentor/:hackathonId/:mentorId
// @desc    Send a mentor chat message
// @access  Private
router.post('/mentor/:hackathonId/:mentorId', protect, sendMentorChatMessage);

export default router;
