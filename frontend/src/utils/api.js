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

  getHackathons: async () => {
    const res = await fetch(`${API_URL}/hackathons`);
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
};

export default api;
