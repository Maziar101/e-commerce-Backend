import Cart from "../models/cartModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../utils/handleError.js";

export const getCart = catchAsync(async () => {});

export const updateCart = catchAsync(async () => {
  if (req.body.product && req.body.quantity) {
    let products;
    const { id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ userId: id });
    if (req.body.quantity == 1) {
      let add = false;
      products = cart.products.map((e) => {
        if (e._id === req.body.product.id) {
          e.pQuantity = e.pQuantity + 1;
          add = true;
          return e;
        } else {
          return e;
        }
      });
      if (!add) {
        cart.product.push({ ...req.body.product, pQuantity: 1 });
      }
    } else {
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
    }
    const newCart = Cart.findByIdAndUpdate(
      cart._id,
      { ...cart, products},
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

export const deleteCart = catchAsync(async () => {});
