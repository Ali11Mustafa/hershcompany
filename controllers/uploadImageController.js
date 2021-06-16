// const image = require('../models/uploadImageModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const factory = require('./handlerFactory');
// const fs = require("fs");
// const multer = require("multer");

// // SET STORAGE
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//     }
// });

// var upload = multer({ storage: storage });

// exports.getFormPage = catchAsync(async(req, res, next) => {
//     res.render("index");
// });

// exports.show = catchAsync(async(req, res, next) => {
//     image.find().toArray(function(err, result) {
//         const imgArray = result.map(element => element._id);
//         console.log(imgArray);
//         if (err) {
//             return console.error(err);
//         }
//         res.send(imgArray);
//     });
// });

// exports.uploadphoto = catchAsync(async(req, res, next) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_img = img.toString('base64');
//     var final_img = {
//         contentType: req.file.mimetype,
//         image: new Buffer(encode_img, 'base64')
//     };
//     image.create(final_img, function(err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result.img.Buffer);
//             console.log("Saved To database");
//             res.contentType(final_img.contentType);
//             res.send(final_img.image);
//         }
//     });
// });