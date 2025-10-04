import Submission from '../models/Submission.js';
import Team from '../models/Team.js';
import Hackathon from '../models/Hackathon.js';

// @desc    Create/Update a submission
// @route   POST /api/submissions
// @access  Private/Participant
export const createOrUpdateSubmission = async (req, res) => {
  const { teamId, hackathonId, codeLink, presentationLink, videoLink, otherLinks } = req.body;

  if (!teamId || !hackathonId) {
    return res.status(400).json({ message: 'Team ID and Hackathon ID are required' });
  }

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the user is a member of the team
    const isMember = team.members.some(member => member.user.toString() === req.user.id && member.status === 'accepted');
    if (!isMember) {
      return res.status(403).json({ message: 'Not authorized to make submission for this team' });
    }

    // Check if hackathon exists and is associated with the team
    if (team.hackathon.toString() !== hackathonId) {
      return res.status(400).json({ message: 'Team is not registered for this hackathon' });
    }

    let submission = await Submission.findOne({ team: teamId, hackathon: hackathonId });

    if (submission) {
      // Update existing submission
      submission.codeLink = codeLink || submission.codeLink;
      submission.presentationLink = presentationLink || submission.presentationLink;
      submission.videoLink = videoLink || submission.videoLink;
      submission.otherLinks = otherLinks || submission.otherLinks;
      submission.submissionDate = Date.now();
      submission.status = 'resubmitted';

      const updatedSubmission = await submission.save();
      return res.json(updatedSubmission);
    } else {
      // Create new submission
      submission = new Submission({
        team: teamId,
        hackathon: hackathonId,
        codeLink,
        presentationLink,
        videoLink,
        otherLinks,
      });

      const createdSubmission = await submission.save();

      // Update team with submission reference
      team.submission = createdSubmission._id;
      await team.save();

      return res.status(201).json(createdSubmission);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get submission by team and hackathon
// @route   GET /api/submissions/:hackathonId/:teamId
// @access  Private/Participant/Organizer/Judge
export const getSubmission = async (req, res) => {
  try {
    const { hackathonId, teamId } = req.params;

    const submission = await Submission.findOne({ team: teamId, hackathon: hackathonId })
      .populate('team', 'name leader members')
      .populate('hackathon', 'title');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Authorization check
    const team = await Team.findById(teamId);
    const isTeamMember = team.members.some(member => member.user.toString() === req.user.id);
    const isLeader = team.leader.toString() === req.user.id;
    const isOrganizer = req.user.role === 'organizer';
    const isJudge = req.user.role === 'judge'; // More detailed judge check will be needed later

    if (!(isTeamMember || isLeader || isOrganizer || isJudge)) {
      return res.status(403).json({ message: 'Not authorized to view this submission' });
    }

    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get all submissions for a hackathon (for organizer/judge)
// @route   GET /api/submissions/hackathon/:hackathonId
// @access  Private/Organizer/Judge
export const getSubmissionsByHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.hackathonId);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    // Only organizers or assigned judges can view all submissions for a hackathon
    if (req.user.role !== 'organizer' && req.user.role !== 'judge') {
      return res.status(403).json({ message: 'Not authorized to view all submissions for this hackathon' });
    }

    const submissions = await Submission.find({ hackathon: req.params.hackathonId })
      .populate('team', 'name leader')
      .populate('evaluatedBy', 'name email');

    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
