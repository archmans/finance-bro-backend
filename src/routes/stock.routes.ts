import { Router } from 'express';
import { predictStock } from '../module/stockPrediction/stock.controller';

const router = Router();

router.post('/', predictStock);

export default router;