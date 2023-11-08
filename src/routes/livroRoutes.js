import { Router } from 'express';

import livroController from '../controllers/LivroController';

const router = Router();

router.get('/', livroController.index);
router.get('/:id', livroController.show);
router.post('/', livroController.store);
router.put('/:id', livroController.update);
router.delete('/:id', livroController.remove);

export default router;
