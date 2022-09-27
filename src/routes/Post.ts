import express from "express";
import controller from "../controllers/PostController";
import { authMiddleware } from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";

const router = express.Router();

// Não autenticada

router.post("/post/new", authMiddleware, controller.createPost);
router.get("/post/:postId", authMiddleware, controller.readPost);
router.get("/feed/", authMiddleware, controller.readAllPosts);

export = router;
