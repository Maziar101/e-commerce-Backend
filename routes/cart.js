import express from "express";
import { deleteCart, getCart, updateCart } from "../controllers/cartCn.js";
import loginCheck from "../middleware/loginCheck.js";

const cartRoute = express.Router();

cartRoute.route("/").get(loginCheck,getCart).patch(loginCheck,updateCart).delete(loginCheck,deleteCart);

export default cartRoute;
