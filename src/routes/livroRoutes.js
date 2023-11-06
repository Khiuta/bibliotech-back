import { Router } from 'express';

import livroController from '../controllers/LivroController';

const router = Router();

router.get('/', livroController.index);
router.post('/', livroController.store);
router.delete('/:id', livroController.remove);
router.put('/:id', livroController.edit);

export default router;
