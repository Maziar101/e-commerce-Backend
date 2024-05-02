import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productCn.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";
const productsRoute = express.Router();

productsRoute('/').get(getAllProducts).post(adminOrSuperAdmin,createProduct);
productsRoute('/:id').get(getProductById).delete(adminOrSuperAdmin,deleteProduct).patch(adminOrSuperAdmin,updateProduct);

export default productsRoute;