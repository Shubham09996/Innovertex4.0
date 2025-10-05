import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Import api
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function CreateHackathonPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    mode: 'Online',
    technology: [],
    eligibility: 'Everyone',
    teamSize: { min: 1, max: 4 },
    prize: '',
    rules: '',
    judgingCriteria: '',
    faq: []
  });
  const [hackathonImageFile, setHackathonImageFile] = useState(null);
  const [hackathonImagePreview, setHackathonImagePreview] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const technologyOptions = [
    'AI/ML', 'Web Development', 'Mobile Development', 'Blockchain', 'IoT',
    'Data Science', 'Cybersecurity', 'Cloud Computing', 'AR/VR', 'DevOps'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      technology: prev.technology.includes(tech)
        ? prev.technology.filter(t => t !== tech)
        : [...prev.technology, tech]
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const dataToSend = new FormData();
    for (const key in formData) {
        if (key === 'technology') {
            formData[key].forEach(tech => dataToSend.append('technologyStack', tech));
        } else if (key === 'teamSize') {
            dataToSend.append('maxTeamSize', formData[key].max);
        } else if (key === 'prize') {
            // Assuming prize is a string, backend expects a number, so parse it
            dataToSend.append('prizePool', parseFloat(formData[key].replace(/[^\d.]/g, '')) || 0);
        } else if (key === 'startDate' || key === 'endDate' || key === 'registrationDeadline') {
            // Convert datetime-local to ISO string if needed by backend, or send as is
            dataToSend.append(key, new Date(formData[key]).toISOString());
        } else if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
            dataToSend.append(key, formData[key]);
        }
    }
    if (hackathonImageFile) {
        dataToSend.append('image', hackathonImageFile);
    }

    try {
      const response = await api.createHackathon(dataToSend, token);
      console.log('Hackathon created:', response);
      navigate('/organizer/hackathons'); // Navigate to hackathon list or detail page
    } catch (error) {
      console.error("Error creating hackathon:", error);
      alert("Failed to create hackathon.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Hackathon details and description' },
    { number: 2, title: 'Image', description: 'Upload hackathon banner image' }, // New Step
    { number: 3, title: 'Schedule', description: 'Dates and timing' },
    { number: 4, title: 'Rules', description: 'Eligibility and guidelines' },
    { number: 5, title: 'Review', description: 'Review and Publish' }
  ];

  return (
    <main className="flex-grow container mx-auto p-4 pt-20 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Create New Hackathon</h1>
        <p className="text-muted">Set up your hackathon event in just a few steps</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step.number
                  ? 'bg-primary text-white'
                  : 'bg-bg-elev text-muted'
              }`}>
                {step.number}
              </div>
              <div className="ml-2">
                <div className={`font-semibold ${
                  currentStep >= step.number ? 'text-text' : 'text-muted'
                }`}>
                  {step.title}
                </div>
                <div className="text-sm text-muted line-clamp-2">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Hackathon Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter hackathon name"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your hackathon, its goals, and what participants will build"
                  rows={4}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Technology Stack
                </label>
                <div className="flex flex-wrap gap-2">
                  {technologyOptions.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleTechnologyToggle(tech)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        formData.technology.includes(tech)
                          ? 'bg-primary text-white'
                          : 'bg-bg-elev text-text hover:bg-bg-elev/80'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Mode *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Online', 'Offline', 'Hybrid'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleInputChange('mode', mode)}
                      className={`p-4 rounded-lg border text-center font-semibold transition-all ${
                        formData.mode === mode
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-bg-elev text-text hover:border-primary/30'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Image Upload */}
        {currentStep === 2 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-6">Upload Hackathon Image</h2>
            <div className="flex flex-col items-center mb-4 relative">
              <label htmlFor="hackathonImage" className="block mb-2 font-medium">Select Hackathon Banner Image</label>
              <div className="w-full max-w-lg h-48 border-2 border-primary rounded-lg overflow-hidden flex items-center justify-center bg-gray-200 relative cursor-pointer">
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
                  required // Make image upload mandatory
                />
              </div>
              <p className="text-sm text-muted mt-2">Click the box above to upload an image. (Recommended aspect ratio: 16:9)</p>
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-6">Schedule & Timing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Start Date *
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  End Date *
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  value={formData.registrationDeadline}
                  onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Prize Pool
                </label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) => handleInputChange('prize', e.target.value)}
                  placeholder="e.g., $10,000 or ₹5,00,000"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Rules */}
        {currentStep === 4 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-6">Rules & Guidelines</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Eligibility
                </label>
                <select
                  value={formData.eligibility}
                  onChange={(e) => handleInputChange('eligibility', e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Everyone">Everyone</option>
                  <option value="Students Only">Students Only</option>
                  <option value="Professionals Only">Professionals Only</option>
                  <option value="Students & Professionals">Students & Professionals</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Min Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.teamSize.min}
                    onChange={(e) => handleInputChange('teamSize', { ...formData.teamSize, min: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.teamSize.max}
                    onChange={(e) => handleInputChange('teamSize', { ...formData.teamSize, max: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Rules & Guidelines
                </label>
                <textarea
                  value={formData.rules}
                  onChange={(e) => handleInputChange('rules', e.target.value)}
                  placeholder="Define the rules, guidelines, and any specific requirements for your hackathon"
                  rows={4}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Judging Criteria
                </label>
                <textarea
                  value={formData.judgingCriteria}
                  onChange={(e) => handleInputChange('judgingCriteria', e.target.value)}
                  placeholder="Describe how projects will be evaluated (innovation, technical implementation, presentation, etc.)"
                  rows={4}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-6">Review & Publish</h2>
            
            <div className="space-y-6">
              <div className="bg-bg-elev rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text mb-2">{formData.name}</h3>
                <p className="text-muted mb-4">{formData.description}</p>
                {hackathonImagePreview && (
                  <img src={hackathonImagePreview} alt="Hackathon Thumbnail" className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-text">Mode:</span>
                    <span className="ml-2 text-muted">{formData.mode}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-text">Eligibility:</span>
                    <span className="ml-2 text-muted">{formData.eligibility}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-text">Team Size:</span>
                    <span className="ml-2 text-muted">{formData.teamSize.min}-{formData.teamSize.max} members</span>
                  </div>
                  <div>
                    <span className="font-semibold text-text">Prize:</span>
                    <span className="ml-2 text-muted">{formData.prize || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publish"
                  className="w-4 h-4 text-primary bg-bg border-border rounded focus:ring-primary"
                />
                <label htmlFor="publish" className="text-sm text-text">
                  Publish hackathon immediately after creation
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-transparent border border-border text-text rounded-lg font-semibold hover:border-primary-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                'Create Hackathon'
              )}
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
