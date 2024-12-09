import { Router } from 'express';
import userRoutes from './user.routes';
import userOroutes from './userO.routes';
import { authenticateToken } from '../middleware/middleware';

const router = Router();

router.use('/auth', userRoutes);
router.use('/firebase', userOroutes);
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send("This is a protected route");
});

export default router;
