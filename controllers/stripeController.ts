import { StripeService } from "../services/StripeService";
import { validator } from "../utils/validator";
import { logger } from "../utils/logger";
import { Request, Response } from 'express';
import stripePackage from 'stripe';

export class stripeController{
    initStripeService(req: Request): StripeService{
        const stripeSecretKey = req.get('stripe-secret-key') as string;
        return new StripeService(new stripePackage(stripeSecretKey));
    }
    
    async createPaymentMethod(req: Request, res: Response) {
        try {
            const { type, card } = req.body;
            
            if (type !== 'card' || !card) {
              return res.status(400).json({ error: 'Invalid payment method details' });
            }
        
            const stripeService = this.initStripeService(req);
            const paymentMethod = await stripeService.createPaymentMethod(type, card);
            const customerId = req.body.user.stripeCustomerId;  // Assuming this is stored with the user
            await stripeService.attachPaymentMethodToCustomer(paymentMethod.id, customerId);
        
            res.json({ paymentMethod });
          } catch (error: any) {
            logger.error('Error creating payment method:', error);
            res.status(500).json({ error: error.message });
          }
    }

    async getPaymentMethods(req: Request, res: Response) {
        try {
            const customerId = req.body.user.stripeCustomerId;  // Assuming this is stored with the user
            const stripeService = this.initStripeService(req);
            const paymentMethods = await stripeService.listCustomerPaymentMethods(customerId);
            res.json({ paymentMethods });
          } catch (error: any) {
            logger.error('Error getting payment methods:', error);
            res.status(500).json({ error: error.message });
          }
    }

    async createPaymentIntent(req: Request, res: Response) {
        try {
            const { error } = validator.validateAmount(req.body.amount);
            if (error) return res.status(400).json({ error: error.details[0].message });
        
            const { amount } = req.body;
            const customerId = req.body.user.stripeCustomerId;  // Assuming this is stored with the user
        
            const stripeService = this.initStripeService(req);
            const paymentIntent = await stripeService.createPaymentIntent(amount, 'usd', customerId);
            res.json({ clientSecret: paymentIntent.client_secret });
          } catch (error: any) {
            logger.error('Error creating payment intent:', error);
            res.status(500).json({ error: error.message });
          }
    }

    
}