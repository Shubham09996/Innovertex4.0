import Hackathon from '../models/Hackathon.js';
import User from '../models/User.js'; // Added import for User model
import Team from '../models/Team.js';
import Submission from '../models/Submission.js';

// Get all hackathons
export const getHackathons = async (req, res) => {
  try {
    // Only organizers can access their hackathons
    if (req.user.role !== 'Organizer') {
      return res.status(403).json({ message: 'Not authorized to view these hackathons' });
    }

    const hackathons = await Hackathon.find({ organizer: req.user.id });
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all public hackathons
export const getAllPublicHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single hackathon by ID
export const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate('organizer', 'username email')
      .populate('mentors', 'username avatar sessionsCompleted') // Added sessionsCompleted
      .populate('teams')
      .populate('participants')
      .populate('submissions')
      .populate('judges', 'username avatar evaluationsCompleted'); // Added evaluationsCompleted
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.status(200).json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new hackathon
// @route   POST /api/hackathons
// @access  Private/Organizer
export const createHackathon = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status, mode, maxTeamSize, eligibility, registrationDeadline, prizePool, technologyStack } = req.body;
    const imageUrl = req.file ? req.file.path : undefined; // Get image URL from Cloudinary

    const organizer = req.user.id;

    const hackathon = new Hackathon({
      name,
      description,
      imageUrl,
      startDate,
      endDate,
      organizer: organizer,
    });

    const savedHackathon = await hackathon.save();
    res.status(201).json(savedHackathon);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a hackathon
// @route   PUT /api/hackathons/:id
// @access  Private/Organizer
export const updateHackathon = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  // Check if user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to update a hackathon' });
  }

  try {
    let hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Check if the logged-in user is the organizer of this hackathon
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this hackathon' });
    }

    hackathon.name = name || hackathon.name;
    hackathon.description = description || hackathon.description;
    hackathon.startDate = startDate || hackathon.startDate;
    hackathon.endDate = endDate || hackathon.endDate;

    const updatedHackathon = await hackathon.save();
    res.status(200).json(updatedHackathon);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a hackathon
// @route   DELETE /api/hackathons/:id
// @access  Private/Organizer
export const deleteHackathon = async (req, res) => {
  // Check if user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to delete a hackathon' });
  }

  try {
    let hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Check if the logged-in user is the organizer of this hackathon
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this hackathon' });
    }

    await Hackathon.deleteOne({ _id: req.params.id }); // Use deleteOne
    res.status(200).json({ message: 'Hackathon removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new announcement for a hackathon
// @route   POST /api/hackathons/:id/announcements
// @access  Private/Organizer
export const createAnnouncement = async (req, res) => {
  const { title, content, priority } = req.body;

  // Check if user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to create announcements' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Check if the logged-in user is the organizer of this hackathon
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to add announcements to this hackathon' });
    }

    const newAnnouncement = { title, content, priority };
    hackathon.announcements.push(newAnnouncement);
    await hackathon.save();

    res.status(201).json(hackathon.announcements[hackathon.announcements.length - 1]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update an announcement for a hackathon
// @route   PUT /api/hackathons/:hackathonId/announcements/:announcementId
// @access  Private/Organizer
export const updateAnnouncement = async (req, res) => {
  const { title, content, priority } = req.body;

  // Check if user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to update announcements' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Check if the logged-in user is the organizer of this hackathon
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update announcements for this hackathon' });
    }

    const announcement = hackathon.announcements.id(req.params.announcementId);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    announcement.title = title || announcement.title;
    announcement.content = content || announcement.content;
    announcement.priority = priority || announcement.priority;

    await hackathon.save();
    res.status(200).json(announcement);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete an announcement from a hackathon
// @route   DELETE /api/hackathons/:hackathonId/announcements/:announcementId
// @access  Private/Organizer
export const deleteAnnouncement = async (req, res) => {
  // Check if user is an Organizer
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to delete announcements' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Check if the logged-in user is the organizer of this hackathon
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete announcements from this hackathon' });
    }

    hackathon.announcements = hackathon.announcements.filter(
      (announcement) => announcement._id.toString() !== req.params.announcementId
    );

    await hackathon.save();
    res.status(200).json({ message: 'Announcement removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Assign a mentor to a hackathon
// @route   PUT /api/hackathons/:hackathonId/assign-mentor/:userId
// @access  Private/Organizer
export const assignMentorToHackathon = async (req, res) => {
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to assign mentors' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to manage this hackathon' });
    }

    const mentor = await User.findById(req.params.userId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    if (mentor.role !== 'Mentor') {
      return res.status(400).json({ message: 'User is not a mentor' });
    }

    if (hackathon.mentors.includes(mentor._id)) {
      return res.status(400).json({ message: 'Mentor already assigned to this hackathon' });
    }

    hackathon.mentors.push(mentor._id);
    await hackathon.save();

    // Add hackathon to mentor's assignedHackathons
    mentor.assignedHackathons.push(hackathon._id);
    await mentor.save();

    res.status(200).json({ message: 'Mentor assigned successfully', hackathon });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Unassign a mentor from a hackathon
// @route   PUT /api/hackathons/:hackathonId/unassign-mentor/:userId
// @access  Private/Organizer
export const unassignMentorFromHackathon = async (req, res) => {
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to unassign mentors' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to manage this hackathon' });
    }

    const mentor = await User.findById(req.params.userId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    hackathon.mentors = hackathon.mentors.filter(
      (m) => m.toString() !== mentor._id.toString()
    );
    await hackathon.save();

    // Remove hackathon from mentor's assignedHackathons
    mentor.assignedHackathons = mentor.assignedHackathons.filter(
      (h) => h.toString() !== hackathon._id.toString()
    );
    await mentor.save();

    res.status(200).json({ message: 'Mentor unassigned successfully', hackathon });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Assign a judge to a hackathon
// @route   PUT /api/hackathons/:hackathonId/assign-judge/:userId
// @access  Private/Organizer
export const assignJudgeToHackathon = async (req, res) => {
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to assign judges' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to manage this hackathon' });
    }

    const judge = await User.findById(req.params.userId);
    if (!judge) {
      return res.status(404).json({ message: 'Judge not found' });
    }
    if (judge.role !== 'Judge') {
      return res.status(400).json({ message: 'User is not a judge' });
    }

    if (hackathon.judges.includes(judge._id)) {
      return res.status(400).json({ message: 'Judge already assigned to this hackathon' });
    }

    hackathon.judges.push(judge._id);
    await hackathon.save();

    // Add hackathon to judge's assignedHackathons
    judge.assignedHackathons.push(hackathon._id);
    await judge.save();

    res.status(200).json({ message: 'Judge assigned successfully', hackathon });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Unassign a judge from a hackathon
// @route   PUT /api/hackathons/:hackathonId/unassign-judge/:userId
// @access  Private/Organizer
export const unassignJudgeFromHackathon = async (req, res) => {
  if (req.user.role !== 'Organizer') {
    return res.status(403).json({ message: 'Not authorized to unassign judges' });
  }

  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    if (hackathon.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to manage this hackathon' });
    }

    const judge = await User.findById(req.params.userId);
    if (!judge) {
      return res.status(404).json({ message: 'Judge not found' });
    }

    hackathon.judges = hackathon.judges.filter(
      (j) => j.toString() !== judge._id.toString()
    );
    await hackathon.save();

    // Remove hackathon from judge's assignedHackathons
    judge.assignedHackathons = judge.assignedHackathons.filter(
      (h) => h.toString() !== hackathon._id.toString()
    );
    await judge.save();

    res.status(200).json({ message: 'Judge unassigned successfully', hackathon });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
