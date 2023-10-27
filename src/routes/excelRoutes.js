import { Router } from 'express';
import excelController from '../controllers/ExcelController';

const router = Router();

router.get('/', excelController.index);

export default router;
