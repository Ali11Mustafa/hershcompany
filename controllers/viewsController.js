const Allviews = require('../models/viewsModel');
const Products = require('../models/productModel');
const Categories = require('../models/categoriesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.products = catchAsync(async (req, res) => {
    await Allviews.updateOne({ $inc: { homePageHasView: 1 } });

    const featuredProduct = await Products.find({}).populate('categories')
        .sort({ _id: -1 })
        .limit(8);

    const sliderProduct = await Products.find({}).populate('categories')
        .sort({ _id: -1 })
        .limit(3);

    let posSystems;
    const posSystemCategorey = await Categories.find({
        name: { $eq: 'posSystem' }
    }).populate('products');
    posSystemCategorey.forEach(function (categorey) {
        posSystems = categorey.products
            .reverse()
            .slice(0, 8);
    });

    let receiptPrinters;
    const receiptPrinterCategorey = await Categories.find({
        name: { $eq: 'receiptPrinter' }
    }).populate('products');
    receiptPrinterCategorey.forEach(function (categorey) {
        receiptPrinters = categorey.products.reverse().slice(0, 8);
    });

    let barcodePrinters;
    const barcodePrinterCategorey = await Categories.find({
        name: { $eq: 'barcodePrinter' }
    }).populate('products');
    barcodePrinterCategorey.forEach(function (categorey) {
        barcodePrinters = categorey.products.reverse().slice(0, 8);
    });

    let scanners;
    const scannerCategorey = await Categories.find({
        name: { $eq: 'scanner' }
    }).populate('products');
    scannerCategorey.forEach(function (categorey) {
        scanners = categorey.products.reverse().slice(0, 8);
    });

    let dummyProducts;
    const dummyProductCategorey = await Categories.find({
        name: { $eq: 'dummyProduct' }
    }).populate('products');
    dummyProductCategorey.forEach(function (categorey) {
        dummyProducts = categorey.products.reverse().slice(0, 2);
    });

    let specialProducts;
    const specialProductCategorey = await Categories.find({
        name: { $eq: 'specialProduct' }
    }).populate('products');
    specialProductCategorey.forEach(function (categorey) {
        specialProducts = categorey.products.reverse().slice(0, 3);
    });

    let wirelessCallingProducts;
    const wirelessCallingProductCategorey = await Categories.find({
        name: { $eq: 'wirelessCallingProduct' }
    }).populate('products');
    wirelessCallingProductCategorey.forEach(function (categorey) {
        wirelessCallingProducts = categorey.products.reverse().slice(0, 3);
    });

    console.log(scanners);

    //const views = await Allviews.find({});
    res.status(200).render('pages/index', {
        posSystems: posSystems,
        receiptPrinters: receiptPrinters,
        barcodePrinters: barcodePrinters,
        scanners: scanners,
        sliderProducts: sliderProduct,
        featuredProducts: featuredProduct,
        dummyProducts: dummyProducts,
        specialProducts: specialProducts,
        wirelessCallingProducts: wirelessCallingProducts
    });
});

exports.adminDashboard = catchAsync(async (req, res, next) => {
    const products = await Products.find().populate('categories', 'name'); //-_id
    const categories = await Categories.find().populate('products'); //-_id
    // SEND RESPONSE
    res.status(200).render('pages/admin_dashboard', {
        products,
        categories
    });
});

exports.addProductWithAdminDashboard = catchAsync(async (req, res, next) => {
    const categories = await Categories.find().populate('products'); //-_id

    // SEND RESPONSE
    res.status(200).render('admin_dashboard/addProduct', {
        categories,
        errorMessage: ''
    });
});


exports.updateProductWithAdminDashboard = catchAsync(async (req, res, next) => {
    let id = req.params.id;

    const categories = await Categories.find().populate('products'); //-_id

    const getOneProduct = await Products.find({
        _id: {
            $eq: id
        }
    }).populate('categories', 'name');

    console.log(getOneProduct);

    // SEND RESPONSE
    res.status(200).render('admin_dashboard/editProduct', {
        product: getOneProduct,
        categories
    });
});


exports.sigleProduct = catchAsync(async (req, res, next) => {
    let id = req.query.id;
    let categoreyId = req.query.categoreyId;

    const getOneProduct = await Products.find({
        _id: {
            $eq: id
        }
    }).populate('categories', 'name');
    console.log(getOneProduct);



    const productsByCategory = await Products.find({
        categories: { _id: categoreyId }
    })
        .populate('categories', 'name')
        .limit(3);

    //console.log(productsByCategory);

    // SEND RESPONSE
    res.status(200).render('pages/single_product', {
        product: getOneProduct,
        relatedProducts: productsByCategory
    });
});

exports.search = catchAsync(async (req, res, next) => {
    const regex = new RegExp(`${req.query.dsearch}`, 'gi');
    const searchFor = req.query.dsearch;


    const findRes = await Products.find({
        productName: { $regex: regex }
    }).populate('categories', 'name').limit(14);

    console.log(findRes);

    res.status(200).render('pages/search', {
        title: 'all',
        allProducts: findRes,
        searchFor: searchFor
    });
});

exports.shop = catchAsync(async (req, res, next) => {

    // // Get Recent Products
    // const products = await Products.find().populate('categories').sort({ _id: -1 }).limit(3);

    // console.log(products);

    // res.status(200).render('pages/shop', {
    //     recentProducts: products
    // });

    let posSystems;
    const posSystemCategorey = await Categories.find({
        name: { $eq: 'posSystem' }
    }).populate('products');
    posSystemCategorey.forEach(function (categorey) {
        posSystems = categorey.products
            .reverse()
            .slice(0, 8);
    });

    let receiptPrinters;
    const receiptPrinterCategorey = await Categories.find({
        name: { $eq: 'receiptPrinter' }
    }).populate('products');
    receiptPrinterCategorey.forEach(function (categorey) {
        receiptPrinters = categorey.products.reverse().slice(0, 8);
    });

    let barcodePrinters;
    const barcodePrinterCategorey = await Categories.find({
        name: { $eq: 'barcodePrinter' }
    }).populate('products');
    barcodePrinterCategorey.forEach(function (categorey) {
        barcodePrinters = categorey.products.reverse().slice(0, 8);
    });

    let scanners;
    const scannerCategorey = await Categories.find({
        name: { $eq: 'scanner' }
    }).populate('products');
    scannerCategorey.forEach(function (categorey) {
        scanners = categorey.products.reverse().slice(0, 8);
    });

    let wirelessCallingProducts;
    const wirelessCallingProductCategorey = await Categories.find({
        name: { $eq: 'wirelessCallingProduct' }
    }).populate('products');
    wirelessCallingProductCategorey.forEach(function (categorey) {
        wirelessCallingProducts = categorey.products.reverse().slice(0, 3);
    });

    console.log(scanners);

    //const views = await Allviews.find({});
    res.status(200).render('pages/shop', {
        posSystems: posSystems,
        receiptPrinters: receiptPrinters,
        barcodePrinters: barcodePrinters,
        scanners: scanners,
        wirelessCallingProducts: wirelessCallingProducts
    });
});


exports.error500 = catchAsync(async (req, res, next) => {
    res.status(500).render('pages/500');
});

exports.error404 = catchAsync(async (req, res, next) => {
    res.status(404).render('pages/404');
});


// to change your remote to other existing remote using this steps
// git remote -v
// git remote set-url origin https://github.com/mohamednazm-web/tulibcinama.git
// git push -f origin master

// git add app.js
// git commit -m "changes"
// git add -A
// git push origin master