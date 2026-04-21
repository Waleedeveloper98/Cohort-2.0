import mongoose from 'mongoose';

export const priceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ["PKR", "USD", "GBP"],
        default: "PKR"
    }
}, {
    _id: false,
    _v: false
})