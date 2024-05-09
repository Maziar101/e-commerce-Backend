import catchAsync from "../utils/catchAsync.js";
import ApiFeatures from "../utils/apiFeatures.js";
import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";

export const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product, req.query)
    .filters()
    .limitFields()
    .paginate()
    .sort();
  const Products = await features.query;
  return res.status(200).json({
    status: "success",
    data: {
      Products,
    },
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  try{
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      data: { product },
    });
  }catch(err){
    next(new HandleError("Product Not Found", 404));
  }
  
});

export const createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "Product Created Successfully !",
    data: { newProduct },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body)
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(201).json({
    message: "product updated",
    status: "success",
    date: {
      product
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    status: "success",
    message: `Product With Id ${req.params.id} Deleted Successfully`,
  });
});
