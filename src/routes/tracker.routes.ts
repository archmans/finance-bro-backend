import { Router } from 'express';
import { 
    createProfile, 
    getProfile, 
    updateProfile, 
    getAllSavings,
    getAllNames,
    addSavings,
    updateSavings,
    updateSavingsInvest,
    deleteSavings
} from '../module/savingTracker/tracker.controller';
const router = Router();
router.post('/', createProfile);
router.get('/', getProfile);
router.put('/', updateProfile);
router.get('/savings', getAllSavings);
router.get('/savingsname', getAllNames);
router.post('/savings', addSavings);
router.put('/savings', updateSavings);
router.put('/savingsinvest', updateSavingsInvest);
router.delete('/savings', deleteSavings);
export default router;