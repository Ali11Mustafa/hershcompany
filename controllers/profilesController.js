const AllPosters = require('../models/postersModel');
const Allviews = require('../models/viewsModel');
const Profile = require('../models/profilesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createNewProfile = catchAsync(async (req, res, next) => {
  const newMember = {
    m: req.body.m,
    memberName: req.body.memberName,
    memberNameEnglish: req.body.memberNameEnglish,
    description: req.body.description,
    imageProfile: req.body.imageProfile,
    numOfPosters: req.body.numOfPosters
  };

  // const findMember = await Profile.find({});
  // const existing = findMember.filter(
  //   member => member.memberName === req.body.memberName
  // );
  // if (existing) {
  //   return next(new AppError('that member is exist', 404));
  // }

  const doc = await Profile.create(newMember);
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     data: doc
  //   }
  // });

  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     data: doc
  //   }
  // });
  res.status(200).render('succesfull', {
    mProfile: doc
  });
});

exports.deleteOneProfile = catchAsync(async (req, res, next) => {
  const doc = await Profile.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: {
      data: null
    }
  });
});
