import { Router } from 'express';

import emprestimoController from '../controllers/EmprestimoController';

const router = Router();

router.get('/', emprestimoController.index);
router.get('/emprestados', emprestimoController.showEmprestados);
router.get('/pendentes', emprestimoController.showPendentes);
router.post('/', emprestimoController.store);
router.put('/', emprestimoController.update);

export default router;
