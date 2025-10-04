import React, { useState } from 'react';

export default function ViewSubmissionModal({ isOpen, onClose, evaluation }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !evaluation) return null;

  const handleDownload = (attachment) => {
    // Create a mock download functionality
    const fileName = attachment.name || attachment;
    const fileSize = attachment.size || 'Unknown size';
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be the actual file URL
    link.download = fileName;
    
    // Show download notification
    alert(`Downloading ${fileName} (${fileSize})...`);
    
    // In a real application, you would trigger the actual download here
    console.log('Downloading file:', fileName);
  };

  const handlePreview = (attachment) => {
    const fileName = attachment.name || attachment;
    const fileType = attachment.type || 'unknown';
    
    // Show preview based on file type
    if (fileType === 'pdf' || fileName.includes('.pdf')) {
      alert(`Opening PDF preview for ${fileName}`);
    } else if (fileType === 'video' || fileName.includes('.mp4')) {
      alert(`Opening video player for ${fileName}`);
    } else if (fileType === 'docx' || fileName.includes('.docx')) {
      alert(`Opening document preview for ${fileName}`);
    } else {
      alert(`Preview not available for ${fileName}`);
    }
    
    console.log('Previewing file:', fileName);
  };

  // Ensure all required properties exist with default values
  const safeEvaluation = {
    projectName: evaluation.projectName || 'AI-Powered Healthcare App',
    teamName: evaluation.teamName || 'TechTitans',
    hackathon: evaluation.hackathon || 'AI Innovation Challenge 2024',
    description: evaluation.description || 'An innovative AI-powered mobile application designed to assist healthcare professionals in diagnosing diseases earlier and more accurately. It leverages machine learning models to analyze patient data, predict potential health risks, and provide personalized recommendations. The app aims to streamline clinical workflows, reduce diagnostic errors, and improve patient outcomes through intelligent insights and user-friendly interfaces. Key features include symptom checker, personalized health insights, secure patient data management, and integration with wearable devices.',
    technologies: evaluation.technologies || ['React Native', 'Python', 'TensorFlow', 'Node.js', 'MongoDB', 'AWS Sagemaker'],
    teamMembers: evaluation.teamMembers || [
      { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'SC' },
      { name: 'Mike Johnson', role: 'AI/ML Engineer', avatar: 'MJ' },
      { name: 'Emma Davis', role: 'UI/UX Designer', avatar: 'ED' },
      { name: 'Alex Kim', role: 'Backend Engineer', avatar: 'AK' }
    ],
    attachments: evaluation.attachments || [
      { name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB' },
      { name: 'Technical Documentation.docx', type: 'docx', size: '1.8 MB' },
      { name: 'Demo Video.mp4', type: 'video', size: '45.2 MB' },
      { name: 'Source Code.zip', type: 'zip', size: '12.3 MB' }
    ],
    submittedDate: evaluation.submittedDate || 'Dec 15, 2024',
    dueDate: evaluation.dueDate || 'Dec 20, 2024',
    priority: evaluation.priority || 'High',
    status: evaluation.status || 'Pending'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text">{safeEvaluation.projectName}</h2>
              <p className="text-muted">Team: {safeEvaluation.teamName} • {safeEvaluation.hackathon}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-muted hover:text-text transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 border-b border-border">
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'team', label: 'Team', icon: '👥' },
              { id: 'attachments', label: 'Attachments', icon: '📎' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted hover:text-text'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Description */}
              <div>
                <h3 className="text-lg font-bold text-text mb-3">Project Description</h3>
                <p className="text-muted leading-relaxed">{safeEvaluation.description}</p>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bg-elev border border-border rounded-xl p-4">
                  <h4 className="font-semibold text-text mb-3">Submission Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Submitted:</span>
                      <span className="text-text">{safeEvaluation.submittedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Due Date:</span>
                      <span className="text-text">{safeEvaluation.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Priority:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        safeEvaluation.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                        safeEvaluation.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {safeEvaluation.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                        safeEvaluation.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        safeEvaluation.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}>
                        {safeEvaluation.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-elev border border-border rounded-xl p-4">
                  <h4 className="font-semibold text-text mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {safeEvaluation.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text mb-4">Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {safeEvaluation.teamMembers.map((member, index) => (
                  <div key={index} className="bg-bg-elev border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {member.avatar || (member.name || member).split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-text">{member.name || member}</p>
                        <p className="text-sm text-muted">{member.role || 'Team Member'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {activeTab === 'attachments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-text mb-4">Project Attachments</h3>
              {safeEvaluation.attachments && safeEvaluation.attachments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safeEvaluation.attachments.map((attachment, index) => (
                  <div key={index} className="bg-bg-elev border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {attachment.type === 'pdf' || (attachment.name && attachment.name.includes('.pdf')) ? '📄' :
                           attachment.type === 'docx' || (attachment.name && attachment.name.includes('.docx')) ? '📝' :
                           attachment.type === 'video' || (attachment.name && attachment.name.includes('.mp4')) ? '🎥' :
                           attachment.type === 'zip' || (attachment.name && attachment.name.includes('.zip')) ? '📦' :
                           (attachment.name && attachment.name.includes('.sol')) ? '🔗' : '📎'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text text-sm">{attachment.name || attachment}</p>
                        <p className="text-xs text-muted">{attachment.size || 'Unknown size'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDownload(attachment)}
                        className="flex-1 px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-2 transition-colors"
                      >
                        Download
                      </button>
                      <button 
                        onClick={() => handlePreview(attachment)}
                        className="flex-1 px-3 py-1 bg-transparent border border-border text-text rounded-lg text-xs font-semibold hover:border-primary-300 transition-colors"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-bg-elev rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📎</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">No Attachments</h3>
                  <p className="text-muted">No files have been uploaded for this project yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-6 rounded-b-2xl">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

