import express from 'express';
const router = express.Router();
import { createOrUpdateSubmission, getSubmission, getSubmissionsByHackathon, getSubmissionById, updateSubmissionReview } from '../controllers/submissionController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrUpdateSubmission);

// New route for getting submission by ID
router.route('/:id').get(protect, getSubmissionById);

// Updated route for updating submission review
router.route('/:id/review').put(protect, authorizeRoles('Organizer', 'Judge'), updateSubmissionReview);

router.route('/hackathon/:hackathonId').get(protect, authorizeRoles('Organizer', 'Judge'), getSubmissionsByHackathon);
router.route('/:hackathonId/:teamId').get(protect, getSubmission);

export default router;
