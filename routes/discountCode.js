import express from "express";
import { createDiscount, deleteDiscount, getAllDiscount, getDiscountById, updateDiscount, validateDiscount } from "../controllers/discountCn.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";
const discountRoute = express.Router();
discountRoute.route('/').get(adminOrSuperAdmin,getAllDiscount).post(adminOrSuperAdmin,createDiscount);
discountRoute.route('/:id').get(adminOrSuperAdmin,getDiscountById).patch(adminOrSuperAdmin,updateDiscount).delete(adminOrSuperAdmin,deleteDiscount);
discountRoute.route('/validate').post(validateDiscount);

export default discountRoute;