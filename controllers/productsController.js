const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Get Recent Products for shop
exports.getRecentProducts = catchAsync(async (req, res, next) => {

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


exports.createProduct = catchAsync(async (req, res, next) => {

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




exports.updateProductWithAdminDashboard = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    //const product = await Product.findOne({ _id });
    const { productName, categories, description, price, brandName, information, fileSetUp } = req.body;
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
                description: description,
                categories: categories,
                brandName: brandName,
                information: information,
                fileSetUp: fileSetUp,
                price: price,
            }
        }
    );


    res.status(200).json({
        status: 'success',
        data: {
            newProduct: updateProduct,
            newCategory: doc,
        }
    });

});




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