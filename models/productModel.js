import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "name is already exists"],
  },
  description:{
    type:String,
    required: [true, "description is required"],
  },
  images:{
    type:[String],
    required: [true, "images is required"],
  },
  price:{
    type:Number,
    min:[0,"price must be greater than zero"],
    required:[true,"price is required"],
  },
  quantity:{
    type:Number,
    min:[0,"quantity must be greater than zero"],
    required:[true,"quantity is required"],
  },
  categoryId:{type:String,required:[true,"categoryId is required"]},
  slug:{
    type:String,
  },
  discount:{
    type:Number,
    min:0,
    max:100,
    validate:{
      validator:(value)=>{
        return value <= 100;
      },message:'max discount is 100'
    }
  },
  startDiscount:{
    type:String,
  },
  endDiscount:{
    type:String,
  },
  tags:{
    type:[String],
  },
},{timestamps:true});

const Product = mongoose.model("Products", productSchema);

export default Product;
