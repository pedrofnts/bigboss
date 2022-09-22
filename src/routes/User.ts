import express from "express";
import controller from "../controllers/UserController";

const router = express.Router();

// Não autenticada

router.post("/register", controller.createUser); // Cadastro de Usuário

// Com autenticação

router.get("/profile/:userId", controller.readUser);
router.get("/profiles", controller.readAll);
router.put("/profile/:userId/edit", controller.updateUser);
router.delete("/profile/:userId/delete", controller.deleteUser);

export = router;
