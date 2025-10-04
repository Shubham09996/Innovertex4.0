import React from 'react';

export default function AssignedTeams({ judgeOrMentor, hackathon }) {
  // Mock data for assigned teams based on judge/mentor
  const getAssignedTeams = (judgeOrMentor) => {
    if (judgeOrMentor?.role === 'Judge') {
      return [
        {
          id: 1,
          name: 'TechTitans',
          members: 4,
          project: 'AI-Powered Healthcare App',
          status: 'Active',
          progress: 75,
          lastActivity: '2 hours ago',
          submissionStatus: 'In Progress',
          score: 85
        },
        {
          id: 2,
          name: 'DataDrivers',
          members: 3,
          project: 'ML Fraud Detection System',
          status: 'Active',
          progress: 85,
          lastActivity: '1 hour ago',
          submissionStatus: 'In Progress',
          score: 78
        },
        {
          id: 3,
          name: 'InnovationHub',
          members: 5,
          project: 'IoT Smart Home Solution',
          status: 'Active',
          progress: 90,
          lastActivity: '30 minutes ago',
          submissionStatus: 'Submitted',
          score: 92
        }
      ];
    } else {
      return [
        {
          id: 1,
          name: 'TechTitans',
          members: 4,
          project: 'AI-Powered Healthcare App',
          status: 'Active',
          progress: 75,
          lastActivity: '2 hours ago',
          submissionStatus: 'In Progress',
          sessions: 3
        },
        {
          id: 2,
          name: 'CodeMasters',
          members: 3,
          project: 'Blockchain Voting System',
          status: 'Active',
          progress: 60,
          lastActivity: '1 hour ago',
          submissionStatus: 'In Progress',
          sessions: 2
        }
      ];
    }
  };

  const assignedTeams = getAssignedTeams(judgeOrMentor);

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSubmissionStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Not Started': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text">
          {judgeOrMentor?.role === 'Judge' ? 'Teams to Evaluate' : 'Teams to Mentor'}
        </h3>
        <span className="text-sm text-muted">
          {assignedTeams.length} team{assignedTeams.length !== 1 ? 's' : ''} assigned
        </span>
      </div>

      {assignedTeams.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h4 className="text-lg font-semibold text-text mb-2">No Teams Assigned</h4>
          <p className="text-muted">
            {judgeOrMentor?.role === 'Judge' 
              ? 'This judge has no teams assigned for evaluation'
              : 'This mentor has no teams assigned for guidance'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignedTeams.map((team) => (
            <div
              key={team.id}
              className="p-4 bg-bg-elev rounded-lg border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-text text-lg">{team.name}</h4>
                  <p className="text-sm text-muted">{team.project}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSubmissionStatusColor(team.submissionStatus)}`}>
                    {team.submissionStatus}
                  </span>
                  <span className="text-xs text-muted">{team.members} members</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted">Progress</span>
                  <span className="text-sm font-semibold text-text">{team.progress}%</span>
                </div>
                <div className="w-full bg-bg rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(team.progress)}`}
                    style={{ width: `${team.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-3">
                <span className="text-sm text-muted">Team Members:</span>
                <div className="flex -space-x-2 mt-1">
                  {Array.from({ length: team.members }, (_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-2 border-2 border-card flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Activity and Role-specific Info */}
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted">Last activity: {team.lastActivity}</span>
                  {judgeOrMentor?.role === 'Judge' && team.score && (
                    <span className="ml-3 text-primary font-semibold">Score: {team.score}/100</span>
                  )}
                  {judgeOrMentor?.role === 'Mentor' && team.sessions && (
                    <span className="ml-3 text-green-400 font-semibold">Sessions: {team.sessions}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {judgeOrMentor?.role === 'Judge' ? (
                    <button 
                      onClick={() => window.open(`/organizer/teams/${team.id}/submission/1`, '_blank')}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                    >
                      📋 View Submission
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25 transform hover:scale-105">
                      💬 Mentor Team
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors">
            {judgeOrMentor?.role === 'Judge' ? 'Bulk Evaluate' : 'Bulk Message'}
          </button>
          <button className="flex-1 bg-transparent border border-border text-text py-2 px-4 rounded-lg text-sm font-semibold hover:border-primary-300 transition-colors">
            View All Teams
          </button>
        </div>
      </div>
    </div>
  );
}
