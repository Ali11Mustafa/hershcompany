const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true },
    products: [{ type: mongoose.Schema.ObjectId, ref: 'Products' }],
}, { timestamp: true });

const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;