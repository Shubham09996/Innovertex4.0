import express from 'express';
const router = express.Router();
import { signup, login, getProfile, updateProfile } from '../controllers/authController.js'; // Corrected registerUser to signup
import { protect } from '../middleware/authMiddleware.js'; // Corrected import
import upload from '../utils/upload.js'; // Import upload middleware

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', upload.single('avatar'), signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login); // Corrected loginUser to login

// @route   GET api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getProfile); // Corrected getMe to getProfile

// @route   PUT api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

export default router;
