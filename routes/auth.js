import express from "express";
import { register, login, otp } from "../controllers/authCn.js";

const authRoute = express.Router();

authRoute.route("/").post(login);
authRoute.route("/register").post(register);
authRoute.route("/otp").post(otp);

export default authRoute;