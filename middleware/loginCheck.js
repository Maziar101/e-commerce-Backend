import catchAsync from "../utils/CatchAsync";
import jwt from "jsonwebtoken"
import HandleError from "../utils/handleError";

const loginCheck = catchAsync(async (req,res,next)=>{
    const codeToken = req.headers.authorization.split(" ")[1];
    const token = jwt.verify(codeToken,process.env.JWT_SECRET);
    if(token){
        return next()
    }else{
        new HandleError("Not Logged in",403);
    }
});

export default loginCheck