import express from "express";
import superAdmin from "../middleware/superAdmin.js";
import { getAllLog } from "../controllers/logCn.js";

const logRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - message
 *         - level
 *         - timestamp
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the log
 *         message:
 *           type: string
 *           description: The log message
 *         level:
 *           type: string
 *           description: The level of the log (e.g., info, warning, error)
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the log was created
 *       example:
 *         id: d5fE_asz
 *         message: User login successful
 *         level: info
 *         timestamp: 2024-06-01T12:34:56.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: The logs managing API
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Returns the list of all logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 *       403:
 *         description: Forbidden
 */

logRouter.route('/').get(superAdmin, getAllLog);

export default logRouter;
