import express from "express";
import { deleteCart, getCart, updateCart } from "../controllers/cartCn.js";

const cartRoute = express.Router();

cartRoute.route("/").get(getCart).patch(updateCart).delete(deleteCart);

export default cartRoute;
