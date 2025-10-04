import express from 'express';
const router = express.Router();
import { createTeam, getTeamsByHackathon, getTeamById, joinTeam, leaveTeam, inviteMember, respondToInvitation, removeMember, getUserTeam } from '../controllers/teamController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createTeam);
router.route('/hackathon/:hackathonId').get(getTeamsByHackathon);
router.route('/:id').get(protect, getTeamById);
router.route('/:id/join').put(protect, joinTeam);
router.route('/:id/leave').put(protect, leaveTeam);
router.route('/:id/invite').post(protect, authorizeRoles('participant', 'organizer', 'judge', 'mentor'), inviteMember);
router.route('/:id/invite/:action').put(protect, respondToInvitation);
router.route('/:id/remove/:userId').put(protect, authorizeRoles('participant', 'organizer', 'judge', 'mentor'), removeMember);

router.route('/my-team/:hackathonId').get(protect, getUserTeam);

export default router;
