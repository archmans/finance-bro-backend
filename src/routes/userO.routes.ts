import { Router } from 'express';
import { loginOrRegister } from '../module/userAuth/user.controller';

const router = Router();

router.post('/', loginOrRegister);

export default router;
