import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';

const router = Router();

router.post('/', usuarioController.store);

export default router;
