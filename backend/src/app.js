import express from 'express';
import connectDB from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import fileURLToPath

const __filename = fileURLToPath(import.meta.url); // Get current file name
const __dirname = path.dirname(__filename); // Get current directory name

dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); // Explicitly load .env from backend directory

const app = express();

// Passport config
import './config/passport.js'; // Import passport config directly

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
import teamRoutes from './routes/teamRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import authRoutes from './routes/authRoutes.js';

app.use('/api/teams', teamRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/auth', authRoutes);

// Google OAuth routes
app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, generate JWT and redirect to frontend
    const payload = {
      user: {
        id: req.user.id,
        role: req.user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/auth/oauth-callback?token=${token}`);
      }
    );
  }
);

// GitHub OAuth routes
app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get(
  '/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, generate JWT and redirect to frontend
    const payload = {
      user: {
        id: req.user.id,
        role: req.user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/auth/oauth-callback?token=${token}`);
      }
    );
  }
);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
