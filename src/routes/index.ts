import { Router } from 'express';
import userRoutes from './user.routes';
import userOroutes from './userO.routes';
import trackerRoutes from './tracker.routes';
import calculateRoutes from './calculator.routes';
import stockRoutes from './stock.routes';
import { authenticateToken } from '../middleware/middleware';

const router = Router();

router.use('/auth', userRoutes);
router.use('/firebase', userOroutes);
router.use('/tracker', authenticateToken, trackerRoutes);
router.use('/calculator', authenticateToken, calculateRoutes);
router.use('/predict', authenticateToken, stockRoutes);

export default router;