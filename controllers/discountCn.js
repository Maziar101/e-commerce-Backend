import DiscountCode from "../models/discountCode.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import HandleError from "../utils/handleError.js";

export const getAllDiscount = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(DiscountCode, req.query)
    .filters()
    .limitFields()
    .sort()
    .paginate();
  const Discounts = await features.query;
  return res.status(200).json({
    status: "success",
    data: { Discounts },
  });
});

export const getDiscountById = catchAsync(async (req,res,next)=>{
  try{
    const discount = await DiscountCode.findById(req.params.id);
    return res.status(200).json({
      status:"success",
      data:{
        discount,
      },
    });
  }catch(err){
    next(new HandleError("No Dicount Found with id "+req.params.id));
  }
});

export const createDiscount = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "Discount Code Created Successfully",
    data: { discountCode },
  });
});

export const updateDiscount = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    status: "success",
    message: `Discount Code With Id ${req.params.id} Updated Successfully`,
    data: { discountCode },
  });
});

export const deleteDiscount = catchAsync(async (req, res, next) => {
  const discountCode = await DiscountCode.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    status: "success",
    message: `Discount Code With Id ${req.params.id} Deleted Successfully`,
  });
});

export const validateDiscount = catchAsync(async(req,res,next)=>{
  const {code} = req.body;
    let discount = await DiscountCode.findOne({code});
    const time = new Date().getTime();
    if(!discount){
      next(new HandleError("code invalid",400));
    }else if(time<discount.startTime){
      next(new HandleError("code not started",400));
    };
    if (time>discount.endTime){
      next(new HandleError("code expired",400));
    }else{
      res.status(200).json({
        status:"success",
        data: {
          discountPercent:discount.percentNum
        },
        message:"discount code valid",
      });
    };
});