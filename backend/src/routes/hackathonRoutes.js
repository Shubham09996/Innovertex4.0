import express from 'express';
import { getHackathons, getHackathonById, createHackathon, updateHackathon, deleteHackathon, createAnnouncement, updateAnnouncement, deleteAnnouncement, assignMentorToHackathon, unassignMentorFromHackathon, assignJudgeToHackathon, unassignJudgeFromHackathon, getAllPublicHackathons } from '../controllers/hackathonController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import upload from '../utils/upload.js'; // Import upload middleware

const router = express.Router();

router.route('/all').get(getAllPublicHackathons); // New route for all public hackathons

router.route('/').get(protect, authorizeRoles('Organizer'), getHackathons).post(protect, authorizeRoles('Organizer'), upload.single('image'), createHackathon);
router.route('/:id').get(getHackathonById).put(protect, updateHackathon).delete(protect, authorizeRoles('Organizer'), deleteHackathon);

// Announcement routes
router.route('/:id/announcements').post(protect, authorizeRoles('Organizer'), createAnnouncement);
router.route('/:hackathonId/announcements/:announcementId').put(protect, authorizeRoles('Organizer'), updateAnnouncement).delete(protect, authorizeRoles('Organizer'), deleteAnnouncement);

// Mentor assignment routes
router.route('/:hackathonId/assign-mentor/:userId').put(protect, assignMentorToHackathon);
router.route('/:hackathonId/unassign-mentor/:userId').put(protect, unassignMentorFromHackathon);

// Judge assignment routes
router.route('/:hackathonId/assign-judge/:userId').put(protect, assignJudgeToHackathon);
router.route('/:hackathonId/unassign-judge/:userId').put(protect, unassignJudgeFromHackathon);

export default router;
