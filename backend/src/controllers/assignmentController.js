import Hackathon from '../models/Hackathon.js';
import User from '../models/User.js';

// Helper function to assign/unassign users to/from hackathons
const manageAssignment = async (req, res, roleType, action) => {
  const { hackathonId, userId } = req.params;

  // Check if user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const hackathon = await Hackathon.findById(hackathonId);
    const user = await User.findById(userId);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user to be assigned/unassigned has the correct role
    if (![roleType, 'Organizer'].includes(user.role)) { // Organizer can also be assigned as mentor/judge (e.g. for testing) 
      return res.status(400).json({ message: `User is not a ${roleType}` });
    }

    // Check if the logged-in user is the organizer of this hackathon
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to manage this hackathon' });
    }

    let hackathonArray = hackathon[roleType.toLowerCase() + 's']; // e.g., hackathon.mentors
    let userArray = user.assignedHackathons;

    if (action === 'assign') {
      if (hackathonArray.includes(userId)) {
        return res.status(400).json({ message: `${user.username} is already assigned as a ${roleType} to this hackathon` });
      }
      hackathonArray.push(userId);
      userArray.push(hackathonId);
      await user.save();
    } else if (action === 'unassign') {
      if (!hackathonArray.includes(userId)) {
        return res.status(400).json({ message: `${user.username} is not assigned as a ${roleType} to this hackathon` });
      }
      hackathon[roleType.toLowerCase() + 's'] = hackathonArray.filter(id => id.toString() !== userId);
      user.assignedHackathons = userArray.filter(id => id.toString() !== hackathonId);
      await user.save();
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await hackathon.save();
    res.status(200).json({ message: `${user.username} successfully ${action}ed as ${roleType}` });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Assign a mentor to a hackathon
// @route   PUT /api/assignments/mentor/:hackathonId/:userId
// @access  Private/Organizer
export const assignMentorToHackathon = (req, res) => manageAssignment(req, res, 'Mentor', 'assign');

// @desc    Unassign a mentor from a hackathon
// @route   PUT /api/assignments/mentor/remove/:hackathonId/:userId
// @access  Private/Organizer
export const unassignMentorFromHackathon = (req, res) => manageAssignment(req, res, 'Mentor', 'unassign');

// @desc    Assign a judge to a hackathon
// @route   PUT /api/assignments/judge/:hackathonId/:userId
// @access  Private/Organizer
export const assignJudgeToHackathon = (req, res) => manageAssignment(req, res, 'Judge', 'assign');

// @desc    Unassign a judge from a hackathon
// @route   PUT /api/assignments/judge/remove/:hackathonId/:userId
// @access  Private/Organizer
export const unassignJudgeFromHackathon = (req, res) => manageAssignment(req, res, 'Judge', 'unassign');
