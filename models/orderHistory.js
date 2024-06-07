import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    cart: {
        type: Object,
        required: [true, 'cart is required'],
    },
    userId: {
        type: String,
        required: [true, 'userId is required'],
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
    },
    bankTrackingCode: {
        type: String,
    },
    trackingCode: {
        type: String,
    },
}, { timestamps: true });

OrderSchema.post('save', function (next) {
    this.trackingCode = this._id;
    next();
});

const OrderHistory = mongoose.model('OrderHistory', OrderSchema);

export default OrderHistory