import Cart from "../models/cartModel.js";
import OrderHistory from "../models/orderHistory.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

export const payment = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const cart = await Cart.findOne({ userId: id });
  if(cart){
    
  }
});

export const getAllOrderHistory = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(OrderHistory, req.query)
    .filters()
    .sort()
    .paginate()
    .limitFields();
  const orderHistory = await features.query;
  return res.status(200).json({
    status: "success",
    data: { orderHistory },
  });
});

export const getAllOrderHistoryForClient = catchAsync(
  async (req, res, next) => {
    const { id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const orderHistory = await OrderHistory.find({ userId: id });
    return res.status(200).json({
      status: "success",
      data: { orderHistory },
    });
  }
);
