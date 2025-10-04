import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EvaluationModal from '../../components/Judge/EvaluationModal';
import ViewSubmissionModal from '../../components/Judge/ViewSubmissionModal';

export default function JudgeDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvaluations: 0,
    pendingEvaluations: 0,
    completedEvaluations: 0,
    averageRating: 0
  });

  const [recentEvaluations, setRecentEvaluations] = useState([]);
  const [assignedTeams, setAssignedTeams] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalEvaluations: 156,
        pendingEvaluations: 12,
        completedEvaluations: 144,
        averageRating: 4.8
      });

      setRecentEvaluations([
        {
          id: 1,
          teamName: 'TechTitans',
          projectName: 'AI-Powered Healthcare App',
          hackathon: 'AI Innovation Challenge 2024',
          status: 'Pending',
          dueDate: 'Dec 20, 2024',
          priority: 'High'
        },
        {
          id: 2,
          teamName: 'DataDrivers',
          projectName: 'Smart Analytics Dashboard',
          hackathon: 'Web3 Development Hackathon',
          status: 'Completed',
          dueDate: 'Dec 18, 2024',
          priority: 'Medium'
        },
        {
          id: 3,
          teamName: 'CodeCrafters',
          projectName: 'Blockchain Voting System',
          hackathon: 'Fintech Revolution',
          status: 'In Progress',
          dueDate: 'Dec 22, 2024',
          priority: 'Low'
        }
      ]);

      setAssignedTeams([
        {
          id: 1,
          name: 'TechTitans',
          hackathon: 'AI Innovation Challenge 2024',
          members: 4,
          project: 'AI-Powered Healthcare App',
          status: 'Active',
          lastActivity: '2 hours ago'
        },
        {
          id: 2,
          name: 'DataDrivers',
          hackathon: 'Web3 Development Hackathon',
          members: 3,
          project: 'Smart Analytics Dashboard',
          status: 'Active',
          lastActivity: '5 hours ago'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleEvaluate = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowEvaluationModal(true);
  };

  const handleView = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowViewModal(true);
  };

  const handleSaveEvaluation = (evaluationData) => {
    console.log('Saving evaluation:', evaluationData);
    alert('Evaluation saved successfully!');
  };

  const handleCloseModals = () => {
    setShowEvaluationModal(false);
    setShowViewModal(false);
    setSelectedEvaluation(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Judge Dashboard</h1>
        <p className="text-muted">Manage evaluations and mentor teams</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Total Evaluations</p>
              <p className="text-3xl font-bold text-blue-400">{stats.totalEvaluations}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.pendingEvaluations}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-400">{stats.completedEvaluations}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted mb-1">Avg Rating</p>
              <p className="text-3xl font-bold text-purple-400">{stats.averageRating}/5</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Evaluations */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Recent Evaluations</h2>
            <Link 
              to="/judge/evaluations"
              className="text-primary hover:text-primary-2 transition-colors text-sm font-semibold"
            >
              View All →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="bg-bg-elev border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-text mb-1">{evaluation.projectName}</h3>
                    <p className="text-sm text-muted">Team: {evaluation.teamName}</p>
                    <p className="text-xs text-muted">{evaluation.hackathon}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(evaluation.status)}`}>
                      {evaluation.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(evaluation.priority)}`}>
                      {evaluation.priority}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Due: {evaluation.dueDate}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEvaluate(evaluation)}
                      className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-2 transition-colors"
                    >
                      Evaluate
                    </button>
                    <button 
                      onClick={() => handleView(evaluation)}
                      className="px-3 py-1 bg-transparent border border-border text-text rounded-lg text-xs font-semibold hover:border-primary-300 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Teams */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Assigned Teams</h2>
            <Link 
              to="/judge/mentorship"
              className="text-primary hover:text-primary-2 transition-colors text-sm font-semibold"
            >
              Manage All →
            </Link>
          </div>
          
          <div className="space-y-4">
            {assignedTeams.map((team) => (
              <div key={team.id} className="bg-bg-elev border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-text mb-1">{team.name}</h3>
                    <p className="text-sm text-muted">{team.project}</p>
                    <p className="text-xs text-muted">{team.hackathon}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(team.status)}`}>
                    {team.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>👥 {team.members} members</span>
                    <span>🕒 {team.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


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
    </main>
  );
}
