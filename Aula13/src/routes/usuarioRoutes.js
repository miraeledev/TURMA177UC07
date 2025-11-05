import UsuarioControllers from "../controllers/UsuarioControllers.js"
import {autenticarToken} from "../middlewares/authMiddleware.js";
import express from "express";
const router = express.Router();

//Rotas públicas (não precisam de autenticação)
router.post("/", UsuarioControllers.criar);
router.post("/login", UsuarioControllers.login);

//Rotas protegidas (precisam de autenticação)
router.get("/", autenticarToken, UsuarioControllers.listar);
router.get("/:id", autenticarToken, UsuarioControllers.buscarPorId);
router.put("/:id", autenticarToken, UsuarioControllers.atualizar);
router.delete("/:id", autenticarToken, UsuarioControllers.deletar);
router.patch("/:id", autenticarToken, UsuarioControllers.atualizarParcialmente);
router.get("/perfil/dados", autenticarToken, UsuarioControllers.perfil);

export default router;

