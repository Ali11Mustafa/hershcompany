const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Get Recent Products for shop
exports.getRecentProducts = catchAsync(async(req, res, next) => {

    const products = await Product.find().populate('categories').sort({ _id: -1 }).limit(3); //-_id

    //console.log(products);

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            recentProducts: products
        }
    });
});


exports.createProduct = catchAsync(async(req, res, next) => {

    const newProduct = await Product.create(req.body);

    await Categories.updateMany({ '_id': newProduct.categories }, { $push: { products: newProduct._id } });

    res.status(201).json({
        // 201 stands for to create new tour
        status: 'success',
        data: {
            data: newProduct
        }
    });
});


exports.createProductWithAdminDashboard = catchAsync(async(req, res, next) => {
    const newProduct = await Product.create(product);
    const doc = '';
    if (newProduct) {
        doc = await Categories.updateMany({ '_id': newProduct.categories }, { $push: { products: newProduct._id } });
        res.redirect('/admin_dashboard');
    } else if (!doc) {
        console.log('here');
        return next(new AppError('No document found with that ID', 404));

    } else {
        res.redirect('/admin_dashboard');
    }
});


exports.deleteProductWithAdminDashboard = catchAsync(async(req, res, next) => {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });

    await product.remove();

    const doc = await Categories.updateMany({ '_id': product.categories }, { $pull: { products: product._id } });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    } else {
        res.redirect('/admin_dashboard'); // agadar ba pewista wa be agar na refersh nabitawa zor mwhima wakw framwork ish daka refersh daka
    }
});


// exports.updateProductWithAdminDashboard = catchAsync(async(req, res, next) => {
//     const _id = req.params.id;
//     //const { product } = req.body;
//     const newProduct = new Product({
//         productName: productName,
//         categories: categories
//     })

//     const newProduct2 = await Product.create(newProduct);

//     console.log(newProduct2)
///const newCategories = product.categories || [];

// const oldProduct = await Product.findOne({ _id });
// const oldCategories = oldProduct.categories;

// Object.assign(oldProduct, product);
// const newProduct = await oldProduct.save();

// const added = difference(newCategories, oldCategories);
// const removed = difference(oldCategories, newCategories);
// await Categories.updateMany({ '_id': added }, { $addToSet: { products: foundProduct._id } });
// await Categories.updateMany({ '_id': removed }, { $pull: { products: foundProduct._id } });

//     res.status(201).json({
//         // 201 stands for to create new tour
//         status: 'success',
//         data: {
//             data: newProduct2
//         }
//     });
// });

// function difference(A, B) {
//     const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
//     const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];

//     const result = [];
//     for (const p of arrA) {
//         if (arrB.indexOf(p) === -1) {
//             result.push(p);
//         }
//     }

//     return result;
// }




// begora
// exports.deleteProduct = catchAsync(async (req, res, next) => {
//   const _id = req.params.id;
//   const product = await Product.findOne({ _id });

//   await product.remove();

//   await Categories.updateMany({ '_id': product.categories }, { $pull: { products: product._id } });


//    res.status(204).json({
//      // 204 stands for delete
//      status: 'success',
//      data: null
//    });

// });




exports.getProduct = factory.getOne(Product);
exports.getAllProducts = factory.getAll(Product);
//exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
//exports.updateProduct = factory.updateOne(Product);