import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
const router = express.Router();

router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.buscarPorId);
router.post("/", UsuarioController.criar);

export default router;