import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditHackathonPage() {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hackathon, setHackathon] = useState(null);

  // Mock data for hackathon to edit
  const hackathonData = {
    id: hackathonId,
    name: 'AI Innovation Challenge 2024',
    description: 'Build innovative AI solutions for real-world problems. This hackathon focuses on creating practical AI applications that can make a real impact in various industries.',
    status: 'Active',
    startDate: '2024-12-15',
    endDate: '2024-12-20',
    registrationDeadline: '2024-12-14',
    mode: 'Online',
    location: 'Virtual Event',
    technologyStack: ['AI/ML', 'Python', 'TensorFlow', 'React'],
    prizePool: 10000,
    maxTeamSize: 4,
    minTeamSize: 1,
    eligibility: 'Students and Professionals',
    rules: [
      'All code must be written during the hackathon period',
      'Teams can have 1-4 members',
      'Submissions must include a working prototype',
      'No plagiarism or pre-existing code allowed'
    ],
    judgingCriteria: [
      'Innovation and Creativity (30%)',
      'Technical Implementation (25%)',
      'User Experience (20%)',
      'Business Viability (15%)',
      'Presentation (10%)'
    ],
    requirements: [
      'Working prototype or demo',
      'Source code on GitHub',
      'Presentation slides (max 10 slides)',
      '2-minute demo video'
    ]
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    mode: 'Online',
    location: '',
    technologyStack: [],
    prizePool: '',
    maxTeamSize: 4,
    minTeamSize: 1,
    eligibility: '',
    rules: [],
    judgingCriteria: [],
    requirements: []
  });

  const [newRule, setNewRule] = useState('');
  const [newCriteria, setNewCriteria] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newTech, setNewTech] = useState('');

  const technologyOptions = [
    'AI/ML', 'Python', 'TensorFlow', 'React', 'Node.js', 'JavaScript',
    'Blockchain', 'Solidity', 'Web3', 'MongoDB', 'PostgreSQL', 'Docker',
    'Kubernetes', 'AWS', 'Azure', 'GCP', 'Flutter', 'React Native',
    'Vue.js', 'Angular', 'Django', 'Flask', 'Express.js', 'GraphQL'
  ];

  useEffect(() => {
    // Simulate API call to fetch hackathon data
    setTimeout(() => {
      setHackathon(hackathonData);
      setFormData({
        name: hackathonData.name,
        description: hackathonData.description,
        startDate: hackathonData.startDate,
        endDate: hackathonData.endDate,
        registrationDeadline: hackathonData.registrationDeadline,
        mode: hackathonData.mode,
        location: hackathonData.location,
        technologyStack: [...hackathonData.technologyStack],
        prizePool: hackathonData.prizePool,
        maxTeamSize: hackathonData.maxTeamSize,
        minTeamSize: hackathonData.minTeamSize,
        eligibility: hackathonData.eligibility,
        rules: [...hackathonData.rules],
        judgingCriteria: [...hackathonData.judgingCriteria],
        requirements: [...hackathonData.requirements]
      });
      setLoading(false);
    }, 1000);
  }, [hackathonId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setFormData(prev => ({
        ...prev,
        rules: [...prev.rules, newRule.trim()]
      }));
      setNewRule('');
    }
  };

  const handleRemoveRule = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handleAddCriteria = () => {
    if (newCriteria.trim()) {
      setFormData(prev => ({
        ...prev,
        judgingCriteria: [...prev.judgingCriteria, newCriteria.trim()]
      }));
      setNewCriteria('');
    }
  };

  const handleRemoveCriteria = (index) => {
    setFormData(prev => ({
      ...prev,
      judgingCriteria: prev.judgingCriteria.filter((_, i) => i !== index)
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleAddTech = () => {
    if (newTech.trim() && !formData.technologyStack.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologyStack: [...prev.technologyStack, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologyStack: prev.technologyStack.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Hackathon updated successfully!');
      navigate('/organizer/hackathons');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
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
            <h1 className="text-4xl font-bold text-text">Edit Hackathon</h1>
          </div>
          <p className="text-muted">Update hackathon details and settings</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <button
            onClick={() => navigate('/organizer/hackathons')}
            className="px-6 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Hackathon Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Prize Pool ($) *</label>
              <input
                type="number"
                name="prizePool"
                value={formData.prizePool}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-text mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Registration Deadline *</label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Event Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Mode *</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter location or 'Virtual Event'"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Min Team Size *</label>
              <input
                type="number"
                name="minTeamSize"
                value={formData.minTeamSize}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Max Team Size *</label>
              <input
                type="number"
                name="maxTeamSize"
                value={formData.maxTeamSize}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-text mb-2">Eligibility *</label>
              <input
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="e.g., Students and Professionals"
                required
              />
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Technology Stack</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <select
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-1 px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              >
                <option value="">Select Technology</option>
                {technologyOptions.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddTech}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologyStack.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="text-primary hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Rules</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Add a new rule"
                className="flex-1 px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                Add Rule
              </button>
            </div>
            <div className="space-y-2">
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
                  <span className="text-text flex-1">{rule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Judging Criteria */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Judging Criteria</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCriteria}
                onChange={(e) => setNewCriteria(e.target.value)}
                placeholder="Add judging criteria (e.g., Innovation - 30%)"
                className="flex-1 px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddCriteria}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                Add Criteria
              </button>
            </div>
            <div className="space-y-2">
              {formData.judgingCriteria.map((criteria, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
                  <span className="text-text flex-1">{criteria}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCriteria(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Requirements */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Submission Requirements</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add submission requirement"
                className="flex-1 px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddRequirement}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                Add Requirement
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-bg-elev rounded-lg">
                  <span className="text-text flex-1">{requirement}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate('/organizer/hackathons')}
            className="px-8 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
