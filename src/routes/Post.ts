import { Schema } from "mongoose";
import { validateSchema, Schemas } from "./../middlewares/validateSchema";
import express from "express";
import controller from "../controllers/PostController";
import { authMiddleware } from "../middlewares/auth";
import { postMiddleware } from "../middlewares/post";
import { checkRole } from "../middlewares/checkRole";

const router = express.Router();

// Não autenticada

router.post(
  "/post",
  authMiddleware,
  validateSchema(Schemas.post.create),
  controller.createPost
);
router.get("/post/:postId", authMiddleware, controller.readPost);
router.get("/feed/", authMiddleware, controller.readAllPosts);

export = router;
