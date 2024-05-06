import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }, 
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Object,
        required: true,
    }, category: {
        type: String,
        required: true
    }, checked: {
        type: Boolean,
        default: false,
    }, sold: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

export const Product = mongoose.model('Product', ProductSchema);