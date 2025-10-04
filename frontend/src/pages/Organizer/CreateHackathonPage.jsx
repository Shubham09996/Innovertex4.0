import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateHackathonPage() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/organizer/hackathons');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Hackathon details and description' },
    { number: 2, title: 'Schedule', description: 'Dates and timing' },
    { number: 3, title: 'Rules', description: 'Eligibility and guidelines' },
    { number: 4, title: 'Review', description: 'Final review and publish' }
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
              <div className="ml-3 hidden sm:block">
                <div className={`font-semibold ${
                  currentStep >= step.number ? 'text-text' : 'text-muted'
                }`}>
                  {step.title}
                </div>
                <div className="text-sm text-muted">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
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

        {/* Step 2: Schedule */}
        {currentStep === 2 && (
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

        {/* Step 3: Rules */}
        {currentStep === 3 && (
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

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-text mb-6">Review & Publish</h2>
            
            <div className="space-y-6">
              <div className="bg-bg-elev rounded-lg p-4">
                <h3 className="text-lg font-semibold text-text mb-2">{formData.name}</h3>
                <p className="text-muted mb-4">{formData.description}</p>
                
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

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
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
