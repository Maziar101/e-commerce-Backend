import express from "express";
import { createDiscount, updateDiscount } from "../controllers/discountCn.js";
const discountRoute = express.Router();
discountRoute.route('/').post(createDiscount);
discountRoute.route('/:id').patch(updateDiscount);

export default discountRoute;