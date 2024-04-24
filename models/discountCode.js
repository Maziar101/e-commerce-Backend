import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        unique: [true,'Code already exists'],
    },
    startTime:{
        type:String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
},{timestamps:true});

const DiscountCode = mongoose.model('Discount Codes',DiscountSchema);
export default DiscountCode;