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
      <Route path="/" element={<LandingPage theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/features" element={<FeaturesPage theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/login" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><Login /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout theme={theme} onToggleTheme={toggleTheme}><Signup /></AuthLayout>} />
      <Route path="/auth/oauth-callback" element={<OAuthCallback />} />
    </Routes>
  )
}
