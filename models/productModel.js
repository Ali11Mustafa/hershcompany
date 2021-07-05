const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    image: [{
        type: String,
    }],
    vedioUrl: {
        type: String
    },
    color: {
        type: String
    },
    description: {
        type: String
    },
    brandName: {
        type: String
    },
    hasViewd: {
        type: Number
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    subImage1: [{
        type: String,
    }],
    subImage2: [{
        type: String,
    }],
    subImage3: [{
        type: String,
    }],
    subImage4: [{
        type: String,
    }],
    time: { type: Date, default: Date.now },
}, { timestamps: true });

const Products = mongoose.model('Products', posterSchema);

module.exports = Products;