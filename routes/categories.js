import express from "express";
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  updateCategories,
} from "../controllers/categoriesCn.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";

/**
 * @swagger 
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *          - name
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of a product
 *         name:
 *           type: string
 *           description: The name of the product
 *         images:
 *           type: array
 *           description: array of base64 images string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: When the product was created
 *         updatedAt:
 *           format: date-time
 *           readOnly: true
 *           description: When the product was updated
 *         slug:
 *           type: string 
 *       example:
 *         id: 6617dd568e46ae63b7a76ec8
 *         name: shalvar
 *         images: []
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API for Category
 * /api/v1/Categories:
 *   get:
 *     summary: Get all products
 *     tags: [Category]
 *     responses:
 *       200 (OK):
 *         description: An array of Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/Category'
 *       500:
 *          description: Server error
 *   post:
 *     summary: Create a new Category
 *     tags: [Category]
 *     parameters:
 *      - name: authorization
 *        in: headers
 *        required: true
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: A Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: some server error
 * /api/v1/product/{id}:
 *   delete:
 *     summary: delete Category
 *     tags: [Category]
 *     parameters:
 *      - name: authorization
 *        in: headers
 *        required: true
 *        type: string
 *      - name : id
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: delete Category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: some server error
 *   patch:
 *     summary: update Category
 *     tags: [Category]
 *     parameters:
 *      - name: authorization
 *        in: headers
 *        required: true
 *        type: string
 *      - name : id
 *        in: path
 *        required: true
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     
 *      
 * 
 */

const categoriesRoute = express.Router();

categoriesRoute
  .route("/")
  .get(getAllCategories)
  .post(adminOrSuperAdmin, createCategories);
categoriesRoute
  .route("/:id")
  .delete(adminOrSuperAdmin, deleteCategories)
  .patch(adminOrSuperAdmin, updateCategories);

export default categoriesRoute;
