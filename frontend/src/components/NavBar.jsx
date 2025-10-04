import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function NavBar({ theme, onToggleTheme }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-nav border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
          <span>HackVerse</span>
        </div>
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/" className="text-text hover:text-primary transition-colors">Home</Link>
          <a href="#" className="text-text hover:text-primary transition-colors">Hackathons</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Winners Gallery</a>
          <Link to="/features" className="text-text hover:text-primary transition-colors">Features</Link>
          <a href="#" className="text-text hover:text-primary transition-colors">Leaderboard</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Community</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text"
                  onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☾' : '☀'}
          </button>
          <Link className="btn secondary text-text bg-transparent border border-border px-4 py-2.5 rounded-full font-semibold hover:border-primary-300 transition-all" to="/login">Login</Link>
          <Link className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-4 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all" to="/signup">Sign Up</Link>
        </div>
      </div>
    </header>
  )
}
