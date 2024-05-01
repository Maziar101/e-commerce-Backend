import catchAsync from "../utils/CatchAsync";
import jwt from "jsonwebtoken"
import HandleError from "../utils/handleError";

const adminOrSuperAdmin = catchAsync(async (req,res,next)=>{
    const codeToken = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(codeToken,process.env.JWT_SECRET);
    if(!token){
        return new HandleError("Not Logged in",403);
    }
    if(token.role === 'admin' || token.role === 'superAdmin'){
        return next()
    }else{
        return new HandleError("You don't have permission",403);
    }
});

export default adminOrSuperAdmin