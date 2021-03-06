const Product = require('./../models/productModel');
const Categories = require('./../models/categoriesModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const fileHelper = require('../utils/file');
const fs = require('fs')



/* if (
    !req.files['image'] ||
    !req.files['sliderImage'] ||
    !req.files['subImage1'] ||
    !req.files['subImage2'] ||
    !req.files['subImage3'] ||
    !req.files['backgroundImageForProduct'] ||
    !req.files['subImage4']
) {
    return res.render('admin_dashboard/addProduct', {
        categories: categoriesError,
        hasError: true,
        product: {
            productName,
            categories,
            price,
            time,
            brandName,
            information,
            fileSetUp
        },
        errorMessage: 'Please insert a picture.',
    });
} */


exports.createProductWithAdminDashboard = async (req, res, next) => {
    const productName = req.body.productName;
    const categories = req.body.categories;
    const description = req.body.description;
    const price = req.body.price;
    const time = req.body.time;
    const brandName = req.body.brandName;
    const information = req.body.information;
    let fileSetUpUrl = '';
    if (req.files['fileSetUp']) {
        fileSetUpUrl = req.files['fileSetUp'][0].path;
    }
    let sliderImageUrl = '';
    if (req.files['sliderImage']) {
        sliderImageUrl = req.files['sliderImage'][0].path;
    }
    let imageUrl = '';
    if (req.files['image']) {
        imageUrl = req.files['image'][0].path;
    }
    let subImage1Url = '';
    if (req.files['subImage1']) {
        subImage1Url = req.files['subImage1'][0].path;
    }
    let subImage2Url = '';
    if (req.files['subImage2']) {
        subImage2Url = req.files['subImage2'][0].path;
    }
    let subImage3Url = '';
    if (req.files['subImage3']) {
        subImage3Url = req.files['subImage3'][0].path;
    }
    let subImage4Url = '';
    if (req.files['subImage4']) {
        subImage4Url = req.files['subImage4'][0].path;
    }
    let backgroundImageForProductUrl = '';
    if (req.files['backgroundImageForProduct']) {
        backgroundImageForProductUrl = req.files['backgroundImageForProduct'][0].path;
    }
    ////////////////////////////////////////////////////////////////////////
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
        fileSetUp: fileSetUpUrl,
    });

    const newProduct = await Product.create(product);

    const doc = await Categories.updateMany({ _id: newProduct.categories }, { $push: { products: newProduct._id } });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    } else {
        res.redirect('/admin_dashboard');
    }
};


exports.deleteProductWithAdminDashboard = async (req, res, next) => {
    const _id = req.body.productId;
    const product = await Product.findOne({ _id });

    if (product) {
        deleteFileFunction();
    }

    function deleteFileFunction() {
        setTimeout(function () {
            fileHelper.deleteFile(product.image);
            fileHelper.deleteFile(product.fileSetUp);
            fileHelper.deleteFile(product.backgroundImageForProduct);
            fileHelper.deleteFile(product.sliderImage);
            fileHelper.deleteFile(product.subImage1);
            fileHelper.deleteFile(product.subImage2);
            fileHelper.deleteFile(product.subImage3);
            fileHelper.deleteFile(product.subImage4);
        }, 10000);
    }

    const detailDelete = await product.remove();

    if (detailDelete) {
        const doc = await Categories.updateMany({ _id: product.categories }, { $pull: { products: product._id } });
        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        } else {
            res.redirect('/admin_dashboard');// agadar ba pewista wa be agar na refersh nabitawa zor mwhima wakw framwork ish daka refersh daka
        }
    }
};

exports.deleteSubImage1 = async (req, res, next) => {
    const _id = req.params.id;
    console.log(_id)
    console.log("hello");
    const product = await Product.findById(_id).then(pro => {
        if (pro.subImage1) {
            fileHelper.deleteFile(pro.subImage1, function (err) {
                if (err) {
                    next();
                }
            });
        }
        // function deleteFileFunction() {
        //     setTimeout(function () {
        //         fileHelper.deleteFile(pro.subImage1);
        //     }, 10000);
        // }
        console.log(pro.subImage1);
        pro.subImage1 = '';
        return pro.save();
    });
    console.log("new" + product)
    if (product) {
        res.redirect('/admin_dashboard/update-product/' + _id);
    }
};



exports.updateProductWithAdminDashboard = async (req, res, next) => {
    const id = req.params.id;
    const productName = req.body.productName;
    let fileSetUpUrl = '';
    if (req.files['fileSetUp']) {
        fileSetUpUrl = req.files['fileSetUp'][0].path;
    }
    let sliderImageUrl = '';
    if (req.files['sliderImage']) {
        sliderImageUrl = req.files['sliderImage'][0].path;
    }
    let imageUrl = '';
    if (req.files['image']) {
        imageUrl = req.files['image'][0].path;
    }
    let subImage1Url = '';
    if (req.files['subImage1']) {
        subImage1Url = req.files['subImage1'][0].path;
    }
    let subImage2Url = '';
    if (req.files['subImage2']) {
        subImage2Url = req.files['subImage2'][0].path;
    }
    let subImage3Url = '';
    if (req.files['subImage3']) {
        subImage3Url = req.files['subImage3'][0].path;
    }
    let subImage4Url = '';
    if (req.files['subImage4']) {
        subImage4Url = req.files['subImage4'][0].path;
    }
    let backgroundImageForProductUrl = '';
    if (req.files['backgroundImageForProduct']) {
        backgroundImageForProductUrl = req.files['backgroundImageForProduct'][0].path;
    }

    //const categories = req.body.categories;
    const description = req.body.description;
    const price = req.body.price;
    const time = req.body.time;
    const brandName = req.body.brandName;
    const information = req.body.information;
    ////////////////////////////////////////////////////////////////////////
    await Product.findById(req.params.id)
        .then(product => {
            product.productName = productName;
            product.price = price;
            product.description = description;
            product.time = time;
            product.brandName = brandName;
            product.information = information;
            if (fileSetUpUrl) {
                if (product.fileSetUp) {
                    fileHelper.deleteFile(product.fileSetUp, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.fileSetUp = fileSetUpUrl;
            }
            //product.categories = categories;
            if (sliderImageUrl) {
                if (product.sliderImage) {
                    fileHelper.deleteFile(product.sliderImage, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.sliderImage = sliderImageUrl;
            }
            if (imageUrl) {
                if (product.imageUrl) {
                    fileHelper.deleteFile(product.imageUrl, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.image = imageUrl;
            }
            if (backgroundImageForProductUrl) {
                if (product.backgroundImageForProduct) {
                    fileHelper.deleteFile(product.backgroundImageForProduct, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.backgroundImageForProduct = backgroundImageForProductUrl;
            }
            if (subImage1Url) {
                if (product.subImage1[0]) {
                    fileHelper.deleteFile(product.subImage1, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.subImage1 = subImage1Url;
            }
            if (subImage2Url) {
                if (product.subImage2) {
                    fileHelper.deleteFile(product.subImage2, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.subImage2 = subImage2Url;
            }
            if (subImage3Url) {
                if (product.subImage3) {
                    fileHelper.deleteFile(product.subImage3, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.subImage3 = subImage3Url;
            }
            if (subImage4Url) {
                if (product.subImage4) {
                    fileHelper.deleteFile(product.subImage4, function (err) {
                        if (err) {
                            next();
                        }
                    });
                }
                product.subImage4 = subImage4Url;
            }
            return product.save().then(result => {
            });
        }).catch(err => {
        });

    let productNameUpdate = '';
    let imageUpdate = '';
    let subImage1Update = '';
    let subImage2Update = '';
    let subImage3Update = '';
    let subImage4Update = '';
    let backgroundImageForProductUpdate = '';
    let descriptionUpdate = '';
    let sliderImageUpdate = '';
    let brandNameUpdate = '';
    let informationUpdate = '';
    let priceUpdate = '';
    //let categoriesUpdate = '';
    let timeUpdate = '';
    let fileSetUpUpdate = '';

    await Product.findById(id)
        .then(product => {
            productNameUpdate = product.productName;
            imageUpdate = product.image;
            subImage1Update = product.subImage1;
            subImage2Update = product.subImage2;
            subImage3Update = product.subImage3;
            subImage4Update = product.subImage4;
            backgroundImageForProductUpdate = product.backgroundImageForProduct;
            sliderImageUpdate = product.sliderImage;
            brandNameUpdate = product.brandName;
            priceUpdate = product.price;
            informationUpdate = product.information;
            descriptionUpdate = product.description;
            //categoriesUpdate = product.categories;
            timeUpdate = product.timeUpdate;
            fileSetUpUpdate = product.fileSetUp;
        });


    const doc = await Categories.updateOne(
        {
            products: {
                _id: id
            }
        },
        {
            $set: {
                productName: productNameUpdate,
                image: imageUpdate,
                subImage1: subImage1Update,
                subImage2: subImage2Update,
                subImage3: subImage3Update,
                subImage4: subImage4Update,
                time: timeUpdate,
                backgroundImageForProduct: backgroundImageForProductUpdate,
                description: descriptionUpdate,
                sliderImage: sliderImageUpdate,
                //categories: categoriesUpdate,
                brandName: brandNameUpdate,
                information: informationUpdate,
                fileSetUp: fileSetUpUpdate,
                price: priceUpdate
            }
        }
    );
    if (doc) {
        res.redirect('/admin_dashboard');
    }
};