const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.createProductWithAdminDashboard = catchAsync(async (req, res, next) => {
    const productName = req.body.productName;
    const sliderImage = req.files['sliderImage'][0];
    const image = req.files['image'][0];
    const subImage1 = req.files['subImage1'][0];
    const subImage2 = req.files['subImage2'][0];
    const subImage3 = req.files['subImage3'][0];
    const subImage4 = req.files['subImage4'][0];
    const backgroundImageForProduct = req.files['backgroundImageForProduct'][0];
    const categories = req.body.categories;
    const description = req.body.description;
    const price = req.body.price;
    const time = req.body.time;
    const brandName = req.body.brandName;
    const information = req.body.information;
    const fileSetUp = req.body.fileSetUp;
    ////////////////////////////////////////////////////////////////////////
    const imageUrl = image.path;
    const sliderImageUrl = sliderImage.path
    const backgroundImageForProductUrl = backgroundImageForProduct.path;
    const subImage1Url = subImage1.path;
    const subImage2Url = subImage2.path;
    const subImage3Url = subImage3.path;
    const subImage4Url = subImage4.path;
    console.log(imageUrl);

    const product = new Product({
        productName: productName,
        sliderImage: sliderImageUrl,
        image: imageUrl,
        subImage1: subImage1Url,
        subImage2: subImage2Url,
        subImage3: subImage3Url,
        subImage4: subImage4Url,
        backgroundImageForProduct: backgroundImageForProductUrl,
        categories: categories,
        description: description,
        price: price,
        time: time,
        brandName: brandName,
        information: information,
        fileSetUp: fileSetUp,
    });

    const newProduct = await Product.create(product);
    const doc = await Categories.updateMany({ _id: newProduct.categories }, { $push: { products: newProduct._id } });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    } else {
        res.redirect('/admin_dashboard');
    }
});

// exports.createProductWithAdminDashboard = catchAsync(async (req, res, next) => {

//     const newProduct = await Product.create(req.body);

//     const doc = await Categories.updateMany({ _id: newProduct.categories }, { $push: { products: newProduct._id } });

//     if (!doc) {
//         return next(new AppError('No document found with that ID', 404));
//     } else {
//         res.redirect('/admin_dashboard');
//     }
// });

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