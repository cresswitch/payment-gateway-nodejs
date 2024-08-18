import express from 'express';
import { authenticateJWT } from '../user/authMiddleware';
import { walletController } from '../controllers/walletController';

const walletRouter = express.Router();
const WalletController = new walletController();

walletRouter.post('/create', authenticateJWT, WalletController.createWallet);
walletRouter.post('/deposit', authenticateJWT, WalletController.deposit);
walletRouter.post('/transfer', authenticateJWT, WalletController.transfer);
walletRouter.post('/withdraw', authenticateJWT, WalletController.withdraw);
walletRouter.get('/balance', authenticateJWT, WalletController.getBalance);
walletRouter.get('/transactions', authenticateJWT, WalletController.getTransactionHistory);

export default walletRouter;