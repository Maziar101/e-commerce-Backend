import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: [true, 'This email is already exists'],
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm, 'email is invalid'],
        trim: true,
    },
    username: {
        type: String,
        required: [true,'Username is required'],
        unique: [true,'Username already exists'],
        match: [/^[a-z0-9_-]{3,15}$/gm,'username is invalid'],
        trim: true,
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,'password is invalid'],
        minlength: 8,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: [true,'The Phone Number is already exists'],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,'phone is invalid'],
        trim: true,
    },
    address: {
        type: String,
    },
    role:{
        type: String,
        enum: ['admin','user','superAdmin'],
        default: 'user',
        trim: true,
    },
    token: {
        type: Number,
    },
    expireTime:{
        type:Number,
    },
},{timestamps:true});

const User = mongoose.model('Users',userSchema);
export default User