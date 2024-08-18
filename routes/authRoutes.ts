import express from 'express';
import { authController } from '../user/authController';

const authRouter = express.Router();
const AuthController = new authController();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;