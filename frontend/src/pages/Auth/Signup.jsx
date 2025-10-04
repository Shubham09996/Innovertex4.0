import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import api from '../../utils/api'; // Update the import path
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

export default function Signup() {
  const [role, setRole] = useState('Participant');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password, confirmPassword } = formData;

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const data = await api.signup(formData);

      if (data.msg && data.msg === 'User already exists') {
        setError(data.msg);
      } else if (data.msg) {
        setError(data.msg);
      } else {
        const loginRes = await login(email, password);
        if (loginRes && loginRes.token) {
          navigate('/participant/dashboard');
        } else {
          setError('Signup successful, but automatic login failed. Please try logging in.');
          navigate('/login');
        }
      }
    } catch (err) {
      setError(err.message || 'Server error');
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-card border border-border rounded-xl p-10 w-full max-w-xl text-center flex-shrink-0">
        <div className="flex items-center justify-center gap-2 font-display font-bold text-lg mb-4">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-700">⚡</span>
          <span>HackVerse</span>
        </div>
        <h1 className="font-display text-3xl mb-2">Join HackVerse</h1>
        <p className="text-muted mb-6">Create your account to get started</p>

        <form className="grid gap-4 text-left" onSubmit={handleSubmit}>
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-4 relative">
            <label htmlFor="avatar" className="block mb-2 font-medium">Profile Picture</label>
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary mb-2 flex items-center justify-center bg-gray-200 relative">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-3xl">👤</span>
              )}
              {/* File input only covers avatar circle */}
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 font-medium">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={username}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          {/* Email */}
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
              autoComplete="off"
            />
          </div>

          {/* Passwords */}
          <div className="flex gap-4">
            <div className="w-1/2 relative">
              <label htmlFor="password" className="block mb-2 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
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
                type={showPassword ? 'text' : 'password'}
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

          {/* Role */}
          <div>
            <label htmlFor="role" className="block mb-2 font-medium">I am a:</label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="Participant">Participant</option>
              <option value="Organizer">Organizer</option>
              <option value="Mentor">Mentor</option>
              <option value="Judge">Judge</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-primary-2 text-white
                       py-3 px-5 rounded-full font-semibold shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-160"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-muted">OR</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <div className="grid gap-4">
          <button
            onClick={() => (window.location.href = '/api/auth/google')}
            className="w-full flex justify-center items-center gap-2 bg-bg-elev border border-border text-text
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>
          <button
            onClick={() => (window.location.href = '/api/auth/github')}
            className="w-full flex justify-center items-center gap-2 bg-bg-elev border border-border text-text
                       py-3 px-5 rounded-full font-semibold shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-160"
          >
            <img src="/icons/github.svg" alt="GitHub" className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-muted">
          Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}
