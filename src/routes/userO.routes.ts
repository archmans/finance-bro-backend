import { Router } from 'express';
import { loginOrRegister, deleteUserController } from '../module/userAuth/user.controller';
import { authenticateToken } from '../middleware/middleware';

const router = Router();

router.post('/', loginOrRegister);
router.delete('/', authenticateToken, deleteUserController);

export default router;
