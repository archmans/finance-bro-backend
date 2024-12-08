import { Router } from 'express';
import userRoutes from './user.routes';
import userOroutes from './userO.routes';

const router = Router();

router.use('/auth', userRoutes);
router.use('/firebase', userOroutes);

export default router;
