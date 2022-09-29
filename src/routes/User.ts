import { validateSchema, Schemas } from './../middlewares/validateSchema';
import express from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';

const router = express.Router();

// Não autenticada

router.post(
    '/user',
    validateSchema(Schemas.user.create),
    UserController.createUser
); // Cadastro de Usuário

// Com autenticação

router.get('/users/:userId', authMiddleware, UserController.readUser);
router.get('/users', authMiddleware, UserController.readAll);
router.put(
    '/user',
    authMiddleware,
    validateSchema(Schemas.user.update),
    UserController.updateUser
);
router.delete(
    '/user',
    authMiddleware,
    checkRole,
    UserController.deleteUser
);

export = router;
