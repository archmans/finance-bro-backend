import { Router } from 'express';
import { calculateController } from '../module/financeCalculator/calculator.controller';

const router = Router();

router.get('/', calculateController);

export default router;