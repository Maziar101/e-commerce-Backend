import Categories from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";


export const search = catchAsync(async(req,res,next)=>{
    const searchParams = req.body.params;
    const products = await Product.find({name:{
        $regex: searchParams,
    }});
    const category = await Categories.find({name:{
        $regex: searchParams,
    }});
    return res.status(200).json({
        status:"success",
        data:{
            products,
            category
        }
    });
});