import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import api from '../../utils/api';  // Update the import path
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword to state
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from AuthContext
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await api.login(email, password);

      if (data.token) {
        console.log('Login successful:', data);
        login(data.token); // Use login from AuthContext
        navigate('/'); // Redirect to home or dashboard on successful login
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  const handleDummyLogin = (role) => {
    console.log(`Simulating login as ${role}...`);
    const dummyToken = `dummy-token-${role.toLowerCase()}`;
    // For dummy login, we'll create a mock user object for the AuthContext
    // In a real scenario, this would come from the server after a successful dummy auth
    const dummyUser = {
      username: `${role}User`,
      email: `${role.toLowerCase()}@example.com`,
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${role.charAt(0)}`,
    };

    // Store dummy token and user in localStorage to simulate AuthContext behavior
    localStorage.setItem('token', dummyToken);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    
    // Manually trigger AuthContext's login state update
    login(dummyToken); // This will also fetch user data via the effect in AuthContext

    // Redirect to respective dashboard
    switch (role) {
      case 'Mentor':
        navigate('/mentor/dashboard');
        break;
      case 'Judge':
        navigate('/judge/dashboard');
        break;
      case 'Admin':
        navigate('/admin/analytics');
        break;
      default:
        navigate('/dashboard'); // Default to participant dashboard
        break;
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-card border border-border rounded-xl p-10 w-full max-w-xl text-center flex-shrink-0">
        <div className="flex items-center justify-center gap-2 font-display font-bold text-lg mb-4">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
          <span>HackVerse</span>
        </div>
        <h1 className="font-display text-3xl mb-2">Welcome Back</h1>
        <p className="text-muted mb-6">Login to your account to continue</p>
        <form className="grid gap-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 relative">
              <label htmlFor="password" className="block mb-2 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" style={{ top: '30px' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="w-1/2 relative">
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                id="confirmPassword"
                placeholder="Enter your password again"
                className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" style={{ top: '30px' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="text-right text-sm mb-4">
            <Link to="#" className="text-primary hover:underline">Forgot Password?</Link>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white
                       py-3 px-5 rounded-full font-semibold shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-160"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-muted">OR</span>
          <div className="flex-grow border-t border-border"></div>
        </div>
        <div className="grid gap-4">
          <button
            onClick={() => (window.location.href = `${api.API_URL}/auth/google`)}
            className="w-full flex justify-center items-center gap-2 bg-bg-elev border border-border text-text
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>
          <button
            onClick={() => (window.location.href = `${api.API_URL}/auth/github`)}
            className="w-full flex justify-center items-center gap-2 bg-bg-elev border border-border text-text
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            <img src="/icons/github.svg" alt="GitHub" className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>
        {/* Dummy Login Buttons for Roles */}
        <div className="grid gap-4 mt-6">
          <button
            onClick={() => handleDummyLogin('Mentor')}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-br from-green-400 to-green-600 text-white
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            Login as Mentor
          </button>
          <button
            onClick={() => handleDummyLogin('Judge')}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            Login as Judge
          </button>
          <button
            onClick={() => handleDummyLogin('Admin')}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-br from-red-400 to-red-600 text-white
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            Login as Admin
          </button>
        </div>
        <p className="mt-6 text-muted">Don't have an account? <Link to="/signup" className="text-primary font-medium">Sign Up</Link></p>
      </div>
    </div>
  )
}