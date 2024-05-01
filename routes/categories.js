import express from "express";
import { createCategories, deleteCategories, getAllCategories, updateCategories } from "../controllers/categoriesCn.js";

const categoriesRoute = express.Router();

categoriesRoute.route('/').get(getAllCategories).post(createCategories);
categoriesRoute.route('/:id').delete(deleteCategories).patch(updateCategories);

export default categoriesRoute;