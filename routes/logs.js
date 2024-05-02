import express from "express";
import superAdmin from "../middleware/superAdmin.js";
import { getAllLog } from "../controllers/logCn";
const logRouter = express.Router();
logRouter('/').get(superAdmin,getAllLog);

export default logRouter