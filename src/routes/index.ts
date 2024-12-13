import { Router } from 'express';
import userOroutes from './userO.routes';
import trackerRoutes from './tracker.routes';
import calculateRoutes from './calculator.routes';
import stockRoutes from './stock.routes';
import { authenticateToken } from '../middleware/middleware';

/**
 * @swagger
 * tags:
 *   - name: Firebase
 *     description: Endpoints for Firebase operations
 */

/**
 * @swagger
 * /firebase:
 *   post:
 *     summary: Add user to Firebase
 *     tags: [Firebase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address associated with the Firebase operation.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Firebase operation successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Firebase operation completed successfully.
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete user from Firebase
 *     tags: [Firebase]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Firebase operation successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /tracker:
 *   get:
 *     summary: Get profile data
 *     tags: [Tracker]
 *     description: Get user-specific tracking data. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the tracking data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: salman
 *                 age:
 *                   type: number
 *                   example: 25
 *                 retireAge:
 *                   type: number
 *                   example: 65
 *                 retirePeriod:
 *                   type: number
 *                   example: 20
 *                 monthlyExpenses:
 *                   type: number
 *                   example: 2000000
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Tracker routes for data tracking
 *     tags: [Tracker]
 *     description: Manage user-specific tracking data. Requires authentication.
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
 *                 description: The name of the tracking data.
 *                 example: salman
 *               age:
 *                 type: number
 *                 description: The age of the user.
 *                 example: 25
 *               retireAge:
 *                 type: number
 *                 description: The age at which the user plans to retire.
 *                 example: 65
 *               retirePeriod:
 *                 type: number
 *                 description: The number of years the user plans to be retired.
 *                 example: 20
 *               monthlyExpenses:
 *                 type: number
 *                 description: The user's monthly expenses.
 *                 example: 2000000
 *     responses:
 *       200:
 *         description: Successfully tracked the data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tracking data saved successfully."
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update profile data
 *     tags: [Tracker]
 *     description: Update user-specific tracking data. Requires authentication.
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
 *                 description: The name of the tracking data.
 *                 example: salman
 *               age:
 *                 type: number
 *                 description: The age of the user.
 *                 example: 25
 *               retireAge:
 *                 type: number
 *                 description: The age at which the user plans to retire.
 *                 example: 60
 *               retirePeriod:
 *                 type: number
 *                 description: The number of years the user plans to be retired.
 *                 example: 25
 *               monthlyExpenses:
 *                 type: number
 *                 description: The user's monthly expenses.
 *                 example: 2000000
 *     responses:
 *       200:
 *         description: Successfully updated the data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tracking data updated successfully."
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /calculator:
 *   get:
 *     summary: Financial calculator routes
 *     tags: [Calculator]
 *     security:
 *       - bearerAuth: []
 *     description: Perform financial calculations. Requires authentication.
 *     responses:
 *       200:
 *         description: Successfully calculated the financial data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 200
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                   nullable: true
 *                   example: null
 *                 currentSavings:
 *                   type: number
 *                   nullable: true
 *                   description: The current savings of the user.
 *                   example: null
 *                 savingNeedPerMonth:
 *                   type: number
 *                   nullable: true
 *                   description: Monthly saving needed for the goal. Can be null if not applicable.
 *                   example: null
 *                 savingGoal:
 *                   type: number
 *                   nullable: true
 *                   description: Total saving goal amount. Can be null if not applicable.
 *                   example: null
 *                 savingPeriod:
 *                   type: number
 *                   nullable: true
 *                   description: The period of saving. Can be null if not applicable.
 *                   example: null
 *       500:
 *         description: Internal server error
 */

const router = Router();

router.use('/firebase', userOroutes);
router.use('/tracker', authenticateToken, trackerRoutes);
router.use('/calculator', authenticateToken, calculateRoutes);
router.use('/predict', authenticateToken, stockRoutes);

export default router;