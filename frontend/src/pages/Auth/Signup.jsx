import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../utils/api'; // Update the import path

export default function Signup() {
  const [role, setRole] = useState('Participant');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { username, email, password, confirmPassword } = formData;

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const data = await api.signup(username, email, password, role);

      if (data.token) { // Although signup doesn't directly return a token in our current backend, it might in other setups.
        console.log('Signup successful:', data);
        navigate('/login'); // Redirect to login page on successful signup
      } else if (data.msg) {
        setError(data.msg);
      } else {
        setError('Signup failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
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
          <div>
            <label htmlFor="username" className="block mb-2 font-medium">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
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
            <div className="w-1/2">
              <label htmlFor="password" className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="confirm-password" className="block mb-2 font-medium">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
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
        <p className="mt-6 text-muted">Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link></p>
      </div>
    </div>
  )
}
