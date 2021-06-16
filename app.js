const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
//const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const app = express();
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");


//Schema
var imgSchema = mongoose.Schema({
    img: { data: Buffer, contentType: String }
});
var image = mongoose.model("image", imgSchema);
// SET STORAGE
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/product')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/background')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var storage3 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/subImage')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var storage4 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/fileSetUp')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.zip')
    }
});

var upload = multer({ storage: storage });
var upload2 = multer({ storage: storage2 });
var upload3 = multer({ storage: storage3 });
var upload4 = multer({ storage: storage4 });



app.get("/admin_dashboard/uploadImage", (req, res) => {
    res.render("index");
});


app.get("/show", (req, res) => {
    image.find().toArray(function(err, result) {
        const imgArray = result.map(element => element._id);
        console.log(imgArray);
        if (err) {
            return console.error(err);
        }
        res.send(imgArray)
    });
});

app.post("/uploadphoto", upload.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };
    image.create(final_img, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    });
});

app.post("/backgroundPhoto", upload2.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };
    image.create(final_img, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    });
});

app.post("/subImages", upload3.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };
    image.create(final_img, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    });
});

app.post("/fileSetUp", upload4.single('myImage'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };
    image.create(final_img, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    });
});


const AppError = require('./utils/appError');
//const globalErrorHandler = require("./controllers/errorController");
//const tourRouter = require("./routes/tourRoutes");
//const userRouter = require("./routes/userRoutes");
//const reviewRouter = require("./routes/reviewRoutes");
//const bookingRouter = require("./routes/bookingRoutes");
const viewRouter = require('./routes/viewRoutes');
const productRouter = require('./routes/productRoutes');
const categoreyRouter = require('./routes/categorieRoutes');
const adminDashboardRouter = require('./routes/adminDashboardRoutes');
const shopRouter = require('./routes/shopRoutes');

//const uploadImageRoutes = require('./routes/uploadImageRoutes');
// start express app

app.enable('trust proxy');

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 1) Global Middleware
// Implement CORS
app.use(cors());

app.options('*', cors());
//app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//app.use(helmet());

// Development body
if (process.env.NODE_ENV === 'development') {
    // its availabel in every single file becasue already have in process.
    app.use(morgan('dev')); // requst send kaw tamashay consle bka
}

// limit request from same API
const limiter = rateLimit({
    // 100 request datwanre bnerdre la maway 1 houri
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); // "email": {"$gt": ""}

app.use(xss()); // html form attacks

// Prevent parameter pollution
// {{URL}}api/v1/tours?sort=duration&sort=price its work now
// app.use(
//     hpp({
//         whitelist: [
//             'duration',
//             'ratingsAverage',
//             'maxGroupSize',
//             'difficulty',
//             'price'
//         ]
//     })
// );

app.use(compression());

// Body parser, reading data from body into req.body
app.use(
    express.json({
        limit: '30000kb'
    })
); // its need when you use post api
app.use(
    express.urlencoded({
        extended: true,
        limit: '30000kb'
    })
);
app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
    next();
});

app.use((req, res, next) => {
    req.requsetTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

// app.get('/', function(req, res) {
//   res.render('pages/index');
// });

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

// app.get('/single_product', function(req, res) {
//   res.render('pages/single_product');
// });

// app.get('/admin', function(req, res) {
//   res.render('pages/admin_dashboard');
// });

app.use('/', viewRouter);
app.use('/admin_dashboard', adminDashboardRouter);
//app.use('/admin_dashboard/uploadImage', uploadImageRoutes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoreyRouter);
//app.use('/api/v1/shop', shopRouter);

app.all('*', (req, res, next) => {
    /* res.status(404).json({
       status: 'fail',
       message: `Can not find ${req.originalUrl} on this server!`
     }); */
    /*
    const err = new Error(`Can not find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;

    next(err);*/
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

// START THE SERVER

module.exports = app;