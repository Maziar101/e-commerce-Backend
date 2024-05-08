import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken"
import HandleError from "../utils/handleError.js";

const adminOrSuperAdmin = catchAsync(async (req,res,next)=>{
    
    const codeToken = req.headers.authorization.split(" ")[1];
    console.log(process.env.JWT_SECRET)
    const token = jwt.verify(codeToken,process.env.JWT_SECRET);

    if(!token){
        next(new HandleError("Not Logged in",403));
    }
    if(token.role === 'admin' || token.role === 'superAdmin'){
        return next()
    }else{
        next(new HandleError("You don't have permission",403));
    }
});

export default adminOrSuperAdmin