import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { walletController } from '../controllers/walletController';

const router = express.Router();

router.post('/create', authenticateJWT, WalletController.createWallet);
router.post('/deposit', authenticateJWT, WalletController.deposit);
router.post('/transfer', authenticateJWT, WalletController.transfer);
router.post('/withdraw', authenticateJWT, WalletController.withdraw);
router.get('/balance', authenticateJWT, WalletController.getBalance);
router.get('/transactions', authenticateJWT, WalletController.getTransactionHistory);