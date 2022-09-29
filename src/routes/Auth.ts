import express from 'express';
import AuthController from '../controllers/authController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

// Não autenticada

router.post('/login', AuthController.login); // Login de usuário

router.get('/profile', authMiddleware, AuthController.getProfile);

export = router;
