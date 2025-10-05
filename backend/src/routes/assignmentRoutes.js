import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { assignMentorToHackathon, unassignMentorFromHackathon, assignJudgeToHackathon, unassignJudgeFromHackathon } from '../controllers/assignmentController.js';

const router = express.Router();

// Mentor assignment routes
router.put('/mentor/:hackathonId/:userId', protect, assignMentorToHackathon);
router.put('/mentor/remove/:hackathonId/:userId', protect, unassignMentorFromHackathon);

// Judge assignment routes
router.put('/judge/:hackathonId/:userId', protect, assignJudgeToHackathon);
router.put('/judge/remove/:hackathonId/:userId', protect, unassignJudgeFromHackathon);

export default router;
