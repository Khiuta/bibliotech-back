import { Router } from 'express';

import livroController from '../controllers/LivroController';

const router = Router();

router.get('/', livroController.index);
router.post('/', livroController.store);

export default router;
