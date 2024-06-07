import Cart from "../models/cartModel.js";
import OrderHistory from "../models/orderHistory.js";
import ApiFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../utils/handleError.js";
import Product from "../models/productModel.js";
import DiscountCode from "../models/discountCode.js";

export const payment = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const cart = await Cart.findOne({ userId: id });
  let update = false;
  let newProducts = [];
  let total = 0;
  let discountCode;
  if (cart.total <= 0) {
    return next(new HandleError('cart is empty', 400));
  };
  for (let pr of cart.products) {
    const product = await Product.findById(pr._id);
    if (product.quantity == 0) {
      update = true;
      message.push(`${product.name} not exist`);
      continue
    };
    if (product.quantity < pr.pQuantity) {
      update = true;
      pr.pQuantity = product.quantity;
      message.push(`${product.name} not enough in shop and quantity changed`)
    };
    if (product.price !== pr.price) {
      update = true;
      pr.price = product.price;
      message.push(`${product.name} price changed`);
    };
    total += (pr.price * (1 - product.discount / 100)) * pr.pQuantity;
    newProducts.push(pr);
  };
  if (update) {
    const newCart = Cart.findByIdAndUpdate(cart._id, { products: newProducts, total }, { new: true });
    return res.status(400).json({
      status: "failed",
      message,
      cart: newCart,
    });
  };
  if (req.body.discountCode) {
    try{
      discountCode = await DiscountCode.findOne({ code: req.body.discountCode });
      if(discountCode.endTime < new Date.getTime() || discountCode.startTime  > new Date.getTime()){
        return next(new HandleError('is not vaild currently',400));
      }
    }catch(err){
      return next(new HandleError('discount code incorrect',400));
    };
  };
  const order = await OrderHistory.create({
    userId: id,
    cart,
    status:'success',
  });
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
