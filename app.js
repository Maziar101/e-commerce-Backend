import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";
import cartRoute from "./routes/cart.js";
import categoriesRoute from "./routes/categories.js";
import commentsRoute from "./routes/comments.js";
import discountRoute from "./routes/discountCode.js";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";
import HandleError from "./utils/handleError.js";
import catchError from "./utils/CatchError.js";
import jwt from "jsonwebtoken";
import logRouter from "./routes/logs.js";
import Log from "./models/logModel.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import searchRouter from "./routes/search.js";

// Config

const app = express();
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(async (req, res, next) => {
  try {
    const { role, id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (role === "admin" || role === "superadmin") {
      let url = req.url;
      let method = req.method;
      let userId = id;
      await Log.create({ body, url, method, userId });
    }
    return next();
  } catch (err) {
    return next();
  }
});

const swaggerDefinition = {
  openapi:'3.0.0',
  info:{
    title:'e-commerce',
    description:'e-commerce api',
  },
};

const options={
  swaggerDefinition,
  apis:['./routes/*.js'],
};

const swaggerSpec=swaggerJSDoc(options);




// Routes
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/log", logRouter);
app.use("/api/v1/comments", commentsRoute);
app.use("/api/v1/discount-code", discountRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/search",searchRouter);
app.use("/api/v1/users", usersRoute);
app.use("*", (req, res, next) => {
  next(new HandleError("api route not found", 404));
});
app.use(catchError);

export default app;

// Ecommerce Prject is End With No Test .