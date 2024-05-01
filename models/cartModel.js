import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    products:{type:Array,required:true},
    userId:{type:mongoose.Types.ObjectId,ref:'Users'},
    totalPrice:{
        type:Number,
        default:0,
    },
},{timeStamps:true});

CartSchema.pre('save',(next)=>{
    let total = 0;
    if(this.products.length>0){
        this.products.map((e)=>totalPrice+=e.price*(1-e.discount/100)*e.quantity);
    }
    this.totalPrice = total;
    next();
});

const Cart = mongoose.model('Cart',CartSchema);

export default Cart