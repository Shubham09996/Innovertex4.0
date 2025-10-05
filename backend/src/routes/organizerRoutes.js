import express from 'express';
const router = express.Router();
import { getDashboardStats, getRecentActivities, getOrganizerActivityGraphData } from '../controllers/organizerController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

// @route   GET /api/organizer/dashboard-stats
// @desc    Get organizer dashboard statistics
// @access  Private/Organizer
router.get('/dashboard-stats', protect, authorizeRoles('Organizer'), getDashboardStats);

// @route   GET /api/organizer/recent-activities
// @desc    Get recent activities for organizer dashboard
// @access  Private/Organizer
router.get('/recent-activities', protect, authorizeRoles('Organizer'), getRecentActivities);

// @route   GET /api/organizer/activity-graph-data
// @desc    Get activity graph data for organizer profile
// @access  Private/Organizer
router.get('/activity-graph-data', protect, authorizeRoles('Organizer'), getOrganizerActivityGraphData);

export default router;
