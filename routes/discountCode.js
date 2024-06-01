import express from "express";
import { createDiscount, deleteDiscount, getAllDiscount, getDiscountById, updateDiscount, validateDiscount } from "../controllers/discountCn.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";

const discountRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       required:
 *         - code
 *         - percentNum
 *         - startTime
 *         - endTime
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the discount
 *         code:
 *           type: string
 *           description: The discount code
 *         percentNum:
 *           type: number
 *           description: The percentage discount
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the discount
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the discount
 *       example:
 *         id: d5fE_asz
 *         code: SAVE20
 *         percentNum: 20
 *         startTime: 2024-06-01T00:00:00.000Z
 *         endTime: 2024-06-30T23:59:59.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: The discounts managing API
 */

/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Returns the list of all the discounts
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discount'
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       201:
 *         description: The discount was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get the discount by id
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount id
 *     responses:
 *       200:
 *         description: The discount description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       404:
 *         description: The discount was not found
 *   patch:
 *     summary: Update the discount by the id
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       200:
 *         description: The discount was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       404:
 *         description: The discount was not found
 *   delete:
 *     summary: Remove the discount by id
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount id
 *     responses:
 *       200:
 *         description: The discount was deleted
 *       404:
 *         description: The discount was not found
 */

/**
 * @swagger
 * /discounts/validate:
 *   post:
 *     summary: Validate a discount code
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: The discount code to validate
 *             example:
 *               code: SAVE20
 *     responses:
 *       200:
 *         description: The discount code is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     discountPercent:
 *                       type: number
 *                 message:
 *                   type: string
 *       400:
 *         description: The discount code is invalid, not started, or expired
 */

discountRoute.route('/').get(adminOrSuperAdmin, getAllDiscount).post(adminOrSuperAdmin, createDiscount);
discountRoute.route('/:id').get(adminOrSuperAdmin, getDiscountById).patch(adminOrSuperAdmin, updateDiscount).delete(adminOrSuperAdmin, deleteDiscount);
discountRoute.route('/validate').post(validateDiscount);

export default discountRoute;
