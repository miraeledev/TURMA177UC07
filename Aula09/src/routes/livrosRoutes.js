import express from 'express';
import LivroController  from '../controllers/LivroController.js';
const router = express.Router();

router.get('/', LivroController.listar);
router.post('/', LivroController.criar);

export default router;