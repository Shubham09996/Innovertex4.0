import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'; // Import useContext and useState
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

export default function NavBar({ theme, onToggleTheme }) { // Remove isLoggedIn prop
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout, loading } = useContext(AuthContext); // Access user, logout, and loading from AuthContext
  
  console.log("NavBar - User:", user);
  console.log("NavBar - Loading:", loading);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {user && user.role === 'Organizer' ? (
            // Organizer-specific navigation
            <>
              <Link to="/organizer/dashboard" className={`text-text hover:text-primary transition-colors relative ${currentPath.startsWith('/organizer') ? 'active-nav-item' : ''}`}>Organizer Dashboard</Link>
              {/* Add more organizer links here if needed */}
            </>
          ) : (
            // Participant/Public navigation
            <>
              <Link to="/hackathons" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/hackathons' ? 'active-nav-item' : ''}`}>Hackathons</Link>
              <Link to="/winners-gallery" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/winners-gallery' ? 'active-nav-item' : ''}`}>Winners Gallery</Link>
              <Link to="/about" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/about' ? 'active-nav-item' : ''}`}>About</Link>
              <Link to="/participant/global-leaderboard" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/participant/global-leaderboard' ? 'active-nav-item' : ''}`}>Leaderboard</Link>
              <Link to="/contact" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/contact' ? 'active-nav-item' : ''}`}>Contact</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-nav border-b border-border flex flex-col items-center py-4 space-y-4">
            {user && user.role === 'Organizer' ? (
              <>
                <Link to="/organizer/dashboard" className={`text-text hover:text-primary transition-colors relative ${currentPath.startsWith('/organizer') ? 'active-nav-item' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Organizer Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/hackathons" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/hackathons' ? 'active-nav-item' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Hackathons</Link>
                <Link to="/winners-gallery" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/winners-gallery' ? 'active-nav-item' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Winners Gallery</Link>
                <Link to="/about" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/about' ? 'active-nav-item' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link to="/participant/global-leaderboard" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/participant/global-leaderboard' ? 'active-nav-item' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Leaderboard</Link>
                <Link to="/contact" className={`text-text hover:text-primary transition-colors relative ${currentPath === '/contact' ? 'active-nav-item' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </>
            )}
            {user && !loading ? (
              <>
                <Link
                  to={user.role === 'Organizer' ? "/organizer/dashboard" : "/dashboard"}
                  className="btn secondary text-text bg-transparent border border-border px-4 py-2.5 rounded-full font-semibold hover:border-primary-300 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/participant/profile"
                  className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text flex-none"
                  aria-label="Profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                    style={{ aspectRatio: '1/1' }}
                  />
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="btn bg-gradient-to-r from-primary to-primary-2 text-white px-4 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        {/* RIGHT - Theme + Auth */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <button
            className="md:hidden w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <button
            className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☾' : '☀'}
          </button>

          {user && !loading ? ( // Check if user is logged in and not loading
            <>
              <Link
                to={user.role === 'Organizer' ? "/organizer/dashboard" : "/dashboard"}
                className="btn secondary text-text bg-transparent border border-border px-4 py-2.5 rounded-full font-semibold hover:border-primary-300 transition-all"
              >
                Dashboard
              </Link>
              <Link
                to="/participant/profile"
                className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text flex-none"
                aria-label="Profile"
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  style={{ aspectRatio: '1/1' }}
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