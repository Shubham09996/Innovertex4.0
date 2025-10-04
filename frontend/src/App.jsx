import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import LandingPage from './pages/LandingPage'
import FeaturesPage from './pages/FeaturesPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Particles from './components/Particles'; // Import Particles component
import OAuthCallback from './pages/Auth/OAuthCallback.jsx'; // Import the new component
import ParticipantDashboardPage from './pages/Participant/ParticipantDashboardPage';
import HackathonsPage from './pages/Participant/HackathonsPage';
import MyHackathonsPage from './pages/Participant/MyHackathonsPage';
import TeamPage from './pages/Participant/TeamPage';
import ProfilePage from './pages/Participant/ProfilePage';
import LeaderboardPage from './pages/Participant/LeaderboardPage';
import HackathonDetailPage from './pages/Participant/HackathonDetailPage';
import WorkspacePage from './pages/Participant/WorkspacePage';
import ParticipantNavBar from './components/Participant/ParticipantNavBar'; // Import ParticipantNavBar
import OrganizerNavBar from './components/Organizer/OrganizerNavBar'; // Import OrganizerNavBar
import JudgeNavBar from './components/Judge/JudgeNavBar'; // Import JudgeNavBar
import WinnersGalleryPage from './pages/WinnersGallery'; // Import WinnersGalleryPage as named export
import CommunityPage from './pages/CommunityPage'; // Import CommunityPage
import AboutPage from './pages/AboutPage'; // Import AboutPage
import OrganizerDashboardPage from './pages/Organizer/OrganizerDashboardPage';
import OrganizerHackathonsPage from './pages/Organizer/HackathonsPage';
import CreateHackathonPage from './pages/Organizer/CreateHackathonPage';
import AnalyticsPage from './pages/Organizer/AnalyticsPage';
import ParticipantsPage from './pages/Organizer/ParticipantsPage';
import JudgesPage from './pages/Organizer/JudgesPage';
import MentorsPage from './pages/Organizer/MentorsPage';
import HackathonAnalyticsPage from './pages/Organizer/HackathonAnalyticsPage';
import HackathonManagementPage from './pages/Organizer/HackathonManagementPage';
import EditHackathonPage from './pages/Organizer/EditHackathonPage';
import SubmissionViewPage from './pages/Organizer/SubmissionViewPage';
import AnnouncementsPage from './pages/Organizer/AnnouncementsPage';
import OrganizerJudgeProfilePage from './pages/Organizer/JudgeProfilePage';
import MentorProfilePage from './pages/Organizer/MentorProfilePage';
import OrganizerProfilePage from './pages/Organizer/OrganizerProfilePage';
import JudgeProfilePage from './pages/Judge/JudgeProfilePage';
import JudgeDashboardPage from './pages/Judge/JudgeDashboardPage';
import JudgeEvaluationsPage from './pages/Judge/JudgeEvaluationsPage';
import JudgeMentorshipPage from './pages/Judge/JudgeMentorshipPage';
import JudgeAnalyticsPage from './pages/Judge/JudgeAnalyticsPage';
import ContactPage from './pages/ContactPage'; // Import ContactPage
import GlobalLeaderboardPage from './pages/GlobalLeaderboardPage'; // Import GlobalLeaderboardPage

function AuthLayout({ children, theme, onToggleTheme }) {
  return (
    <div className="page">
      <Particles />
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow pt-[100px] pb-[100px] flex justify-center items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function ParticipantLayout({ children, theme, onToggleTheme }) {
  return (
    <div className="page">
      <Particles />
      <ParticipantNavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow flex justify-center items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function OrganizerLayout({ children, theme, onToggleTheme }) {
  return (
    <div className="page bg-bg">
      <OrganizerNavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function JudgeLayout({ children, theme, onToggleTheme }) {
  return (
    <div className="page bg-bg">
      <JudgeNavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hv-theme')
    if (saved) return saved
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    return prefersLight ? 'light' : 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
    localStorage.setItem('hv-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <Routes>
      <Route path="/" element={
        <div className="page">
          <Particles />
          <NavBar theme={theme} onToggleTheme={toggleTheme} />
          <LandingPage theme={theme} onToggleTheme={toggleTheme} />
          <Footer />
        </div>
      } />
      <Route path="/features" element={
        <div className="page">
          <Particles />
          <NavBar theme={theme} onToggleTheme={toggleTheme} />
          <FeaturesPage theme={theme} onToggleTheme={toggleTheme} />
          <Footer />
        </div>
      } />
      <Route path="/winners-gallery" element={
        <div className="page bg-bg">
          <Particles />
          <NavBar theme={theme} onToggleTheme={toggleTheme} />
          <WinnersGalleryPage />
          <Footer />
        </div>
      } />
      <Route path="/community" element={
        <div className="page">
          <Particles />
          <NavBar theme={theme} onToggleTheme={toggleTheme} />
          <CommunityPage />
          <Footer />
        </div>
      } />
      <Route path="/login" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><Login /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><Signup /></AuthLayout>} />
      <Route path="/about" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><AboutPage /></AuthLayout>} />
      <Route path="/contact" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><ContactPage /></AuthLayout>} />
      <Route path="/auth/oauth-callback" element={
        <div className="page">
          <Particles />
          <OAuthCallback />
        </div>
      } />
      <Route path="/dashboard" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><ParticipantDashboardPage /></ParticipantLayout>} />
      <Route path="/hackathons" element={
        <div className="page">
          <Particles />
          <NavBar theme={theme} onToggleTheme={toggleTheme} />
          <HackathonsPage />
          <Footer />
        </div>
      } />
      <Route path="/participant/community" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><CommunityPage /></ParticipantLayout>} />
      <Route path="/participant/my-hackathons" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><MyHackathonsPage /></ParticipantLayout>} />
      <Route path="/participant/team" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><TeamPage /></ParticipantLayout>} />
      <Route path="/participant/profile" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><ProfilePage /></ParticipantLayout>} />
      <Route path="/participant/global-leaderboard" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><GlobalLeaderboardPage /></ParticipantLayout>} />
      <Route path="/participant/hackathons/:id" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><HackathonDetailPage /></ParticipantLayout>} />
      <Route path="/participant/workspace/:id" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><WorkspacePage /></ParticipantLayout>} />
      
      {/* Organizer Routes */}
      <Route path="/organizer/dashboard" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><OrganizerDashboardPage /></OrganizerLayout>} />
      <Route path="/organizer/hackathons" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><OrganizerHackathonsPage /></OrganizerLayout>} />
      <Route path="/organizer/hackathons/create" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><CreateHackathonPage /></OrganizerLayout>} />
      <Route path="/organizer/analytics" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><AnalyticsPage /></OrganizerLayout>} />
      <Route path="/organizer/participants" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><ParticipantsPage /></OrganizerLayout>} />
      <Route path="/organizer/judges" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><JudgesPage /></OrganizerLayout>} />
      <Route path="/organizer/mentors" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><MentorsPage /></OrganizerLayout>} />
      <Route path="/organizer/announcements" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><AnnouncementsPage /></OrganizerLayout>} />
      <Route path="/organizer/profile" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><OrganizerProfilePage /></OrganizerLayout>} />
      <Route path="/organizer/judges/:judgeId/profile" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><OrganizerJudgeProfilePage /></OrganizerLayout>} />
      <Route path="/organizer/mentors/:mentorId/profile" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><MentorProfilePage /></OrganizerLayout>} />
                <Route path="/organizer/hackathons/:id/analytics" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><HackathonAnalyticsPage /></OrganizerLayout>} />
                <Route path="/organizer/hackathons/:id/edit" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><EditHackathonPage /></OrganizerLayout>} />
                <Route path="/organizer/hackathons/:id" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><HackathonManagementPage /></OrganizerLayout>} />
                <Route path="/organizer/teams/:teamId/submission/:hackathonId" element={<OrganizerLayout theme={theme} onToggleTheme={toggleTheme}><SubmissionViewPage /></OrganizerLayout>} />
      
                {/* Judge Routes */}
                <Route path="/judge/dashboard" element={<JudgeLayout theme={theme} onToggleTheme={toggleTheme}><JudgeDashboardPage /></JudgeLayout>} />
                <Route path="/judge/evaluations" element={<JudgeLayout theme={theme} onToggleTheme={toggleTheme}><JudgeEvaluationsPage /></JudgeLayout>} />
                <Route path="/judge/mentorship" element={<JudgeLayout theme={theme} onToggleTheme={toggleTheme}><JudgeMentorshipPage /></JudgeLayout>} />
                <Route path="/judge/analytics" element={<JudgeLayout theme={theme} onToggleTheme={toggleTheme}><JudgeAnalyticsPage /></JudgeLayout>} />
                <Route path="/judge/profile" element={<JudgeLayout theme={theme} onToggleTheme={toggleTheme}><JudgeProfilePage /></JudgeLayout>} />
      
      <Route path="/leaderboard" element={<Navigate to="/participant/global-leaderboard" replace />} />
    </Routes>
  )
}