import UsuarioControllers from "../controllers/UsuarioControllers.js"
import express from "express";
const router = express.Router();

router.get("/", UsuarioControllers.listar);
router.post("/", UsuarioControllers.criar);
router.post("/login", UsuarioControllers.login);

export default router;

