import express from "express";
import adminOrSuperAdmin from "../middleware/adminSuperAdmin.js";
import { deleteUser, getAllUsers, updateUser } from "../controllers/userCn.js";
import loginCheck from "../middleware/loginCheck.js";
const usersRoute = express.Router();

usersRoute.route('/').get(adminOrSuperAdmin,getAllUsers);
usersRoute.route('/update-profile').delete(loginCheck,deleteUser).patch(loginCheck,updateUser);


export default usersRoute;