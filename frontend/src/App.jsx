import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import LandingPage from './pages/LandingPage'
import FeaturesPage from './pages/FeaturesPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
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
import WinnersGalleryPage from './pages/WinnersGallery'; // Import WinnersGalleryPage as named export
import CommunityPage from './pages/CommunityPage'; // Import CommunityPage
import AboutPage from './pages/AboutPage'; // Import AboutPage

function AuthLayout({ children, theme, onToggleTheme }) {
  return (
    <div className="page">
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
    <div className="page bg-bg">
      <ParticipantNavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="flex-grow flex justify-center items-center">
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="page">
          <NavBar theme={theme} onToggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
          <LandingPage theme={theme} onToggleTheme={toggleTheme} />
          <Footer />
        </div>
      } />
      <Route path="/features" element={
        <div className="page">
          <NavBar theme={theme} onToggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
          <FeaturesPage theme={theme} onToggleTheme={toggleTheme} />
          <Footer />
        </div>
      } />
      <Route path="/winners-gallery" element={
        <div className="page">
          <NavBar theme={theme} onToggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
          <WinnersGalleryPage />
          <Footer />
        </div>
      } />
      <Route path="/community" element={
        <div className="page">
          <NavBar theme={theme} onToggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
          <CommunityPage />
          <Footer />
        </div>
      } />
      <Route path="/login" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><Login /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><Signup /></AuthLayout>} />
      <Route path="/about" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><AboutPage /></AuthLayout>} />
      <Route path="/auth/oauth-callback" element={<OAuthCallback />} />
      <Route path="/dashboard" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><ParticipantDashboardPage /></ParticipantLayout>} />
      <Route path="/participant/hackathons" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><HackathonsPage /></ParticipantLayout>} />
      <Route path="/participant/my-hackathons" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><MyHackathonsPage /></ParticipantLayout>} />
      <Route path="/participant/team" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><TeamPage /></ParticipantLayout>} />
      <Route path="/participant/profile" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><ProfilePage /></ParticipantLayout>} />
      <Route path="/participant/leaderboard" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><LeaderboardPage /></ParticipantLayout>} />
      <Route path="/participant/hackathons/:id" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><HackathonDetailPage /></ParticipantLayout>} />
      <Route path="/participant/workspace/:id" element={<ParticipantLayout theme={theme} onToggleTheme={toggleTheme}><WorkspacePage /></ParticipantLayout>} />
    </Routes>
  )
}