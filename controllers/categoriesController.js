const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getAllCategories = catchAsync(async(req, res, next) => {
    const AllCategories = await Categories.find().populate('products');

    //console.log(AllCategories);

    // SEND RESPONSE
    res.status(200).json({
        // 200 stands for its okay
        status: 'success',
        results: AllCategories.length, // for multiple Model
        data: {
            AllCategories
        }
    });
});

exports.getOneCategorey = catchAsync(async(req, res, next) => {
    const OneCategorey = await Categories.findById(req.params.id).populate('products');

    //console.log(AllCategories);

    // SEND RESPONSE
    res.status(200).json({
        // 200 stands for its okay
        status: 'success',
        results: OneCategorey.length, // for multiple Model
        data: {
            OneCategorey
        }
    });
});

// exports.createCategorey = catchAsync(async (req, res, next) => {

//    const newProduct = await Product.create(req.body);

//    await Categories.updateMany({ '_id': newProduct.categories }, { $push: { products: newProduct._id } });

//    res.status(201).json({
//      // 201 stands for to create new tour
//      status: 'success',
//      data: {
//        data: newProduct
//      }
//    });
// });


// exports.deleteProduct = catchAsync(async (req, res, next) => {
//   const _id = req.params.id;
//   const product = await Product.findOne({ _id });

//   await product.remove();

//   await Categories.updateMany({ '_id': product.categories }, { $pull: { products: product._id } });

//   res.status(204).json({
//     // 204 stands for delete
//     status: 'success',
//     data: null
//   });

// });



//exports.getCategory = factory.getOne(Categories);
//exports.getAllCategories = factory.getAll(Categories);
exports.createCategorey = factory.createOne(Categories);
exports.deleteCategorey = factory.deleteOne(Categories);
//exports.updateCategory = factory.updateOne(Categories);