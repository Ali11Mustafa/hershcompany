const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    productName: {
        type: String,
        unique: true
    },
    idImage: {
        type: String,
    },
    time: { type: Date, default: Date.now },
    stars: {
        type: Number
    },
    typeProduct: {
        type: String
    },
    sliderImage: [{
        type: String,
    }],
    image: [{
        type: String,
    }],
    backgroundImageForProduct: { //git commit -m "changes" 
        type: String, //git push origin master
        default: 'default.jpg'
    },
    // slug: String,
    price: {
        type: Number
    },
    description: {
        type: String
    },
    information: {
        type: String,
    },
    brandName: {
        type: String
    },
    hasViewd: {
        type: Number
    },
    fileSetUp: {
        type: String
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
}, { timestamps: true });

const Products = mongoose.model('Products', posterSchema);

module.exports = Products;