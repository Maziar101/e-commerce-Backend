import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    cart:{
        type: Object,
        required: [true,'cart is required'],
    },
    userId:{
        type:String,
        required: [true,'userId is required'],
    },
    status:{
        type:String,
        enum:['success','failed'],
    },
    bankTrackingCode:{
        type:String,
    },
    trackingCode:{
        type:Number,
        unique:true,
        default:1000,
    },
},{timestamps:true});

const OrderHistory = mongoose.model('OrderHistory',OrderSchema);

export default OrderHistory