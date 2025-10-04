import Team from '../models/Team.js';
import Hackathon from '../models/Hackathon.js';
import User from '../models/User.js';

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private/Participant
export const createTeam = async (req, res) => {
  const { name, hackathonId } = req.body;

  if (!name || !hackathonId) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const hackathon = await Hackathon.findById(hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Check if the user is already part of a team for this hackathon
    const existingTeam = await Team.findOne({
      hackathon: hackathonId,
      'members.user': req.user.id,
    });

    if (existingTeam) {
      return res.status(400).json({ message: 'You are already part of a team for this hackathon' });
    }

    const team = new Team({
      name,
      hackathon: hackathonId,
      leader: req.user.id,
      members: [{
        user: req.user.id,
        status: 'accepted',
      }],
    });

    const createdTeam = await team.save();

    // Add team to hackathon's teams array
    hackathon.teams.push(createdTeam._id);
    await hackathon.save();

    // Add participant to hackathon's participants array if not already there
    if (!hackathon.participants.includes(req.user.id)) {
      hackathon.participants.push(req.user.id);
      await hackathon.save();
    }

    // Add hackathon to user's hackathonsParticipating array
    const user = await User.findById(req.user.id);
    if (user && !user.hackathonsParticipating.includes(hackathonId)) {
      user.hackathonsParticipating.push(hackathonId);
      await user.save();
    }

    res.status(201).json(createdTeam);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all teams for a hackathon
// @route   GET /api/teams/hackathon/:hackathonId
// @access  Public
export const getTeamsByHackathon = async (req, res) => {
  try {
    const teams = await Team.find({ hackathon: req.params.hackathonId })
      .populate('leader', 'name email')
      .populate('members.user', 'name email');
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get single team by ID
// @route   GET /api/teams/:id
// @access  Private
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'name email')
      .populate('members.user', 'name email');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is a member or leader of the team
    const isMember = team.members.some(member => member.user.toString() === req.user.id);
    if (team.leader.toString() !== req.user.id && !isMember && req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Not authorized to view this team' });
    }

    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Join a team (via invite link or direct join if public)
// @route   PUT /api/teams/:id/join
// @access  Private/Participant
export const joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if already a member
    const isMember = team.members.some(member => member.user.toString() === req.user.id);
    if (isMember) {
      return res.status(400).json({ message: 'You are already a member of this team' });
    }

    // Check if already part of another team for the same hackathon
    const existingTeamForHackathon = await Team.findOne({
      hackathon: team.hackathon,
      'members.user': req.user.id,
    });
    if (existingTeamForHackathon) {
      return res.status(400).json({ message: 'You are already part of another team for this hackathon' });
    }

    team.members.push({ user: req.user.id, status: 'accepted' });
    await team.save();

    // Add participant to hackathon's participants array if not already there
    const hackathon = await Hackathon.findById(team.hackathon);
    if (hackathon && !hackathon.participants.includes(req.user.id)) {
      hackathon.participants.push(req.user.id);
      await hackathon.save();
    }

    // Add hackathon to user's hackathonsParticipating array
    const user = await User.findById(req.user.id);
    if (user && !user.hackathonsParticipating.includes(team.hackathon)) {
      user.hackathonsParticipating.push(team.hackathon);
      await user.save();
    }

    res.json({ message: 'Joined team successfully', team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Leave a team
// @route   PUT /api/teams/:id/leave
// @access  Private/Participant
export const leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is the leader
    if (team.leader.toString() === req.user.id) {
      return res.status(400).json({ message: 'Leader cannot leave the team directly. Please assign a new leader or disband the team.' });
    }

    // Remove user from members array
    team.members = team.members.filter(member => member.user.toString() !== req.user.id);
    await team.save();

    // Optional: if team becomes empty, consider deleting it or changing its status
    if (team.members.length === 0) {
      await Team.deleteOne({ _id: team._id });
      // Also remove team from hackathon's teams array
      const hackathon = await Hackathon.findById(team.hackathon);
      if (hackathon) {
        hackathon.teams = hackathon.teams.filter(t => t.toString() !== team._id.toString());
        await hackathon.save();
      }
    }

    res.json({ message: 'Left team successfully', team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Invite a member to the team (by leader)
// @route   POST /api/teams/:id/invite
// @access  Private/Leader
export const inviteMember = async (req, res) => {
  const { email } = req.body;

  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the requesting user is the team leader
    if (team.leader.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to invite members to this team' });
    }

    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already a member or pending invite
    const isAlreadyMember = team.members.some(member => member.user.toString() === userToInvite._id.toString());
    if (isAlreadyMember) {
      return res.status(400).json({ message: 'User is already a member or has a pending invitation' });
    }

    // Check if user to invite is already part of another team for the same hackathon
    const existingTeamForHackathon = await Team.findOne({
      hackathon: team.hackathon,
      'members.user': userToInvite._id,
    });
    if (existingTeamForHackathon) {
      return res.status(400).json({ message: `User is already part of another team \'${existingTeamForHackathon.name}\' for this hackathon` });
    }

    team.members.push({ user: userToInvite._id, status: 'pending' });
    await team.save();

    // TODO: Send invitation notification/email to userToInvite

    res.json({ message: 'Invitation sent', team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Accept/Reject team invitation
// @route   PUT /api/teams/:id/invite/:action
// @access  Private/Participant
export const respondToInvitation = async (req, res) => {
  const { action } = req.params; // action can be 'accept' or 'reject'

  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const memberIndex = team.members.findIndex(member => member.user.toString() === req.user.id && member.status === 'pending');

    if (memberIndex === -1) {
      return res.status(400).json({ message: 'No pending invitation found for this user in this team' });
    }

    if (action === 'accept') {
      // Check if already part of another team for the same hackathon
      const existingTeamForHackathon = await Team.findOne({
        hackathon: team.hackathon,
        'members.user': req.user.id,
        '_id': { $ne: team._id } // Exclude current team
      });
      if (existingTeamForHackathon) {
        return res.status(400).json({ message: `You are already part of another team \'${existingTeamForHackathon.name}\' for this hackathon. You cannot accept this invitation.` });
      }

      team.members[memberIndex].status = 'accepted';
      // Add participant to hackathon's participants array if not already there
      const hackathon = await Hackathon.findById(team.hackathon);
      if (hackathon && !hackathon.participants.includes(req.user.id)) {
        hackathon.participants.push(req.user.id);
        await hackathon.save();
      }
    } else if (action === 'reject') {
      team.members.splice(memberIndex, 1); // Remove the pending member
    } else {
      return res.status(400).json({ message: `Invalid action. Must be 'accept' or 'reject'` });
    }

    await team.save();
    res.json({ message: `Invitation ${action}ed successfully`, team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Remove a member from the team (by leader)
// @route   PUT /api/teams/:id/remove/:userId
// @access  Private/Leader
export const removeMember = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the requesting user is the team leader
    if (team.leader.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to remove members from this team' });
    }

    const userToRemoveId = req.params.userId;

    // Cannot remove the leader themselves
    if (userToRemoveId === req.user.id) {
      return res.status(400).json({ message: 'Leader cannot remove themselves from the team. Please assign a new leader or disband the team.' });
    }

    const memberIndex = team.members.findIndex(member => member.user.toString() === userToRemoveId);

    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in this team' });
    }

    team.members.splice(memberIndex, 1);
    await team.save();

    res.json({ message: 'Member removed successfully', team });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get the team of the currently authenticated user for a specific hackathon
// @route   GET /api/teams/my-team/:hackathonId
// @access  Private/Participant
export const getUserTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      'members.user': req.user.id,
      hackathon: req.params.hackathonId,
    })
      .populate('leader', 'username email')
      .populate('members.user', 'username email');

    if (!team) {
      return res.status(404).json({ message: 'Team not found for this user in this hackathon' });
    }

    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};