import { Router } from 'express';
import userRoutes from './user.routes';
import userOroutes from './userO.routes';
import trackerRoutes from './tracker.routes';
import calculateRoutes from './calculator.routes';
import { authenticateToken } from '../middleware/middleware';

const router = Router();

router.use('/auth', userRoutes);
router.use('/firebase', userOroutes);
router.use('/tracker', authenticateToken, trackerRoutes);
router.use('/calculator', authenticateToken, calculateRoutes);
// router.get('/protected', authenticateToken, (req, res) => {
//     res.status(200).send("This is a protected route");
// });

export default router;
