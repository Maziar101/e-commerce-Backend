import Comments from "../models/commentModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../utils/handleError.js";

export const addComments = catchAsync(async (req, res, next) => {
  const comment = await Comments.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "comment submit successfully",
  });
});

export const getAllComment = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comments, req.query)
    .sort()
    .filters()
    .limitFields()
    .paginate();
  const comments = await features.query;
  return res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

export const removeComments = catchAsync(async (req, res, next) => {
  const { id, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (role === "admin" || role === "superAdmin") {
    const comment = await Comments.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "comment deleted successfully",
    });
  } else {
    const comment = await Comments.findById(req.params.id);
    if (comment.authorId == id) {
      const comment = await Comments.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: "success",
        message: "comment deleted successfully",
      });
    } else {
      next(
        new HandleError("you dont have permission to delete this comment", 401)
      );
    } 
  }
});

export const addReplay = catchAsync(async(req,res,next)=>{
  const {id:commentId} = req.params;
  const replayComment = await Comments.findByIdAndUpdate(commentId,{
    $push:{
      replay:req.body,
    },
  },{new:true});
  return res.status(200).json({
    status:"success",
    data:{replayComment},
  });
});