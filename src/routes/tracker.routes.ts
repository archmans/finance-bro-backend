import { Router } from 'express';
import { 
    createProfile, 
    getProfile, 
    updateProfile, 
    getAllSavings,
    getAllNames,
    getNamesByType,
    getAmountByName,
    addSavings,
    updateSavings,
    updateSavingsInvest,
    deleteSavings
} from '../module/savingTracker/tracker.controller';

/**
 * @swagger
 * tags:
 *   name: SavingTracker
 *   description: API for managing savings and profiles
 */

/**
 * @swagger
 * /tracker/savings:
 *   get:
 *     summary: Get all savings records
 *     tags: [SavingTracker]
 *     description: Retrieve all saving records for the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of savings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 savings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Emergency Fund"
 *                       amount:
 *                         type: number
 *                         example: 1000
 *                       type:
 *                         type: string
 *                         example: "Investment"
 *       401:
 *         description: Unauthorized access.
 *   post:
 *     summary: Add a new saving record
 *     tags: [SavingTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Emergency Fund"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 example: "Investment"
 *     responses:
 *       201:
 *         description: Saving added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Saving added"
 *       401:
 *         description: Unauthorized access.
 *   put:
 *     summary: Update an existing saving record
 *     tags: [SavingTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Emergency Fund"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 example: "Saving"
 *     responses:
 *       200:
 *         description: Saving updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Savings updated"
 *       401:
 *         description: Unauthorized access.
 *   delete:
 *     summary: Delete a saving record
 *     tags: [SavingTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Emergency Fund"
 *     responses:
 *       200:
 *         description: Saving deleted successfully.
 *       401:
 *         description: Unauthorized access.
 */

/**
 * @swagger
 * /tracker/savingsname:
 *   get:
 *     summary: Get all saving names
 *     tags: [SavingTracker]
 *     responses:
 *       200:
 *         description: List of saving names retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Emergency Fund", "Vacation Savings"]
 *       404:
 *         description: No saving names found.
 */

/**
 * @swagger
 * /tracker/savingsname/{type}:
 *   get:
 *     summary: Get all saving names by type
 *     tags: [SavingTracker]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of saving
 *     responses:
 *       200:
 *         description: List of saving names retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 names:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Tabungan"]
 *       401:
 *         description: Unauthorized access.
 */

/**
 * @swagger
 * /savingsamount/{name}:
 *   get:
 *     summary: Get savings amount by name
 *     tags: [SavingTracker]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the savings
 *     responses:
 *       200:
 *         description: Savings amount retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *                   example: 5000
 *       401:
 *         description: Unauthorized access.
 */

/**
 * @swagger
 * /tracker/savingsinvest:
 *  put:
 *     summary: Update an existing saving record
 *     tags: [SavingTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Emergency Fund"
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 example: "Investment"
 *     responses:
 *       200:
 *         description: Saving updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Savings invest updated"
 *       401:
 *         description: Unauthorized access.
 *  
 */

const router = Router();
router.post('/', createProfile);
router.get('/', getProfile);
router.put('/', updateProfile);
router.get('/savings', getAllSavings);
router.get('/savingsname', getAllNames);
router.get('/savingsname/:type', getNamesByType);
router.get('/savingsamount/:name', getAmountByName);
router.post('/savings', addSavings);
router.put('/savings', updateSavings);
router.put('/savingsinvest', updateSavingsInvest);
router.delete('/savings', deleteSavings);
export default router;