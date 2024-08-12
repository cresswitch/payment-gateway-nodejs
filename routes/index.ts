import express from 'express';
import authRouter from './authRoutes';
import walletRouter from './walletRoutes';
import stripeRouter from './stripeRoutes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/wallet', walletRouter);
router.use('/stripe', stripeRouter);

export default router;