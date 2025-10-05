import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Import api
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function SubmissionViewPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      if (!submissionId || !token) {
        setLoading(false);
        return;
      }
      try {
        // Assuming getSubmission can fetch by submissionId, or a new API is needed
        const data = await api.getSubmissionById(submissionId, token); // Need to create this API
        setSubmission(data);
        setGrade(data.grade || '');
        setFeedback(data.feedback || '');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submission details:", error);
        setError("Failed to fetch submission details.");
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [submissionId, token]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setError(null);

    if (!grade || !feedback) {
      setError('Grade and feedback are required.');
      return;
    }

    try {
      const reviewData = {
        grade: parseInt(grade),
        feedback,
        status: 'reviewed', // Mark as reviewed upon submission
      };
      // Need to create this API: api.updateSubmissionReview(submissionId, reviewData, token);
      const res = await api.updateSubmissionReview(submissionId, reviewData, token);
      setSubmission(res);
      alert('Submission reviewed successfully!');
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(error.message || 'Failed to submit review.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Submission Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="btn bg-primary text-white px-6 py-3 rounded-full"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto p-4 pt-24">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-bg-elev flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
        >
          ←
        </button>
        <h1 className="text-4xl font-bold text-text">Review Submission</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-text mb-4">Project Details</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-text">Team Name:</p>
              <p className="text-muted">{submission.team ? submission.team.name : 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold text-text">Hackathon:</p>
              <p className="text-muted">{submission.hackathon ? submission.hackathon.name : 'N/A'}</p>
            </div>
            <div>
              <p className="font-semibold text-text">Submission Link:</p>
              <a href={submission.codeLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {submission.codeLink}
              </a>
            </div>
            <div>
              <p className="font-semibold text-text">Submitted On:</p>
              <p className="text-muted">{new Date(submission.createdAt).toLocaleDateString()} {new Date(submission.createdAt).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="font-semibold text-text">Status:</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                submission.status === 'reviewed'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {submission.status}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text mt-8 mb-4">Review</h2>
          {submission.status === 'reviewed' ? (
            <div className="space-y-4 bg-bg-elev p-6 rounded-lg border border-border">
              <div>
                <p className="font-semibold text-text">Grade:</p>
                <p className="text-primary-2 text-xl font-bold">{submission.grade}/100</p>
              </div>
              <div>
                <p className="font-semibold text-text">Feedback:</p>
                <p className="text-muted">{submission.feedback}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label htmlFor="grade" className="block text-sm font-semibold text-text mb-2">Grade (0-100):</label>
                <input
                  type="number"
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-semibold text-text mb-2">Feedback:</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  required
                ></textarea>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-2 transition-colors"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-text mb-4">Evaluation Criteria</h2>
          <ul className="space-y-3 text-muted">
            <li>Innovation (30%)</li>
            <li>Technicality (30%)</li>
            <li>Design/UX (20%)</li>
            <li>Presentation (20%)</li>
          </ul>
          <p className="mt-6 text-sm text-yellow-500">* Ensure fair and constructive feedback.</p>
        </div>
      </div>
    </main>
  );
}
