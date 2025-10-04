import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'; // Import useContext
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

export default function NavBar({ theme, onToggleTheme }) { // Remove isLoggedIn prop
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-nav border-b border-border">
      <div className="w-full px-6 flex items-center h-20">
        
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2 font-display font-bold flex-1">
          <Link to="/" className="flex items-center gap-2 text-text hover:text-primary transition-colors">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
            <span>HackVerse</span>
          </Link>
        </div>

        {/* CENTER - Links */}
        <nav className="hidden md:flex items-center gap-5 flex-none">
          <Link to="/hackathons" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/hackathons' ? 'active-nav-item' : ''}`}>Hackathons</Link>
          <Link to="/winners-gallery" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/winners-gallery' ? 'active-nav-item' : ''}`}>Winners Gallery</Link>
          <Link to="/about" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/about' ? 'active-nav-item' : ''}`}>About</Link>
          <Link to="/participant/global-leaderboard" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/participant/global-leaderboard' ? 'active-nav-item' : ''}`}>Leaderboard</Link>
          <Link to="/contact" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/contact' ? 'active-nav-item' : ''}`}>Contact</Link>
        </nav>

        {/* RIGHT - Theme + Auth */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <button
            className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>

          {user ? ( // Check if user is logged in
            <>
              <Link
                to="/dashboard"
                className="btn secondary text-text bg-transparent border border-border px-4 py-2.5 rounded-full font-semibold hover:border-primary-300 transition-all"
              >
                Dashboard
              </Link>
              <Link
                to="/participant/profile"
                className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text"
                aria-label="Profile"
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-4 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn secondary text-text bg-transparent border border-border px-4 py-2.5 rounded-full font-semibold hover:border-primary-300 transition-all"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-4 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}