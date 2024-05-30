import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = catchAsync(async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        new HandleError('please provide username and password',400)
    };

    const user = await User.findOne({username});
    if(!user){
        new HandleError('username or password is incorrect',401);
    };
    const validPass = bcryptjs.compareSync(password, user.password);
    if(!validPass){
        new HandleError('username or password is incorrect',401);
    };
    
    const {password:hashPass,...userOthers} = user._doc;

    const sendMessage = await fetch("https://api.limosms.com/api/sendcode",{
        method: "POST",
        headers:{
           'Content-Type':'application/json',
           ApiKey: process.env.SMS_KEY,
        },
        body:JSON.stringify({
            Mobile: userOthers.phone,
            Footer: "خوش آمدید",
        }),
    });
    const messageData = await sendMessage.json();
    if(messageData.success){
        return res.status(200).json({
            status:"success",
            message:messageData.message,
        });
    }else{
        return res.status(400).json({
            status:"failed",
            message: messageData.message,
        });
    };
});

export const register = catchAsync(async (req,res,next)=>{
    const {password, ...others} = req.body;
    const newPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({...others,password:newPassword});
    const newCart = await Cart.create({userId:newUser._id,products:[]});
    
    return res.status(201).json({
        status: "success",
        message: "register successfully",
    });
});

export const otp = catchAsync(async (req,res,next)=>{
    const {code,phone} = req.body;
    const user = await User.findOne({phone});
    const isValidCode = await fetch("https://api.limosms.com/api/checkcode",{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            ApiKey: process.env.SMS_KEY,
        },
        body:JSON.stringify({
            Mobile:phone,
            code,
        }),
    });
    const messageRes = await isValidCode.json();
    if(messageRes.success){
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
        return res.status(200).json({
            status: "success",
            data:{
                token,
                user:user.username,
            },
            message: "login successfully",
        });
    }else{
        return res.status(400).json({
            status: "failed",
            message: messageRes.message,
        });
    };
});