import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectOwn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

export const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (user.role !== 'admin' && user.role !== 'moderator') {
      return res.status(403).json({ message: 'Access denied !' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
}