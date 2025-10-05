import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function AdminNavBar({ theme, onToggleTheme }) {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/admin/analytics" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-2 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-text">Admin Panel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 flex-none">
            <Link to="/admin/analytics" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/admin/analytics' ? 'active-nav-item' : ''}`}>Analytics</Link>
            <Link to="/admin/profile" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/admin/profile' ? 'active-nav-item' : ''}`}>Profile</Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-lg bg-bg-elev border border-border flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-lg bg-bg-elev border border-border flex items-center justify-center text-text hover:bg-bg-elev/80 transition-colors">
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-bg-elev transition-colors"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <span className="hidden md:block text-text font-medium">{user?.name || 'Admin'}</span>
                <span className="text-muted">▼</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-text hover:bg-bg-elev transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-text hover:bg-bg-elev transition-colors"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-bg-elev border border-border flex items-center justify-center text-text"
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                to="/admin/analytics"
                className={`text-text hover:text-primary transition-colors ${currentPath === '/admin/analytics' ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                to="/admin/profile"
                className={`text-text hover:text-primary transition-colors ${currentPath === '/admin/profile' ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
