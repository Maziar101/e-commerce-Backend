import express from "express";
import { createDiscount, deleteDiscount, updateDiscount } from "../controllers/discountCn.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";
const discountRoute = express.Router();
discountRoute.route('/').post(adminOrSuperAdmin,createDiscount);
discountRoute.route('/:id').patch(adminOrSuperAdmin,updateDiscount).delete(adminOrSuperAdmin,deleteDiscount);

export default discountRoute;