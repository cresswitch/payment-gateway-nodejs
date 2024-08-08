import { WalletService } from "../services/WalletService";
// import { StripeService } from "../services/StripeService";
import { validator } from "../utils/validator";
import { logger } from "../utils/logger";
import { Request, Response } from 'express';

export class walletController {
    // initStripeService(req: Request): StripeService{
        // const stripeSecretKey = req.get('stripe-secret-key') as string;
        // return new StripeService(stripeSecretKey);
    // }
    walletService: WalletService = new WalletService();

    async createWallet(req: Request, res: Response) {
        try {
            const { error } = validator.validateWalletCreation(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });
        
            const { initialBalance } = req.body;
            const userId = req.user.id;
        
            //const stripeService = initStripeService(req);
            const result = await this.walletService.createWallet(userId, initialBalance);
            res.status(201).json(result);
          } catch (error: any) {
            logger.error('Error creating wallet:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async deposit(req: Request, res: Response) {
        try {
            const { error } = validator.validateTransaction({ ...req.body, type: 'deposit' });
            if (error) return res.status(400).json({ error: error.details[0].message });
        
            const { amount, paymentMethodId } = req.body;
            const userId = req.user.id;
        
            //const stripeService = initStripeService(req);
            const result = await this.walletService.deposit(userId, amount, paymentMethodId);
            res.json(result);
          } catch (error: any) {
            logger.error('Error depositing funds:', error);
            res.status(500).json({ error: error.message });
          }
    }

    async transfer(req: Request, res: Response) {
        try {
            const { error } = validator.validateTransaction({ ...req.body, type: 'transfer' });
            if (error) return res.status(400).json({ error: error.details[0].message });
        
            const { toUserId, amount } = req.body;
            const fromUserId = req.user.id;
        
            const result = await this.walletService.transfer(fromUserId, toUserId, amount);
            res.json(result);
          } catch (error: any) {
            logger.error('Error transferring funds:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async withdraw(req: Request, res: Response) {
        try {
            const { error } = validator.validateTransaction({ ...req.body, type: 'withdraw' });
            if (error) return res.status(400).json({ error: error.details[0].message });
        
            const { amount, destinationAccount } = req.body;
            const userId = req.user.id;
        
            //const stripeService = initStripeService(req);
            const result = await this.walletService.withdraw(userId, amount, destinationAccount);
            res.json(result);
          } catch (error: any) {
            logger.error('Error withdrawing funds:', error);
            res.status(500).json({ error: error.message });
          }
    }

    async getBalance(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const result = await this.walletService.getBalance(userId);
            res.json(result);
          } catch (error: any) {
            logger.error('Error getting balance:', error);
            res.status(500).json({ error: error.message });
          }
    }

    async getTransactionHistory(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const result = await this.walletService.getTransactionHistory(userId);
            res.json(result);
          } catch (error: any) {
            logger.error('Error getting transaction history:', error);
            res.status(500).json({ error: error.message });
          }
    }
}