import express from "express";
import { createCategories, deleteCategories, getAllCategories, updateCategories } from "../controllers/categoriesCn.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";

const categoriesRoute = express.Router();

categoriesRoute.route('/').get(getAllCategories).post(adminOrSuperAdmin,createCategories);
categoriesRoute.route('/:id').delete(adminOrSuperAdmin,deleteCategories).patch(adminOrSuperAdmin,updateCategories);

export default categoriesRoute;