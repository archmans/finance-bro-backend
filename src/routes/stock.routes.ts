import { Router } from 'express';
import { predictStock } from '../module/stockPrediction/stock.controller';

const router = Router();

router.get('/', predictStock);

export default router;