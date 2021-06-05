const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { populate } = require('../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
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
  catchAsync(async (req, res, next) => {
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
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      // 201 stands for to create new tour
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    //const tour = await Tour.findById(req.params.id).populate('reviews');
    // Tour.findOne({_id: req.params.id })

    // send // 127.0.0.1:3000/api/v1/tours/5f3b077bd12a053fd4c752d0 // peshtr 9 bw krdmana 0
    if (!doc) {
      return next(new AppError('No docoment found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested Get reviews on tour (hack)
    let filter = {};
    if (req.params.tourId)
      filter = {
        tour: req.body.tourId
      };
    const reviews = await Model.find(filter);

    console.log(req.query);

    // EXCUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query.explain();
    // query.sort().select().limit()

    // SEND RESPONSE
    res.status(200).json({
      // 200 stands for its okay
      status: 'success',
      results: doc.length, // for multiple Model
      data: {
        data: doc
      }
    });
  });
