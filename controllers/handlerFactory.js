const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
    catchAsync(async(req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(204).json({
            // 204 stands for delete
            status: 'success',
            data: null
        });
    });

exports.updateOne = Model =>
    catchAsync(async(req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

exports.createOne = Model =>
    catchAsync(async(req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            // 201 stands for to create new tour
            status: 'success',
            data: {
                data: doc
            }
        });
    });

exports.getOne = (Model) =>
    catchAsync(async(req, res, next) => {
        let doc = await Model.findById(req.params.id).populate('categories', 'name -_id');

        if (!doc) {
            return next(new AppError('No docoment found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    });

exports.getAll = Model =>
    catchAsync(async(req, res, next) => {

        const products = await Model.find().populate('categories'); //-_id

        //console.log(products);

        // SEND RESPONSE
        res.status(200).json({
            // 200 stands for its okay
            status: 'success',
            results: products.length, // for multiple Model
            data: {
                products
            }
        });
    });