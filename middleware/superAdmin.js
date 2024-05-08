import catchAsync from "../utils/CatchAsync.js";
import jwt from "jsonwebtoken"
import HandleError from "../utils/handleError.js";

const superAdmin = catchAsync(async (req,res,next)=>{
    const codeToken = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(codeToken,process.env.JWT_SECRET);
    if(!token){
        next(new HandleError("Not Logged in",403));
    }
    if(token.role === 'superAdmin'){
        next()
    }else{
        next(new HandleError("You don't have permission",403));
    }
});

export default superAdmin