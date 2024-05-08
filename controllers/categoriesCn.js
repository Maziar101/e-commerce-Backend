import catchAsync from "../utils/catchAsync.js";
import Category from "../models/categoryModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const getAllCategories = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query)
    .filters()
    .sort()
    .limitFields()
    .paginate();
  const categories = await features.query;
  return res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

export const createCategories = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "category created successfully",
    data: { category },
  });
});

export const updateCategories = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(201).json({
    status: "success",
    message: "Category Has Updated",
    data: {
      category,
    },
  });
});

export const deleteCategories = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    status: "success",
    message: "Category Deleted Successfully",
  });
});
