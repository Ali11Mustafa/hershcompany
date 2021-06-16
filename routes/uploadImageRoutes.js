// const express = require('express');
// const uploadImageController = require('../controllers/uploadImageController');
// const fs = require("fs");

// const router = express.Router();
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

// router.route('/').get(uploadImageController.getFormPage);
// router.route('/show').get(uploadImageController.show);
// router.route('/uploadphoto').post(uploadImageController.uploadphoto, upload.single('myImage'));

// module.exports = router;