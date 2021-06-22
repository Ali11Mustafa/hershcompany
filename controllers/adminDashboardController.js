const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createProductWithAdminDashboard = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body);

    const doc = await Categories.updateMany({ _id: newProduct.categories }, { $push: { products: newProduct._id } });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    } else {
        res.redirect('/admin_dashboard');
    }
});

exports.deleteProductWithAdminDashboard = catchAsync(async (req, res, next) => {
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

exports.updateProductWithAdminDashboard = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const {
        productName,
        sliderImage,
        image,
        subImage1,
        subImage2,
        subImage3,
        subImage4,
        backgroundImageForProduct,
        categories,
        description,
        price,
        time,
        brandName,
        information,
        fileSetUp
    } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    const oldCategoryId = updateProduct.categories._id;
    console.log(oldCategoryId);



    const doc = await Categories.updateOne(
        {
            products: {
                _id: id
            }
        },
        {
            $set: {
                productName: productName,
                image: image,
                subImage1: subImage1,
                subImage2: subImage2,
                subImage3: subImage3,
                subImage4: subImage4,
                time: time,
                backgroundImageForProduct: backgroundImageForProduct,
                description: description,
                sliderImage: sliderImage,
                categories: categories,
                brandName: brandName,
                information: information,
                fileSetUp: fileSetUp,
                price: price,
            }
        }
    );


    res.redirect('/admin_dashboard');

});

// exports.getProduct = factory.getOne(Product);
// exports.getAllProducts = factory.getAll(Product);
// //exports.createProduct = factory.createOne(Product);
// exports.deleteProduct = factory.deleteOne(Product);
// exports.updateProduct = factory.updateOne(Product);