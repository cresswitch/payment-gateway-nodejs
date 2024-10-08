import express, {Request, Response} from 'express';
import { User } from '../models/User';
import { logger } from '../utils/logger';
import jwt from 'jsonwebtoken';

export const authenticateJWT = async (req: Request, res: Response, next: Function) => {
    try {
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Access denied. Invalid token format.' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid token. User not found.' });
      }
  
      req.user = user;
      next();
    } catch (error: any) {
      logger.error('Authentication error:', error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token.' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired.' });
      }
      res.status(500).json({ error: 'Internal server error.' });
    }
  };