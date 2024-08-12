import express from 'express';
import { stripeController } from '../controllers/stripeController';
import { authenticateJWT } from '../middleware/authMiddleware';

const stripeRouter = express.Router();
const StripeController = new stripeController();

stripeRouter.post('/create-payment-method', authenticateJWT, StripeController.createPaymentMethod);
stripeRouter.get('/payment-methods', authenticateJWT, StripeController.getPaymentMethods);

export default stripeRouter;