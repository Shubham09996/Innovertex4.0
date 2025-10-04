import dotenv from 'dotenv';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import fileURLToPath

const __filename = fileURLToPath(import.meta.url); // Get current file name
const __dirname = path.dirname(__filename); // Get current directory name

dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); // Explicitly load .env from backend directory

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import initSocket from './utils/socket.js'; // Import initSocket
import cors from 'cors'; // Import cors

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize Socket.IO event handlers
initSocket(io);

// Passport config
import initializePassport from './config/passport.js'; // Import initializePassport function
initializePassport(); // Call the function to initialize Passport

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors({ // Add CORS middleware for Express routes
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

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
import hackathonRoutes from './routes/hackathonRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

app.use('/api/teams', teamRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/chat', chatRoutes);

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
        res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/oauth-callback?token=${token}`);
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
        res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/oauth-callback?token=${token}`);
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

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export { io };
