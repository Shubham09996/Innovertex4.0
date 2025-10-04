import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = (req, res, next) => {
  // Get token from header
  let token = req.header('authorization'); // Changed to 'authorization' header

  // Check if no token or not a Bearer token
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract actual token
  token = token.slice(7, token.length).trimLeft(); // Remove Bearer prefix

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
