import { Router } from 'express';
import { predictStock } from '../module/stockPrediction/stock.controller';

/**
 * @swagger
 * tags:
 *   name: StockPrediction
 *   description: API for predicting stock trends.
 */

/**
 * @swagger
 * /predict:
 *   post:
 *     summary: Predict stock trends
 *     tags: [StockPrediction]
 *     description: Predict stock trends based on historical data and inputs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock_code:
 *                 type: string
 *                 description: The stock symbol to predict trends for.
 *                 example: "BBCA"
 *               start_date:
 *                 type: string
 *                 description: The start date for predicting stock trends.
 *                 example: "2024-12-11"
 *               end_date:
 *                 type: string
 *                 description: The end date for predicting stock trends.
 *                 example: "2024-12-15"
 *     responses:
 *       200:
 *         description: Stock prediction results.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */


const router = Router();

router.post('/', predictStock);

export default router;