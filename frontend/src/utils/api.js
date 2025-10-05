const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// console.log('Frontend API URL:', API_URL); // Debugging

const api = {
  signup: async (formData) => { // Accept FormData object
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      // Remove Content-Type header, browser will set multipart/form-data automatically
      body: formData,
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  createTeam: async (name, hackathonId, token) => {
    const res = await fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, hackathonId }),
    });
    return res.json();
  },

  updateTeam: async (teamId, teamData, token) => {
    const res = await fetch(`${API_URL}/teams/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    });
    return res.json();
  },

  joinTeam: async (teamId, token) => {
    const res = await fetch(`${API_URL}/teams/${teamId}/join`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Add other API calls here
  getProfile: async (token) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  updateProfile: async (profileData, token) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return res.json();
  },

  // Hackathon Management APIs
  createHackathon: async (formData, token) => {
    const res = await fetch(`${API_URL}/hackathons`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Send FormData directly
    });
    return res.json();
  },

  updateHackathon: async (id, hackathonData, token) => {
    const res = await fetch(`${API_URL}/hackathons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(hackathonData),
    });
    return res.json();
  },

  deleteHackathon: async (id, token) => {
    const res = await fetch(`${API_URL}/hackathons/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getHackathons: async (token) => {
    const res = await fetch(`${API_URL}/hackathons`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getAllPublicHackathons: async () => {
    const res = await fetch(`${API_URL}/hackathons/all`);
    return res.json();
  },

  getHackathonById: async (id) => {
    const res = await fetch(`${API_URL}/hackathons/${id}`);
    return res.json();
  },

  getTeamById: async (id, token) => {
    const res = await fetch(`${API_URL}/teams/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getUserTeam: async (hackathonId, token) => {
    const res = await fetch(`${API_URL}/teams/my-team/${hackathonId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  leaveTeam: async (teamId, token) => {
    const res = await fetch(`${API_URL}/teams/${teamId}/leave`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  inviteMember: async (teamId, email, token) => {
    const res = await fetch(`${API_URL}/teams/${teamId}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  respondToInvitation: async (teamId, action, token) => {
    const res = await fetch(`${API_URL}/teams/${teamId}/invite/${action}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  removeMember: async (teamId, userId, token) => {
    const res = await fetch(`${API_URL}/teams/${teamId}/remove/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  createOrUpdateSubmission: async (submissionData, token) => {
    const res = await fetch(`${API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    });
    return res.json();
  },

  // New API call for getting submission by ID
  getSubmissionById: async (submissionId, token) => {
    const res = await fetch(`${API_URL}/submissions/${submissionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // New API call for updating submission review
  updateSubmissionReview: async (submissionId, reviewData, token) => {
    const res = await fetch(`${API_URL}/submissions/${submissionId}/review`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    return res.json();
  },

  getSubmission: async (hackathonId, teamId, token) => {
    const res = await fetch(`${API_URL}/submissions/${hackathonId}/${teamId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getHackathonLeaderboard: async (hackathonId) => {
    const res = await fetch(`${API_URL}/leaderboard/hackathon/${hackathonId}`);
    return res.json();
  },

  getGlobalLeaderboard: async () => {
    const res = await fetch(`${API_URL}/leaderboard/global`);
    return res.json();
  },

  // Announcement APIs
  createAnnouncement: async (hackathonId, announcementData, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(announcementData),
    });
    return res.json();
  },

  updateAnnouncement: async (hackathonId, announcementId, announcementData, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/announcements/${announcementId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(announcementData),
    });
    return res.json();
  },

  deleteAnnouncement: async (hackathonId, announcementId, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/announcements/${announcementId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Mentor/Judge Assignment APIs
  assignMentorToHackathon: async (hackathonId, userId, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/assign-mentor/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  unassignMentorFromHackathon: async (hackathonId, userId, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/unassign-mentor/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  assignJudgeToHackathon: async (hackathonId, userId, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/assign-judge/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  unassignJudgeFromHackathon: async (hackathonId, userId, token) => {
    const res = await fetch(`${API_URL}/hackathons/${hackathonId}/unassign-judge/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // User Search API
  searchUsers: async (query, role, token) => {
    const res = await fetch(`${API_URL}/auth/users/search?query=${query}&role=${role}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Organizer Dashboard APIs
  getOrganizerDashboardStats: async (token) => {
    const res = await fetch(`${API_URL}/organizer/dashboard-stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getRecentActivities: async (token) => {
    const res = await fetch(`${API_URL}/organizer/recent-activities`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getOrganizerActivityGraphData: async (token) => {
    const res = await fetch(`${API_URL}/organizer/activity-graph-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getTeamChatMessages: async (hackathonId, teamId, token) => {
    const res = await fetch(`${API_URL}/chat/team/${hackathonId}/${teamId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getMentorChatMessages: async (hackathonId, mentorId, token) => {
    const res = await fetch(`${API_URL}/chat/mentor/${hackathonId}/${mentorId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Evaluation API functions
  getSubmissionsForEvaluation: async (hackathonId, token) => {
    const res = await fetch(`${API_URL}/submissions/hackathon/${hackathonId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  evaluateSubmission: async (submissionId, evaluationData, token) => {
    const res = await fetch(`${API_URL}/submissions/${submissionId}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(evaluationData),
    });
    return res.json();
  },

  getSubmissionEvaluation: async (submissionId, token) => {
    const res = await fetch(`${API_URL}/submissions/${submissionId}/evaluation`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Chat API functions
  sendTeamChatMessage: async (hackathonId, teamId, message, senderName, token) => {
    const res = await fetch(`${API_URL}/chat/team/${hackathonId}/${teamId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message, senderName }),
    });
    return res.json();
  },

  sendMentorChatMessage: async (hackathonId, mentorId, message, senderName, token) => {
    const res = await fetch(`${API_URL}/chat/mentor/${hackathonId}/${mentorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message, senderName }),
    });
    return res.json();
  },
};

export default api;
