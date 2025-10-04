import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../utils/api';  // Update the import path

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.login(email, password);

      if (data.token) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect to home or dashboard on successful login
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-card border border-border rounded-xl p-10 w-full max-w-2xl text-center flex-shrink-0">
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
          <div>
            <label htmlFor="password" className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-border bg-bg-elev rounded-lg text-text
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              value={password}
              onChange={handleChange}
              required
            />
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
        <p className="mt-6 text-muted">Don't have an account? <Link to="/signup" className="text-primary font-medium">Sign Up</Link></p>
      </div>
    </div>
  )
}
