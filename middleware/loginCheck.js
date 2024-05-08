import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken"
import HandleError from "../utils/handleError.js";

const loginCheck = catchAsync(async (req,res,next)=>{
    const codeToken = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(codeToken,process.env.JWT_SECRET);
    if(token){
        return next()
    }else{
        next(new HandleError("Not Logged in",403));
    }
});

export default loginCheck