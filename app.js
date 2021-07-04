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
const bodyParser = require('body-parser');
var session = require('express-session');


const app = express();
const fs = require("fs");
const multer = require("multer");


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, 'images/product');
        } else if (file.fieldname === "backgroundImageForProduct") {
            cb(null, 'images/background');
        } else if (file.fieldname === "sliderImage") {
            cb(null, 'images/slider');
        } else if (file.fieldname === "fileSetUp") {
            cb(null, 'images/fileSetUp');
        } else {
            cb(null, 'images/subImage');
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
        } else if (file.fieldname === "backgroundImageForProduct") {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
        } else if (file.fieldname === "sliderImage") {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
        } else if (file.fieldname === "fileSetUp") {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
        } else {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
        }
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || path.extension(file.originalname === '.zip')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const AppError = require('./utils/appError');
const viewRouter = require('./routes/viewRoutes');
const productRouter = require('./routes/productRoutes');
const categoreyRouter = require('./routes/categorieRoutes');
const adminDashboardRouter = require('./routes/adminDashboardRoutes');
const shopRouter = require('./routes/shopRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).fields([
    {
        name: 'image',
        maxCount: 1
    },
    {
        name: 'backgroundImageForProduct',
        maxCount: 1
    },
    {
        name: 'fileSetUp',
        maxCount: 1
    },
    {
        name: 'sliderImage',
        maxCount: 1
    },
    {
        name: 'subImage1',
        maxCount: 1
    },
    {
        name: 'subImage2',
        maxCount: 1
    },
    {
        name: 'subImage3',
        maxCount: 1
    },
    {
        name: 'subImage4',
        maxCount: 1
    }
]));

// reference for image uploading....

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.enable('trust proxy');

app.set('view engine', 'ejs');


///////////////////////////// translation ///////////////////////////////

var i18n = require('i18n');

i18n.configure({
    //define how many languages we would support in our application
    locales: ['en', 'ku', 'ar'],

    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',

    //define the default language
    defaultLocale: 'en',

    // define a custom cookie name to parse locale settings from
    cookie: 'i18n'
});

app.use(cookieParser("i18n_demo"));

app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//init i18n after cookie-parser
app.use(i18n.init);

app.get('/ku', function (req, res) {
    res.cookie('i18n', 'ku');
    res.redirect('back')
});

app.get('/en', function (req, res) {
    res.cookie('i18n', 'en');
    res.redirect('back')
});


app.get('/ar', function (req, res) {
    res.cookie('i18n', 'ar');
    res.redirect('back')
});
//////////////////////////////////////////////////END TRANSLATION/////////////////////////////////////////////
// 1) Global Middleware
// Implement CORS
app.use(cors());

app.options('*', cors());
//app.options('/api/v1/tours/:id', cors());


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
//app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
    next();
});

app.use((req, res, next) => {
    req.requsetTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/about', function (req, res) {
    res.setLocale(req.cookies.i18n);
    res.render('pages/about', {
        i18n: res
    });
});

app.get('/contact', function (req, res) {
    res.setLocale(req.cookies.i18n);
    res.render('pages/contact', {
        i18n: res
    });
});


app.use('/', viewRouter);
app.use('/admin_dashboard', adminDashboardRouter);
//app.use('/admin_dashboard/uploadImage', uploadImageRoutes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoreyRouter);
//app.use('/api/v1/shop', shopRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

// START THE SERVER

module.exports = app;