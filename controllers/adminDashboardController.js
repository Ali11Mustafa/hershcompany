const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createProductWithAdminDashboard = catchAsync(async(req, res, next) => {
    const newProduct = await Product.create(req.body);

    const doc = await Categories.updateMany({ _id: newProduct.categories }, { $push: { products: newProduct._id } });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    } else {
        res.redirect('/admin_dashboard');
    }
});

exports.deleteProductWithAdminDashboard = catchAsync(async(req, res, next) => {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });

    await product.remove();

    const doc = await Categories.updateMany({ _id: product.categories }, { $pull: { products: product._id } });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    } else {
        res.redirect('/admin_dashboard'); // agadar ba pewista wa be agar na refersh nabitawa zor mwhima wakw framwork ish daka refersh daka
    }
});

// exports.getProduct = factory.getOne(Product);
// exports.getAllProducts = factory.getAll(Product);
// //exports.createProduct = factory.createOne(Product);
// exports.deleteProduct = factory.deleteOne(Product);
// exports.updateProduct = factory.updateOne(Product);