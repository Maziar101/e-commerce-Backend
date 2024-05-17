import express from "express";
import { addComments, getAllComment, removeComments } from "../controllers/commentsCn.js";
import loginCheck from "../middleware/loginCheck.js";

const commentsRoute = express.Router();

commentsRoute.route("/").get(getAllComment).post(loginCheck,addComments);
commentsRoute.route("/:id").delete(loginCheck,removeComments);

export default commentsRoute;