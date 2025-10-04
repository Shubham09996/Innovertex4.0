import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ theme, onToggleTheme, isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-nav border-b border-border">
      <div className="w-full px-6 flex items-center h-20">
        
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2 font-display font-bold flex-1">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
          <span>HackVerse</span>
        </div>

        {/* CENTER - Links */}
        <nav className="hidden md:flex items-center gap-5 flex-none">
          <Link to="/" className="text-text hover:text-primary transition-colors">Home</Link>
          <a href="#" className="text-text hover:text-primary transition-colors">Hackathons</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Winners Gallery</a>
          <Link to="/features" className="text-text hover:text-primary transition-colors">Features</Link>
          <a href="#" className="text-text hover:text-primary transition-colors">Leaderboard</a>
          <Link to="/community" className="text-text hover:text-primary transition-colors">Community</Link>
          <a href="#" className="text-text hover:text-primary transition-colors">Contact</a>
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

          {isLoggedIn ? (
            <>
              <Link
                to="/participant/profile"
                className="w-10 h-10 rounded-full grid place-items-center border border-border bg-bg-elev text-text"
                aria-label="Profile"
              >
                <img
                  src="https://via.placeholder.com/40"
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
