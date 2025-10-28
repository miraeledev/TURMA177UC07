import express from "express";
import MusicaController from "../controllers/MusicaController.js";
const router = express.Router();

router.get("/", MusicaController.listar);
router.get("/:id", MusicaController.buscarPorId);
router.get("/nacionalidade/:nacionalidade", MusicaController.buscarPorNacionalidade);
router.post("/", MusicaController.criar);
router.put("/:id", MusicaController.atualizar);
router.delete("/:id", MusicaController.deletar);

export default router;



