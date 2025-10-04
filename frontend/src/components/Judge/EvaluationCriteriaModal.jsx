import React from 'react';

export default function EvaluationCriteriaModal({ isOpen, onClose, evaluation, onStartEvaluation }) {
  if (!isOpen) return null;

  // Mock evaluation criteria data - in real app, this would come from hackathon settings
  const criteria = [
    {
      name: "Innovation & Creativity",
      weight: 25,
      description: "How original and creative is this solution?",
      maxScore: 100,
      details: [
        "Uniqueness of the approach",
        "Creative problem-solving",
        "Novel use of technology",
        "Out-of-the-box thinking"
      ]
    },
    {
      name: "Technical Implementation",
      weight: 30,
      description: "Quality of code, architecture, and technical execution",
      maxScore: 100,
      details: [
        "Code quality and structure",
        "Technical architecture",
        "Performance optimization",
        "Security considerations",
        "Scalability and maintainability"
      ]
    },
    {
      name: "Impact & Usefulness",
      weight: 25,
      description: "Real-world applicability and potential impact",
      maxScore: 100,
      details: [
        "Market potential",
        "User value proposition",
        "Social impact",
        "Business viability",
        "Target audience clarity"
      ]
    },
    {
      name: "Presentation & Demo",
      weight: 20,
      description: "Quality of demo, documentation, and presentation",
      maxScore: 100,
      details: [
        "Demo quality and functionality",
        "Documentation completeness",
        "Presentation skills",
        "Visual design and UX",
        "Communication clarity"
      ]
    }
  ];

  const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-2">Evaluation Criteria</h2>
              <p className="text-white text-lg">
                {evaluation?.hackathon || 'Hackathon'} - Scoring Guidelines
              </p>
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
          {/* Overview */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">📊 Scoring Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Possible Score</p>
                <p className="text-3xl font-bold text-purple-400">400 points</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Evaluation Method</p>
                <p className="text-lg text-white">Weighted Scoring (0-100 per criterion)</p>
              </div>
            </div>
          </div>

          {/* Criteria Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">🎯 Evaluation Criteria</h3>
            
            {criteria.map((criterion, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{criterion.name}</h4>
                    <p className="text-gray-400 mb-3">{criterion.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {criterion.weight}% Weight
                    </div>
                    <div className="text-2xl font-bold text-white mt-2">
                      {criterion.maxScore} pts
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="text-lg font-semibold text-gray-300 mb-3">Evaluation Points:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {criterion.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <span className="text-purple-400">•</span>
                        <span className="text-gray-300 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scoring Guidelines */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">📝 Scoring Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">90-100: Excellent</h4>
                <p className="text-gray-300">Outstanding work that exceeds expectations</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">70-89: Good</h4>
                <p className="text-gray-300">Solid work that meets most expectations</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">50-69: Fair</h4>
                <p className="text-gray-300">Adequate work with room for improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 border-t border-gray-700 p-6 rounded-b-2xl">
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-all duration-200"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onStartEvaluation) {
                  onStartEvaluation(evaluation);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              Start Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
