import express from 'express';
const router = express.Router();
import { signup, login, getProfile, updateProfile, updateUserRole, searchUsers } from '../controllers/authController.js'; // Add updateUserRole and searchUsers
import { protect, authorizeRoles } from '../middleware/authMiddleware.js'; // Import authorizeRoles
import upload from '../utils/upload.js'; // Import upload middleware

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', upload.single('avatar'), signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile);

// @route   PUT api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

// @route   PUT api/auth/users/:id/role
// @desc    Update a user's role (by Organizer)
// @access  Private/Organizer
router.put('/users/:id/role', protect, authorizeRoles('Organizer'), updateUserRole);

// @route   GET api/auth/users/search
// @desc    Search users by username, email, or role
// @access  Private/Organizer
router.get('/users/search', protect, authorizeRoles('Organizer'), searchUsers);

export default router;
