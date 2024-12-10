import { Router } from 'express';
import { createProfile , getProfile, updateProfile } from '../module/savingTracker/tracker.controller';

const router = Router();

router.post('/', createProfile);
router.get('/', getProfile);
router.put('/', updateProfile);

export default router;