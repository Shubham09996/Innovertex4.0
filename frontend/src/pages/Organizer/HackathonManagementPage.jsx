import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api'; // Import api
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function HackathonManagementPage() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hackathon, setHackathon] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const [hackathonFormData, setHackathonFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Upcoming',
    mode: 'Online',
    maxTeamSize: 4,
    eligibility: 'Open to all',
    registrationDeadline: '',
    prizePool: 0,
    technologyStack: '',
  });
  const [hackathonImageFile, setHackathonImageFile] = useState(null);
  const [hackathonImagePreview, setHackathonImagePreview] = useState(null);
  const [assignRole, setAssignRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAssignUserModal, setShowAssignUserModal] = useState(false);
  const [assignError, setAssignError] = useState(null);

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      if (!hackathonId || !token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.getHackathonById(hackathonId);
        setHackathon(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hackathon details:", error);
        setLoading(false);
      }
    };
    fetchHackathonDetails();
  }, [hackathonId, token]);

  const handleHackathonFormChange = (e) => {
    setHackathonFormData({ ...hackathonFormData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHackathonImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHackathonImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setHackathonImageFile(null);
      setHackathonImagePreview(null);
    }
  };

  const handleCreateHackathon = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in hackathonFormData) {
        if (hackathonFormData[key]) {
          formData.append(key, hackathonFormData[key]);
        }
      }
      if (hackathonImageFile) {
        formData.append('image', hackathonImageFile);
      }

      const data = await api.createHackathon(formData, token);
      alert('Hackathon created successfully!');
      navigate(`/organizer/hackathons/${data._id}`);
    } catch (error) {
      console.error("Error creating hackathon:", error);
      alert('Failed to create hackathon.');
    }
  };

  const handleSearchUsers = async (query, role) => {
    setAssignError(null);
    setSearchResults([]);
    try {
      const users = await api.searchUsers(query, role, token);
      setSearchResults(users);
    } catch (error) {
      console.error("Error searching users:", error);
      setAssignError('Error searching users.');
    }
  };

  const handleAddMentor = async (userId) => {
    try {
      const res = await api.assignMentorToHackathon(hackathonId, userId, token);
      if (res.message) {
        setAssignError(res.message);
      } else {
        setHackathon((prevHackathon) => ({
          ...prevHackathon,
          mentors: [
            ...(prevHackathon.mentors || []),
            { 
              _id: userId, 
              username: searchResults.find(u => u._id === userId).username, 
              email: searchResults.find(u => u._id === userId).email, 
              assignedTeams: [], // Default for new assignment
              sessionsCompleted: 0, // Default for new assignment
            }
          ],
        }));
        setShowAssignUserModal(false);
        setSearchTerm('');
        setSearchResults([]);
        alert('Mentor assigned successfully!');
      }
    } catch (error) {
      console.error("Error assigning mentor:", error);
      setAssignError(error.message || 'Failed to assign mentor.');
    }
  };

  const handleRemoveMentor = async (userId) => {
    if (window.confirm('Are you sure you want to unassign this mentor?')) {
      try {
        const res = await api.unassignMentorFromHackathon(hackathonId, userId, token);
        if (res.message) {
          setAssignError(res.message);
        } else {
          setHackathon((prevHackathon) => ({ ...prevHackathon, mentors: prevHackathon.mentors.filter((m) => m._id !== userId) }));
          alert('Mentor unassigned successfully!');
        }
      } catch (error) {
        console.error("Error unassigning mentor:", error);
        setAssignError(error.message || 'Failed to unassign mentor.');
      }
    }
  };

  const handleAddJudge = async (userId) => {
    try {
      const res = await api.assignJudgeToHackathon(hackathonId, userId, token);
      if (res.message) {
        setAssignError(res.message);
      } else {
        setHackathon((prevHackathon) => ({
          ...prevHackathon,
          judges: [
            ...(prevHackathon.judges || []),
            { 
              _id: userId, 
              username: searchResults.find(u => u._id === userId).username, 
              email: searchResults.find(u => u._id === userId).email, 
              assignedTeams: [], // Default for new assignment
              evaluationsCompleted: 0, // Default for new assignment
            }
          ],
        }));
        setShowAssignUserModal(false);
        setSearchTerm('');
        setSearchResults([]);
        alert('Judge assigned successfully!');
      }
    } catch (error) {
      console.error("Error assigning judge:", error);
      setAssignError(error.message || 'Failed to assign judge.');
    }
  };

  const handleRemoveJudge = async (userId) => {
    if (window.confirm('Are you sure you want to unassign this judge?')) {
      try {
        const res = await api.unassignJudgeFromHackathon(hackathonId, userId, token);
        if (res.message) {
          setAssignError(res.message);
        } else {
          setHackathon((prevHackathon) => ({ ...prevHackathon, judges: prevHackathon.judges.filter((j) => j._id !== userId) }));
          alert('Judge unassigned successfully!');
        }
      } catch (error) {
        console.error("Error unassigning judge:", error);
        setAssignError(error.message || 'Failed to unassign judge.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Hackathon Not Found</h2>
          <button
            onClick={() => navigate('/organizer/hackathons')}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back to Hackathons
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'teams', name: 'Teams', icon: '👥' },
    { id: 'judges', name: 'Judges', icon: '⚖️' },
    { id: 'mentors', name: 'Mentors', icon: '🎓' },
    { id: 'announcements', name: 'Announcements', icon: '📢' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">{hackathon.participants ? hackathon.participants.length : 0}</div>
          <div className="text-sm text-muted">Total Participants</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">{hackathon.teams ? hackathon.teams.length : 0}</div>
          <div className="text-sm text-muted">Total Teams</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">{hackathon.submissions ? hackathon.submissions.length : 0}</div>
          <div className="text-sm text-muted">Submissions</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-text mb-1">${(hackathon.prizePool / 1000).toFixed(0) || 0}K</div>
          <div className="text-sm text-muted">Prize Pool</div>
        </div>
      </div>

      {/* Hackathon Details */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-text mb-4">Hackathon Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-text mb-2">Basic Information</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted">Status:</span> <span className="text-text">{hackathon.status || 'N/A'}</span></div>
              <div><span className="text-muted">Mode:</span> <span className="text-text">{hackathon.mode || 'N/A'}</span></div>
              <div><span className="text-muted">Max Team Size:</span> <span className="text-text">{hackathon.maxTeamSize || 'N/A'}</span></div>
              <div><span className="text-muted">Eligibility:</span> <span className="text-text">{hackathon.eligibility || 'N/A'}</span></div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-2">Timeline</h4>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted">Start Date:</span> <span className="text-text">{new Date(hackathon.startDate).toLocaleDateString() || 'N/A'}</span></div>
              <div><span className="text-muted">End Date:</span> <span className="text-text">{new Date(hackathon.endDate).toLocaleDateString() || 'N/A'}</span></div>
              <div><span className="text-muted">Registration Deadline:</span> <span className="text-text">{hackathon.registrationDeadline ? new Date(hackathon.registrationDeadline).toLocaleDateString() : 'N/A'}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-text mb-4">Technology Stack</h3>
        <div className="flex flex-wrap gap-2">
          {hackathon.technologyStack && hackathon.technologyStack.length > 0 ? hackathon.technologyStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {tech}
            </span>
          )) : <span className="text-muted text-sm">No technologies specified.</span>}
        </div>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Teams ({hackathon.teams.length})</h3>
        <button className="btn bg-primary text-white px-4 py-2 rounded-lg">
          Export Teams
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hackathon.teams && hackathon.teams.map((team) => (
          <div key={team._id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text">{team.name}</h4>
                <p className="text-muted text-sm">{team.submission ? team.submission.repoUrl : 'No project submitted yet.'}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                team.submission && (team.submission.status === 'submitted' || team.submission.status === 'resubmitted')
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {team.submission ? team.submission.status : 'Not Submitted'}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted">Progress</span>
                <span className="text-sm font-semibold text-text">{team.submission && team.submission.status === 'reviewed' ? team.submission.grade : 0}%</span>
              </div>
              <div className="w-full bg-bg-elev rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    (team.submission && team.submission.status === 'reviewed' && team.submission.grade >= 80) ? 'bg-green-500' : 
                    (team.submission && team.submission.status === 'reviewed' && team.submission.grade >= 60) ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${team.submission && team.submission.status === 'reviewed' ? team.submission.grade : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-semibold text-text mb-2">Team Members ({team.members.length})</h5>
              <div className="space-y-1">
                {team.members.map((member) => (
                  <div key={member.user._id} className="flex items-center justify-between text-sm">
                    <span className="text-text">{member.user.username}</span>
                    <span className="text-muted">{member.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => navigate(`/organizer/submissions/${team.submission._id}`)}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors"
              >
                View Submission
              </button>
              <button className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJudges = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Judges ({hackathon.judges ? hackathon.judges.length : 0})</h3>
        <button 
          onClick={() => { setShowAssignUserModal(true); setAssignRole('Judge'); setSearchTerm(''); setSearchResults([]); setAssignError(null); }}
          className="btn bg-primary text-white px-4 py-2 rounded-lg"
        >
          Add Judge
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathon.judges && hackathon.judges.map((judge) => (
          <div key={judge._id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text">{judge.username}</h4>
                <p className="text-muted text-sm">{judge.email}</p>
              </div>
              <button 
                onClick={() => handleRemoveJudge(judge._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{judge.assignedTeams ? judge.assignedTeams.length : 0}</div> {/* Dynamic Assigned Teams */}
                <div className="text-xs text-muted">Assigned Teams</div>
              </div>
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{judge.evaluationsCompleted || 0}</div> {/* Dynamic Evaluations */}
                <div className="text-xs text-muted">Evaluations</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                Manage Teams
              </button>
              <button 
                onClick={() => navigate(`/organizer/judges/${judge._id}`)}
                className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Mentors ({hackathon.mentors ? hackathon.mentors.length : 0})</h3>
        <button 
          onClick={() => { setShowAssignUserModal(true); setAssignRole('Mentor'); setSearchTerm(''); setSearchResults([]); setAssignError(null); }}
          className="btn bg-primary text-white px-4 py-2 rounded-lg"
        >
          Add Mentor
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathon.mentors && hackathon.mentors.map((mentor) => (
          <div key={mentor._id} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text">{mentor.username}</h4>
                <p className="text-muted text-sm">{mentor.email}</p>
              </div>
              <button 
                onClick={() => handleRemoveMentor(mentor._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{mentor.assignedTeams ? mentor.assignedTeams.length : 0}</div> {/* Dynamic Assigned Teams */}
                <div className="text-xs text-muted">Assigned Teams</div>
              </div>
              <div className="text-center p-3 bg-bg-elev rounded-lg">
                <div className="text-2xl font-bold text-text">{mentor.sessionsCompleted || 0}</div> {/* Dynamic Sessions */}
                <div className="text-xs text-muted">Sessions</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
                Manage Teams
              </button>
              <button 
                onClick={() => navigate(`/organizer/mentors/${mentor._id}`)}
                className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnnouncements = () => {
    const [newAnnouncement, setNewAnnouncement] = useState({
      title: '',
      content: '',
      priority: 'medium',
    });
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    const handleCreateAnnouncement = async (e) => {
      e.preventDefault();
      try {
        const created = await api.createAnnouncement(hackathonId, newAnnouncement, token);
        setHackathon((prevHackathon) => ({
          ...prevHackathon,
          announcements: [...(prevHackathon.announcements || []), created],
        }));
        setNewAnnouncement({ title: '', content: '', priority: 'medium' }); // Clear form
        alert('Announcement created successfully!');
      } catch (error) {
        console.error("Error creating announcement:", error);
        alert('Failed to create announcement.');
      }
    };

    const handleUpdateAnnouncement = async (e) => {
      e.preventDefault();
      try {
        const updated = await api.updateAnnouncement(hackathonId, editingAnnouncement._id, editingAnnouncement, token);
        setHackathon((prevHackathon) => ({
          ...prevHackathon,
          announcements: prevHackathon.announcements.map((ann) =>
            ann._id === updated._id ? updated : ann
          ),
        }));
        setEditingAnnouncement(null); // Close edit form
        alert('Announcement updated successfully!');
      } catch (error) {
        console.error("Error updating announcement:", error);
        alert('Failed to update announcement.');
      }
    };

    const handleDeleteAnnouncement = async (announcementId) => {
      if (window.confirm('Are you sure you want to delete this announcement?')) {
        try {
          await api.deleteAnnouncement(hackathonId, announcementId, token);
          setHackathon((prevHackathon) => ({
            ...prevHackathon,
            announcements: prevHackathon.announcements.filter(
              (ann) => ann._id !== announcementId
            ),
          }));
          alert('Announcement deleted successfully!');
        } catch (error) {
          console.error("Error deleting announcement:", error);
          alert('Failed to delete announcement.');
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-text">Announcements ({hackathon.announcements ? hackathon.announcements.length : 0})</h3>
          <button 
            onClick={() => setEditingAnnouncement({ _id: 'new', title: '', content: '', priority: 'medium' })}
            className="btn bg-primary text-white px-4 py-2 rounded-lg"
          >
            Create Announcement
          </button>
        </div>

        {/* Create/Edit Announcement Form */}
        {(editingAnnouncement || editingAnnouncement && editingAnnouncement._id === 'new') && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h4 className="text-lg font-semibold text-text mb-4">
              {editingAnnouncement._id === 'new' ? 'Create New Announcement' : 'Edit Announcement'}
            </h4>
            <form onSubmit={editingAnnouncement._id === 'new' ? handleCreateAnnouncement : handleUpdateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Title</label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Content</label>
                <textarea
                  value={editingAnnouncement.content}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Priority</label>
                <select
                  value={editingAnnouncement.priority}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, priority: e.target.value })}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-2 transition-colors">
                  {editingAnnouncement._id === 'new' ? 'Create' : 'Save Changes'}
                </button>
                <button 
                  type="button"
                  onClick={() => setEditingAnnouncement(null)}
                  className="bg-transparent border border-border text-text px-6 py-3 rounded-lg font-semibold hover:border-primary-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {hackathon.announcements && hackathon.announcements.length > 0 ? (
            hackathon.announcements.map((announcement) => (
              <div key={announcement._id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-text">{announcement.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    announcement.priority === 'high' 
                      ? 'bg-red-500/20 text-red-400'
                      : announcement.priority === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="text-muted text-sm mb-3">{announcement.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">Created: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingAnnouncement(announcement)}
                      className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-2 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteAnnouncement(announcement._id)}
                      className="px-3 py-1 bg-transparent border border-border text-text rounded-lg text-xs font-semibold hover:border-primary-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No announcements yet.</p>
          )}
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    const [editHackathonData, setEditHackathonData] = useState({
      name: hackathon.name,
      description: hackathon.description,
      startDate: hackathon.startDate.substring(0, 10),
      endDate: hackathon.endDate.substring(0, 10),
      // Add other fields that can be edited
    });

    const handleSettingChange = (e) => {
      setEditHackathonData({ ...editHackathonData, [e.target.name]: e.target.value });
    };

    const handleSaveSettings = async () => {
      try {
        await api.updateHackathon(hackathonId, editHackathonData, token);
        setHackathon({ ...hackathon, ...editHackathonData }); // Optimistically update UI
        alert('Hackathon settings updated successfully!');
      } catch (error) {
        console.error("Error updating hackathon settings:", error);
        alert('Failed to update hackathon settings.');
      }
    };

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-text">Hackathon Settings</h3>
        <div className="bg-card border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text mb-4">General Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Hackathon Name</label>
              <input
                type="text"
                name="name"
                value={editHackathonData.name}
                onChange={handleSettingChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Description</label>
              <textarea
                name="description"
                value={editHackathonData.description}
                onChange={handleSettingChange}
                rows={4}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={editHackathonData.startDate}
                  onChange={handleSettingChange}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={editHackathonData.endDate}
                  onChange={handleSettingChange}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleSaveSettings}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-2 transition-colors"
            >
              Save Changes
            </button>
            <button className="bg-transparent border border-border text-text px-6 py-3 rounded-lg font-semibold hover:border-primary-300 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {!hackathonId ? (
        // Create New Hackathon Form
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-text mb-6 text-center">Create New Hackathon</h1>
          <form onSubmit={handleCreateHackathon} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-text mb-2">Hackathon Name</label>
              <input type="text" id="name" name="name" value={hackathonFormData.name} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-text mb-2">Description</label>
              <textarea id="description" name="description" value={hackathonFormData.description} onChange={handleHackathonFormChange} rows="4" className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" required></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-text mb-2">Start Date</label>
                <input type="date" id="startDate" name="startDate" value={hackathonFormData.startDate} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" required />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-semibold text-text mb-2">End Date</label>
                <input type="date" id="endDate" name="endDate" value={hackathonFormData.endDate} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" required />
              </div>
            </div>
            <div>
              <label htmlFor="registrationDeadline" className="block text-sm font-semibold text-text mb-2">Registration Deadline</label>
              <input type="date" id="registrationDeadline" name="registrationDeadline" value={hackathonFormData.registrationDeadline} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label htmlFor="mode" className="block text-sm font-semibold text-text mb-2">Mode</label>
              <select id="mode" name="mode" value={hackathonFormData.mode} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label htmlFor="maxTeamSize" className="block text-sm font-semibold text-text mb-2">Max Team Size</label>
              <input type="number" id="maxTeamSize" name="maxTeamSize" value={hackathonFormData.maxTeamSize} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label htmlFor="prizePool" className="block text-sm font-semibold text-text mb-2">Prize Pool (USD)</label>
              <input type="number" id="prizePool" name="prizePool" value={hackathonFormData.prizePool} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label htmlFor="technologyStack" className="block text-sm font-semibold text-text mb-2">Technology Stack (comma-separated)</label>
              <input type="text" id="technologyStack" name="technologyStack" value={hackathonFormData.technologyStack} onChange={handleHackathonFormChange} className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary" placeholder="e.g., React, Node.js, AI/ML" />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center mb-4 relative">
              <label htmlFor="hackathonImage" className="block mb-2 font-medium">Hackathon Image</label>
              <div className="w-32 h-32 border-2 border-primary rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 relative">
                {hackathonImagePreview ? (
                  <img src={hackathonImagePreview} alt="Hackathon Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-3xl">🖼️</span>
                )}
                <input
                  type="file"
                  id="hackathonImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-2 transition-colors">
              Create Hackathon
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => navigate('/organizer/hackathons')}
                  className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
                >
                  ←
                </button>
                <h1 className="text-4xl font-bold text-text">{hackathon.name} Management</h1>
              </div>
              <p className="text-muted">Manage teams, judges, mentors, and settings</p>
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                hackathon.status === 'Active' 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              }`}>
                {hackathon.status}
              </span>
              <Link
                to={`/organizer/hackathons/${hackathon.id}/analytics`}
                className="btn bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span>📊</span>
                <span>Analytics</span>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-bg-elev text-text hover:bg-bg-elev/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'teams' && renderTeams()}
            {activeTab === 'judges' && renderJudges()}
            {activeTab === 'mentors' && renderMentors()}
            {activeTab === 'announcements' && renderAnnouncements()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </>
      )}
    </main>
  );
}
