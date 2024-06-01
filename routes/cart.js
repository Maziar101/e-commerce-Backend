import express from "express";
import { deleteCart, getCart, updateCart } from "../controllers/cartCn.js";
import loginCheck from "../middleware/loginCheck.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         _id:
 *           type: string
 *           description: شناسه منحصر به فرد سبد خرید
 *         products:
 *           type: array
 *           items:
 *             type: object
 *           description: آرایه‌ای از محصولات
 *         userId:
 *           type: string
 *           description: شناسه کاربر
 *         totalPrice:
 *           type: number
 *           description: مجموع قیمت محصولات
 *       example:
 *         _id: 66511b128cad81a95adb85b8
 *         products: [{}, {}, {}]
 *         userId: 66511b128cad81a95adb85b8
 *         totalPrice: 100
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   name: Cart
 *   description: API برای سبد خرید
 * 
 * /api/v1/cart:
 *   get:
 *     summary: یافتن یک سبد خرید با شناسه در توکن
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: وضعیت موفقیت
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   example: {cart}
 *       404:
 *         description: سبد خرید یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: سبد خرید شما خالی است
 *   patch:
 *     summary: به‌روزرسانی سبد خرید
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: به‌روزرسانی سبد خرید
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: {cart}
 *       400:
 *         description: ویژگی نامعتبر
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failed
 *                 message:
 *                   type: string
 *                   example: ویژگی نامعتبر
 *   delete:
 *     summary: حذف تمام محصولات در سبد خرید
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: حذف سبد خرید
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: سبد خرید با موفقیت حذف شد
 */

const cartRoute = express.Router();

cartRoute.route("/")
  .get(loginCheck, getCart)
  .patch(loginCheck, updateCart)
  .delete(loginCheck, deleteCart);

export default cartRoute;
