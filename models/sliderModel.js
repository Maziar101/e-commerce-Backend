import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'slider field can not be empty'],
        unique: [true,'slider already exists'],
        trim: true,
    },
    image:{
        type: String,
    },
});

const Slider = mongoose.model('Slider',sliderSchema);
export default Slider;