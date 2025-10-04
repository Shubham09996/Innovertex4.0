import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import EvaluationModal from '../../components/Judge/EvaluationModal';
import ViewSubmissionModal from '../../components/Judge/ViewSubmissionModal';
import EvaluationCriteriaModal from '../../components/Judge/EvaluationCriteriaModal';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

export default function JudgeEvaluationsPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const token = localStorage.getItem('token');
        // For now, using mock data. In real implementation, you would fetch from API
        // const response = await api.getSubmissionsForEvaluation(hackathonId, token);
        
        // Mock data for demonstration
        setTimeout(() => {
          setEvaluations([
            {
              id: 1,
              submissionId: 'sub_123',
              teamName: 'TechTitans',
              projectName: 'AI-Powered Healthcare App',
              hackathon: 'AI Innovation Challenge 2024',
              status: 'Pending',
              dueDate: 'Dec 20, 2024',
              priority: 'High',
              submittedDate: 'Dec 15, 2024',
              teamMembers: ['Sarah Chen', 'Mike Johnson', 'Emma Davis', 'Alex Kim'],
              technologies: ['React', 'Node.js', 'AI/ML', 'Python'],
              description: 'An innovative AI-powered mobile application designed to assist healthcare professionals in diagnosing diseases earlier and more accurately.',
              attachments: ['Project Proposal.pdf', 'Technical Documentation.docx', 'Demo Video.mp4']
            },
            {
              id: 2,
              submissionId: 'sub_124',
              teamName: 'DataDrivers',
              projectName: 'Smart Analytics Dashboard',
              hackathon: 'Web3 Development Hackathon',
              status: 'In Progress',
              dueDate: 'Dec 18, 2024',
              priority: 'Medium',
              submittedDate: 'Dec 12, 2024',
              teamMembers: ['John Smith', 'Lisa Wang', 'David Lee'],
              technologies: ['Vue.js', 'Python', 'D3.js', 'Blockchain'],
              description: 'A comprehensive analytics dashboard for blockchain data visualization and insights.',
              attachments: ['Project Proposal.pdf', 'Demo Video.mp4']
            },
            {
              id: 3,
              submissionId: 'sub_125',
              teamName: 'CodeCrafters',
              projectName: 'Blockchain Voting System',
              hackathon: 'Fintech Revolution',
              status: 'Completed',
              dueDate: 'Dec 16, 2024',
              priority: 'Low',
              submittedDate: 'Dec 10, 2024',
              teamMembers: ['Anna Brown', 'Tom Wilson', 'Maria Garcia'],
              technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum'],
              description: 'A secure and transparent voting system built on blockchain technology.',
              attachments: ['Project Proposal.pdf', 'Technical Documentation.docx', 'Smart Contract.sol']
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching evaluations:', error);
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  const filteredEvaluations = evaluations.filter(evaluation => {
    if (filter === 'all') return true;
    return evaluation.status.toLowerCase() === filter.toLowerCase();
  });

  const handleEvaluate = (evaluation) => {
    console.log('Evaluate button clicked:', evaluation);
    setSelectedEvaluation(evaluation);
    setShowEvaluationModal(true);
  };

  const handleView = (evaluation) => {
    console.log('View button clicked:', evaluation);
    setSelectedEvaluation(evaluation);
    setShowViewModal(true);
  };

  const handleViewCriteria = (evaluation) => {
    console.log('View Criteria button clicked:', evaluation);
    setSelectedEvaluation(evaluation);
    setShowCriteriaModal(true);
  };

  const handleSaveEvaluation = (evaluationData) => {
    console.log('Saving evaluation:', evaluationData);
    // Here you would typically save to backend
    alert('Evaluation saved successfully!');
  };

  const handleCloseModals = () => {
    setShowEvaluationModal(false);
    setShowViewModal(false);
    setShowCriteriaModal(false);
    setSelectedEvaluation(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <main className="flex-grow container mx-auto p-4 pt-24">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Evaluations</h1>
          <p className="text-muted">Review and evaluate team submissions</p>
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
            📊 Bulk Evaluation
          </button>
          <button className="px-4 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
            📋 Export Results
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        {['all', 'pending', 'in progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-3 rounded-lg font-semibold transition-all capitalize ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-bg-elev text-text hover:bg-bg-elev/80'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Evaluations List */}
      <div className="space-y-6">
        {filteredEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-text mb-2">{evaluation.projectName}</h3>
                <p className="text-lg text-muted mb-2">Team: {evaluation.teamName}</p>
                <p className="text-sm text-muted mb-4">{evaluation.hackathon}</p>
                <p className="text-muted leading-relaxed mb-4">{evaluation.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(evaluation.status)}`}>
                  {evaluation.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(evaluation.priority)}`}>
                  {evaluation.priority} Priority
                </span>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-text mb-2">Team Members</h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.teamMembers.map((member, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {member}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-text mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-bg-elev text-text rounded-full text-sm border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text mb-2">Attachments</h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.attachments.map((attachment, index) => (
                  <span key={index} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/30">
                    📎 {attachment}
                  </span>
                ))}
              </div>
            </div>

            {/* Submission Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div>
                <span className="text-muted">Submitted:</span>
                <span className="ml-2 text-text font-semibold">{evaluation.submittedDate}</span>
              </div>
              <div>
                <span className="text-muted">Due Date:</span>
                <span className="ml-2 text-text font-semibold">{evaluation.dueDate}</span>
              </div>
              <div>
                <span className="text-muted">Priority:</span>
                <span className="ml-2 text-text font-semibold">{evaluation.priority}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => handleEvaluate(evaluation)}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors"
              >
                📝 Evaluate
              </button>
              <button 
                onClick={() => handleView(evaluation)}
                className="px-6 py-2 bg-transparent border border-border text-text rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors"
              >
                📋 View Submission
              </button>
              <button 
                onClick={() => handleViewCriteria(evaluation)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                📊 Evaluation Criteria
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvaluations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-bg-elev rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">No evaluations found</h3>
          <p className="text-muted mb-6">No submissions match your current filter criteria.</p>
          <button 
            onClick={() => setFilter('all')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-2 transition-colors"
          >
            View All Evaluations
          </button>
        </div>
      )}

      {/* Modals */}
      {showEvaluationModal && (
        <EvaluationModal
          isOpen={showEvaluationModal}
          onClose={handleCloseModals}
          evaluation={selectedEvaluation}
          onSave={handleSaveEvaluation}
        />
      )}

      {showViewModal && (
        <ViewSubmissionModal
          isOpen={showViewModal}
          onClose={handleCloseModals}
          evaluation={selectedEvaluation}
        />
      )}

      {showCriteriaModal && (
        <EvaluationCriteriaModal
          isOpen={showCriteriaModal}
          onClose={handleCloseModals}
          evaluation={selectedEvaluation}
          onStartEvaluation={handleEvaluate}
        />
      )}
    </main>
  );
}
