import { Schema } from 'mongoose';
import { validateSchema, Schemas } from './../middlewares/validateSchema';
import {Router} from 'express';
import PostController from '../controllers/PostController';
import { authMiddleware } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

// Não autenticada

router.post(
    '/post',
    authMiddleware,
    validateSchema(Schemas.post.create),
    PostController.createPost
);
router.get('/post/:postId', authMiddleware, PostController.readPost);
router.get('/feed', authMiddleware, PostController.readAllPosts);
router.put('/post/:postId', authMiddleware, PostController.updatePosts);
router.delete(
    '/post',
    authMiddleware,
    PostController.deletePost
);

export = router;
