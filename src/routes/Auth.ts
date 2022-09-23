import express from "express";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import controller from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

// Não autenticada

router.post("/login", controller.login); // Login de usuário

router.get("/profile", authMiddleware, controller.getProfile);

export = router;
