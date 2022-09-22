import express from "express";
import controller from "../controllers/authController";

const router = express.Router();

// Não autenticada

router.post("/login", controller.login); // Login de usuário

export = router;
