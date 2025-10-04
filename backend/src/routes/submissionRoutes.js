import express from 'express';
const router = express.Router();
import { createOrUpdateSubmission, getSubmission, getSubmissionsByHackathon } from '../controllers/submissionController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrUpdateSubmission);
router.route('/hackathon/:hackathonId').get(protect, authorizeRoles('organizer', 'judge'), getSubmissionsByHackathon);
router.route('/:hackathonId/:teamId').get(protect, getSubmission);

export default router;
