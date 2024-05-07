import express from "express";
import { getAllOrderHistory, getAllOrderHistoryForClient, payment } from "../controllers/orderCn.js";
import loginCheck from "../middleware/loginCheck.js";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";
const orderHistoryRoute = express.Router();

orderHistoryRoute.route('/').post(loginCheck,payment).get(loginCheck,getAllOrderHistoryForClient)
orderHistoryRoute.route('/ordersAdmin').get(adminOrSuperAdmin,getAllOrderHistory);

export default orderHistoryRoute;