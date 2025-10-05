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
      submission.repoUrl = codeLink || submission.repoUrl; // Use repoUrl
      submission.presentationLink = presentationLink || submission.presentationLink;
      submission.videoLink = videoLink || submission.videoLink;
      submission.otherLinks = otherLinks || submission.otherLinks;
      submission.submittedAt = Date.now();
      submission.status = 'resubmitted';

      const updatedSubmission = await submission.save();
      return res.json(updatedSubmission);
    } else {
      // Create new submission
      submission = new Submission({
        team: teamId,
        hackathon: hackathonId,
        repoUrl: codeLink, // Use repoUrl
        presentationLink,
        videoLink,
        otherLinks,
        status: 'submitted', // Set status to submitted for new submission
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

// @desc    Get submission by ID
// @route   GET /api/submissions/:id
// @access  Private/Organizer/Judge
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('team', 'name leader members')
      .populate('hackathon', 'name');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Authorization check (similar to existing getSubmission)
    const hackathon = await Hackathon.findById(submission.hackathon);
    const team = await Team.findById(submission.team);

    const isTeamMember = team && team.members.some(member => member.user.toString() === req.user.id);
    const isLeader = team && team.leader.toString() === req.user.id;
    const isOrganizer = hackathon && hackathon.organizer.toString() === req.user.id;
    const isAssignedJudge = hackathon && hackathon.judges.some(judgeId => judgeId.toString() === req.user.id);

    if (!(isTeamMember || isLeader || isOrganizer || isAssignedJudge)) {
      return res.status(403).json({ message: 'Not authorized to view this submission' });
    }

    res.json(submission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Update submission review (grade and feedback)
// @route   PUT /api/submissions/:id/review
// @access  Private/Organizer/Judge
export const updateSubmissionReview = async (req, res) => {
  const { grade, feedback, status } = req.body;

  // Check if user is an Organizer or Judge
  if (req.user.role !== 'Organizer' && req.user.role !== 'Judge') {
    return res.status(403).json({ message: 'Not authorized to review submissions' });
  }

  try {
    let submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Further authorization: ensure judge is assigned to this hackathon, or user is the organizer
    const hackathon = await Hackathon.findById(submission.hackathon);
    if (!hackathon) {
      return res.status(404).json({ message: 'Associated hackathon not found' });
    }

    const isOrganizer = hackathon.organizer.toString() === req.user.id;
    const isAssignedJudge = hackathon.judges.some(judgeId => judgeId.toString() === req.user.id);

    if (!isOrganizer && !isAssignedJudge) {
      return res.status(403).json({ message: 'Not authorized to review this submission' });
    }

    if (status) submission.status = status;
    if (grade !== undefined) submission.grade = grade;
    if (feedback) submission.feedback = feedback;

    const updatedSubmission = await submission.save();
    res.status(200).json(updatedSubmission);

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
      .populate('hackathon', 'name'); // Populate hackathon name

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
