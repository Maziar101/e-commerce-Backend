import HandleError from "../Utils/handleError.js";
import User from "../models/userModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

export const getAllUsers = catchAsync(async (req,res,next)=>{
    const features = new ApiFeatures(User,req.query).sort().filters().limitFields().paginate();
    const users = await features.query;
    return res.status(200).json({
        status:"success",
        data:{users},
    });
});

export const getUser = catchAsync(async (req,res,next)=>{
    const {id,role} = jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET);
    if(role === 'admin' || role === 'superAdmin' || id === req.params.id){
        const user = await User.findById(req.params.id).select('-__v,-password');
        return res.status(200).json({
            status:"success",
            data:{user},
        });
    }else{
        next(new HandleError("You are not authorized to perform this action",401));
    }
});

export const updateUser = catchAsync(async (req,res,next)=>{
    const {id,role} = jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET);
    if(role === 'admin' || role === 'superAdmin' || id === req.params.id){
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).select('-__v,-password');
        return res.status(200).json({
            status:"success",
            data:{user},
        });
    }else{
        next(new HandleError("you are not authorized to perform this action",401));
    }
});

export const deleteUser = catchAsync(async (req,res,next)=>{
    const {id,role} = jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRET);
    if(role === 'admin' || role === 'superAdmin' || id === req.params.id){
         await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status:"success",
            message:"user deleted successfully",
        });
    }else{
        next(new HandleError("you are not authorized to perform this action",401));
    }
});