import Hackathon from '../models/Hackathon.js';
import User from '../models/User.js';
import Submission from '../models/Submission.js';
import Team from '../models/Team.js'; // Added import for Team

export const getDashboardStats = async (req, res) => {
  try {
    // Only organizers can access these stats
    if (req.user.role !== 'Organizer') {
      return res.status(403).json({ message: 'Not authorized to view organizer dashboard stats' });
    }

    const totalHackathons = await Hackathon.countDocuments({});
    const activeHackathons = await Hackathon.countDocuments({ status: 'Active' });
    const totalParticipants = await User.countDocuments({ role: 'Participant' });
    const totalSubmissions = await Submission.countDocuments({});

    // You might want to get more detailed 'change' data from the database too,
    // e.g., hackathons created this month, participants joined this week, etc.
    // For now, these 'change' values will remain hardcoded in the frontend or calculated there.

    res.status(200).json({
      totalHackathons,
      activeHackathons,
      totalParticipants,
      totalSubmissions,
    });
  } catch (error) {
    console.error("Error fetching organizer dashboard stats:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    if (req.user.role !== 'Organizer') {
      return res.status(403).json({ message: 'Not authorized to view recent activities' });
    }

    const organizerId = req.user.id;
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);

    const hackathonCreations = await Hackathon.find({ organizer: organizerId, createdAt: { $gte: fiveDaysAgo } })
      .select('name createdAt');

    const teamFormations = await Team.find({ 'members.user': organizerId, createdAt: { $gte: fiveDaysAgo } })
      .populate('hackathon', 'name')
      .select('name hackathon createdAt');
    
    const submissions = await Submission.find({ hackathon: { $in: await Hackathon.find({ organizer: organizerId }).distinct('_id') }, createdAt: { $gte: fiveDaysAgo } })
      .populate('team', 'name')
      .populate('hackathon', 'name')
      .select('createdAt team hackathon');

    let activities = [];

    hackathonCreations.forEach(hackathon => {
      activities.push({
        _id: hackathon._id,
        type: 'hackathonCreated',
        hackathonName: hackathon.name,
        createdAt: hackathon.createdAt,
      });
    });

    teamFormations.forEach(team => {
      activities.push({
        _id: team._id,
        type: 'teamFormed',
        teamName: team.name,
        hackathonName: team.hackathon ? team.hackathon.name : 'Unknown Hackathon',
        createdAt: team.createdAt,
      });
    });

    submissions.forEach(submission => {
      activities.push({
        _id: submission._id,
        type: 'submissionReceived',
        teamName: submission.team ? submission.team.name : 'Unknown Team',
        hackathonName: submission.hackathon ? submission.hackathon.name : 'Unknown Hackathon',
        createdAt: submission.createdAt,
      });
    });

    // Sort activities by createdAt in descending order (most recent first)
    activities.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(activities);

  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getOrganizerActivityGraphData = async (req, res) => {
  try {
    if (req.user.role !== 'Organizer') {
      return res.status(403).json({ message: 'Not authorized to view activity graph data' });
    }

    const organizerId = req.user.id;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const activities = {}; // Date string -> count

    // Hackathon Creations
    const hackathonCreations = await Hackathon.find({ organizer: organizerId, createdAt: { $gte: oneYearAgo } });
    hackathonCreations.forEach(h => {
      const dateString = h.createdAt.toISOString().split('T')[0];
      activities[dateString] = (activities[dateString] || 0) + 1;
    });

    // Team Formations (where organizer is a member or leader)
    const teamFormations = await Team.find({ 'members.user': organizerId, createdAt: { $gte: oneYearAgo } });
    teamFormations.forEach(t => {
      const dateString = t.createdAt.toISOString().split('T')[0];
      activities[dateString] = (activities[dateString] || 0) + 1;
    });

    // Submissions (for hackathons organized by this organizer)
    const organizedHackathonIds = await Hackathon.find({ organizer: organizerId }).distinct('_id');
    const submissions = await Submission.find({ hackathon: { $in: organizedHackathonIds }, createdAt: { $gte: oneYearAgo } });
    submissions.forEach(s => {
      const dateString = s.createdAt.toISOString().split('T')[0];
      activities[dateString] = (activities[dateString] || 0) + 1;
    });

    // Convert to the format expected by the frontend (date, level)
    const formattedActivityData = [];
    const currentDate = new Date(oneYearAgo);
    while (currentDate <= new Date()) {
      const dateString = currentDate.toISOString().split('T')[0];
      formattedActivityData.push({
        date: new Date(currentDate), // Send as Date object
        level: Math.min(activities[dateString] || 0, 4), // Cap level at 4 for visual representation
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.status(200).json(formattedActivityData);
  } catch (error) {
    console.error("Error fetching organizer activity graph data:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};
