import Hackathon from '../models/Hackathon.js';

// Get all hackathons
export const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find({});
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
      .populate('mentors', 'username avatar');
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.status(200).json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
