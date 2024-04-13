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

// Config

const app = express();
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes

app.use('api/v1/auth',authRoute);
app.use('api/v1/cart',cartRoute);
app.use('api/v1/categories',categoriesRoute);
app.use('api/v1/comments',commentsRoute);
app.use('api/v1/discount-code',discountRoute);
app.use('api/v1/products',productsRoute);
app.use('api/v1/users',usersRoute);
app.use('*',(req,res,next)=>{
    res.status(404).json({
        message: "Api Route Not Found",
    });
});



export default app;