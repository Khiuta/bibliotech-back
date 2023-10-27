import { Router } from 'express';

const router = Router();

import alunoController from '../controllers/AlunoController';

router.get('/', alunoController.index);
router.get('/:aluno', alunoController.show);

export default router;
