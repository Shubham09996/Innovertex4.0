import React, { useState, useContext } from 'react';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

export default function EvaluationModal({ isOpen, onClose, evaluation, onSave }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    innovationScore: 75,
    technicalScore: 70,
    impactScore: 80,
    presentationScore: 85,
    comments: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const evaluationData = {
        innovationScore: formData.innovationScore,
        technicalScore: formData.technicalScore,
        impactScore: formData.impactScore,
        presentationScore: formData.presentationScore,
        comments: formData.comments
      };

      const response = await api.evaluateSubmission(evaluation.submissionId, evaluationData, token);
      
      if (response.message) {
        alert('Evaluation submitted successfully!');
        onSave(formData);
        onClose();
      } else {
        alert('Error submitting evaluation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('Error submitting evaluation. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-2">Evaluate Submission</h2>
              <p className="text-white text-lg">Rate this project on the following criteria (0-100).</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-200"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Innovation & Creativity */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation & Creativity</h3>
              <p className="text-gray-400">How original and creative is this solution?</p>
            </div>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.innovationScore}
                onChange={(e) => handleInputChange('innovationScore', e.target.value)}
                className="flex-1 h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${formData.innovationScore}%, #ec4899 ${formData.innovationScore}%, #ec4899 100%)`
                }}
              />
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{formData.innovationScore}</span>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Technical Implementation</h3>
              <p className="text-gray-400">Quality of code, architecture, and technical execution</p>
            </div>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.technicalScore}
                onChange={(e) => handleInputChange('technicalScore', e.target.value)}
                className="flex-1 h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${formData.technicalScore}%, #ec4899 ${formData.technicalScore}%, #ec4899 100%)`
                }}
              />
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{formData.technicalScore}</span>
              </div>
            </div>
          </div>

          {/* Impact & Usefulness */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Impact & Usefulness</h3>
              <p className="text-gray-400">Real-world applicability and potential impact</p>
            </div>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.impactScore}
                onChange={(e) => handleInputChange('impactScore', e.target.value)}
                className="flex-1 h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${formData.impactScore}%, #ec4899 ${formData.impactScore}%, #ec4899 100%)`
                }}
              />
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{formData.impactScore}</span>
              </div>
            </div>
          </div>

          {/* Presentation & Demo */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Presentation & Demo</h3>
              <p className="text-gray-400">Quality of demo, documentation, and presentation</p>
            </div>
            <div className="flex items-center gap-6">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.presentationScore}
                onChange={(e) => handleInputChange('presentationScore', e.target.value)}
                className="flex-1 h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${formData.presentationScore}%, #ec4899 ${formData.presentationScore}%, #ec4899 100%)`
                }}
              />
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{formData.presentationScore}</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Additional Comments</h3>
              <p className="text-gray-400">Provide any additional feedback or notes</p>
            </div>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              placeholder="Enter your comments here..."
              className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 border-t border-gray-700 p-6 rounded-b-2xl">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              Submit Evaluation
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
