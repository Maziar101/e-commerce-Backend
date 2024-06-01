import express from "express";
import { addComments, addReplay, getAllComment, removeComments } from "../controllers/commentsCn.js";
import loginCheck from "../middleware/loginCheck.js";

const commentsRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - authorId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         text:
 *           type: string
 *           description: The content of the comment
 *         authorId:
 *           type: string
 *           description: The ID of the author of the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was created
 *         replay:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           description: Replies to the comment
 *       example:
 *         id: d5fE_asz
 *         text: This is a comment
 *         authorId: 602c8a5b2f1b2b001d8e5c98
 *         createdAt: 2022-04-23T18:25:43.511Z
 *         replay: []
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment was deleted
 *       401:
 *         description: You don't have permission to delete this comment
 *       404:
 *         description: The comment was not found
 *   post:
 *     summary: Add a reply to a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The reply was added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 */

commentsRoute.route("/").get(getAllComment).post(loginCheck, addComments);
commentsRoute.route("/:id").delete(loginCheck, removeComments).post(addReplay);

export default commentsRoute;
