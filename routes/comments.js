import express from "express";
import { addComments, removeComments } from "../controllers/commentsCn.js";

const commentsRoute = express.Router();

commentsRoute.route("/").post(addComments);
commentsRoute.route("/:id").delete(removeComments);

export default commentsRoute;
