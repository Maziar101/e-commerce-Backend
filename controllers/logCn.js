import Log from "../models/logModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllLog = catchAsync(async (req,res,next)=>{
    const features = new ApiFeatures(Log,req.query).filters().sort().paginate().limitFields();
    const logs = await features.query;
    return res.status(200).json({
        status:"success",
        data:{logs},
    });
});