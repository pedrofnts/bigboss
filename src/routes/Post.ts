import { Schema } from 'mongoose';
import { validateSchema, Schemas } from './../middlewares/validateSchema';
import express from 'express';
import PostController from '../controllers/PostController';
import { authMiddleware } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';

const router = express.Router();

// Não autenticada

router.post(
    '/post',
    authMiddleware,
    validateSchema(Schemas.post.create),
    PostController.createPost
);
router.get('/post/:postId', authMiddleware, PostController.readPost);
router.get('/feed', authMiddleware, PostController.readAllPosts);

export = router;
