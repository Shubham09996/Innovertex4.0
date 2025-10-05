import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const avatar = req.file ? req.file.path : undefined; // Get avatar URL from Cloudinary

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
      role,
      avatar, // Save avatar URL if available
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' }); // Changed to JSON response
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('assignedHackathons', 'name status startDate endDate') // Populate assigned hackathons
      .populate('assignedTeams', 'name'); // Populate assigned teams (if any)

    // For Organizer-specific stats, we might need to calculate or fetch from other sources
    // For now, we will rely on the direct fields in the User model

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, role, bio, skills, certificates } = req.body; // Add skills and certificates

  // Build user object
  const userFields = {};
  if (username) userFields.username = username;
  if (email) userFields.email = email;
  if (role) userFields.role = role;
  if (bio) userFields.bio = bio;
  if (skills) userFields.skills = skills;
  if (certificates) userFields.certificates = certificates;

  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a user's role (by Organizer)
// @route   PUT /api/auth/users/:id/role
// @access  Private/Organizer
export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  // Check if requesting user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to update user roles' });
  }

  // Validate new role
  const allowedRoles = ['Participant', 'Organizer', 'Mentor', 'Judge'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent changing the role of another Organizer or self
    if (user.role === 'Organizer' && user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Cannot change role of another Organizer' });
    }
    if (user._id.toString() === req.user.id) {
      return res.status(403).json({ message: 'Cannot change your own role' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: `User ${user.username} role updated to ${role}`, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Search users by username, email, or role
// @route   GET /api/auth/users/search
// @access  Private/Organizer
export const searchUsers = async (req, res) => {
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to search users' });
  }

  try {
    const { query, role } = req.query;
    let searchCriteria = {};

    if (query) {
      searchCriteria.$or = [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ];
    }
    if (role) {
      searchCriteria.role = role;
    }

    const users = await User.find(searchCriteria).select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};