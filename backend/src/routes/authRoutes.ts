import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

export default router;
