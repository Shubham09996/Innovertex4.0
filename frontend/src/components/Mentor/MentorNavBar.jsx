import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

export default function MentorNavBar({ theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-nav border-b border-border">
      <div className="w-full px-6 flex items-center h-20">

        {/* LEFT - Logo */}
        <div className="flex items-center gap-2 font-display font-bold flex-1">
          <Link to="/" className={`flex items-center gap-2 cursor-pointer ${currentPath === '/' ? 'active-nav-item' : ''}`}>
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
            <span>HackVerse</span>
          </Link>
        </div>

        {/* CENTER - Links */}
        <nav className="hidden md:flex items-center gap-5 flex-none">
          <Link to="/mentor/dashboard" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/mentor/dashboard' ? 'active-nav-item' : ''}`}>Dashboard</Link>
          <Link to="/mentor/teams" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/mentor/teams' ? 'active-nav-item' : ''}`}>My Teams</Link>
          <Link to="/mentor/chat" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/mentor/chat' ? 'active-nav-item' : ''}`}>Chat</Link>
        </nav>

        {/* RIGHT - Theme + Notifications + Profile */}
        <div className="flex items-center gap-3 flex-1 justify-end relative">
          {/* Theme Toggle */}
          <button
            className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text cursor-pointer"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>

          {/* Notification Icon */}
          <button
            className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text cursor-pointer relative"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9a6 6 0 00-12 0v.75a8.967 8.967 0 01-2.007 5.022c1.287.097 2.595.148 3.903.148 1.493 0 2.978-.052 4.46-.157m-4.787 1.983a.75.75 0 01.437.663V20.25a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-1.77a.75.75 0 01.437-.663A6.75 6.75 0 0112 17.25c1.492 0 2.977-.052 4.46-.157" />
            </svg>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text overflow-hidden cursor-pointer"
              aria-label="Mentor Profile"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-10">
                <Link
                  to="/mentor/profile"
                  onClick={toggleDropdown}
                  className="block px-4 py-2 text-text hover:bg-bg-elev transition-colors"
                >
                  👤 View Profile
                </Link>
                <button
                  onClick={() => { handleLogout(); toggleDropdown(); }}
                  className="w-full text-left px-4 py-2 text-text hover:bg-bg-elev transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
