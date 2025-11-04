import UsuarioControllers from "../controllers/UsuarioControllers.js"
import express from "express";
const router = express.Router();

router.get("/", UsuarioControllers.listar);
router.post("/", UsuarioControllers.criar);
router.post("/login", UsuarioControllers.login);
router.get("/:id", UsuarioControllers.buscarPorId);
router.put("/:id", UsuarioControllers.atualizar);
router.delete("/:id", UsuarioControllers.deletar);
router.patch("/:id", UsuarioControllers.atualizarParcialmente);

export default router;

