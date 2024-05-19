import Cart from "../models/cartModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../utils/handleError.js";

export const getCart = catchAsync(async () => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const cart = await Cart.findOne({ userId: id });
  if (cart?.products?.length > 0) {
    return res.status(200).json({
      status: "success",
      data: { cart },
    });
  } else {
    return res.status(200).json({
      status: "failed",
      message: "your cart is empty",
    });
  }
});

export const updateCart = catchAsync(async () => {
  if (req.body.product && req.body.quantity) {
    const { id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ userId: id });
    let products;

    if (req.body.quantity == 1 && cart?.products?.length > 0) {
      let add = false;
      products = cart.products?.map((e) => {
        if (e._id === req.body.product._id) {
          e.pQuantity = e.pQuantity + 1;
          add = true;
          return e;
        } else {
          return e;
        }
      });
      if (!add) {
        products = [...cart.products,{...req.body.product,pQuantity:1}]
      }
    } else if (req.body.quantity == -1 && cart.products.length > 0) {
      products = cart.products.filter((e) => {
        if (e._id === req.body.product._id) {
          e.pQuantity = e.pQuantity - 1;
          if (e.pQuantity > 0) {
            return e;
          }
          return false;
        } else {
          return true;
        }
      });
    } else {
      products = [{ ...req.body.product, pQuantity: 1 }];
    }
    const newCart = Cart.findByIdAndUpdate(
      cart._id,
      { products },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: {
        cart: newCart,
      },
    });
  } else {
    next(new HandleError("invalid property"));
  }
});

export const deleteCart = catchAsync(async () => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  await Cart.findByIdAndUpdate({userId:id},{products:[]});
  return res.status(200).json({
    status:"success",
    message:"cart deleted successfully",
  });
});
