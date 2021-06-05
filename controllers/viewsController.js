const AllPosters = require('../models/postersModel');
const Allviews = require('../models/viewsModel');
const Profile = require('../models/profilesModel');
const Products = require('../models/productModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.products = catchAsync(async (req, res, next) => {
  await Allviews.updateOne({ $inc: { homePageHasView: 1 } });

  const allProducts = await Products.find({}).limit(8);

  const populars = await Products.find({
    typeProduct: {
      $eq: 'popular'
    }
  })
    .sort({ _id: -1 })
    .limit(8);

  const newArrivals = await Products.find({
    typeProduct: {
      $eq: 'NewArrival'
    }
  })
    .sort({ _id: -1 })
    .limit(8);

  const bestSellers = await Products.find({
    typeProduct: {
      $eq: 'bestSeller'
    }
  })
    .sort({ _id: -1 })
    .limit(8);

  const specialOffers = await Products.find({
    typeProduct: {
      $eq: 'specialOffer'
    }
  })
    .sort({ _id: -1 })
    .limit(8);

  const views = await Allviews.find({});
  res.status(200).render('pages/index', {
    populars: populars,
    newArrivals: newArrivals,
    bestSellers: bestSellers,
    specialOffers: specialOffers,
    allProducts: allProducts
  });
});

exports.updatedAllThings = catchAsync(async (req, res, next) => {
  //const allPosters = await AllPosters.find().sort({ _id: -1 });
  let finalRes;
  let arr = [{ memberNameEnglish: 'English', numOfPosters: 5 }];
  const allPoster = await AllPosters.find({}).select('memberNameEnglish');
  //console.log(allPoster);
  await Profile.find().then(memes => {
    memes.forEach(meme => {
      //console.log(meme.memberNameEnglish);
      const res = allPoster.filter(
        el => el.memberNameEnglish === meme.memberNameEnglish
      );
      finalRes = res.length;
      arr.push({
        memberNameEnglish: meme.memberNameEnglish,
        numOfPosters: finalRes
      });
    });
  });

  for (var i = 1; i < arr.length; i++) {
    let resProfilee = await Profile.findOne({
      memberNameEnglish: {
        $eq: arr[i].memberNameEnglish
      }
    });
    //console.log(resProfilee);
    await resProfilee.updateOne({
      $set: { numOfPosters: arr[i].numOfPosters }
    });
  }

  const updatedProfile = await Profile.find({});

  res.status(200).json({
    status: 'success',
    results: updatedProfile.length,
    data: {
      profile: updatedProfile
    }
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const article = await AllPosters.findOne({
    slug: req.params.slug
  });

  // article has viewed
  await AllPosters.updateOne(
    // find record with slug name
    { slug: req.params.slug },
    // increment it's property called "ran" by 1
    { $inc: { hasViewd: 1 } }
  );

  if (!article) {
    return next(new AppError('There is no article with that name.', 404));
  } // hello

  // res.status(200).json({
  //   status: 'success',
  //   results: article.length,
  //   data: {
  //     posters: article
  //   }
  // });

  res.status(200).render('article', {
    title: `${article.title} Poster`,
    article
  });
});

exports.getProfiles = catchAsync(async (req, res, next) => {
  const profile = await Profile.find({}).sort({ numOfPosters: -1 });
  const filterProfile = profile.filter(
    el =>
      el.numOfPosters >= 5 &&
      el.typeNaxshandn !== 'naxshand' &&
      el.typeDeveloper !== 'developer'
  );

  if (!filterProfile) {
    return next(new AppError('There is no profile with that name.', 404));
  }

  const naxshandn = await Profile.find({});
  const filterNaxshandn = naxshandn.filter(
    el => el.typeNaxshandn === 'naxshandn'
  );

  const developer = await Profile.find({});
  const filterDeveloper = developer.filter(
    el => el.typeDeveloper === 'developer'
  );

  // res.status(200).json({
  //   status: 'success',
  //   results: filterProfile.length,
  //   data: {
  //     profile: filterProfile,
  //     naxshandn: filterNaxshandn,
  //     developer: filterDeveloper
  //   }
  // });
  res.status(200).render('profile', {
    title: `${profile.title} Poster`,
    profile: filterProfile,
    naxshandn: filterNaxshandn,
    developer: filterDeveloper
  });
});

exports.getPosterEachMember = catchAsync(async (req, res, next) => {
  const member = await AllPosters.find({
    memberNameEnglish: {
      $eq: req.params.slugMember
    }
  });

  // console.log(member.length);

  const mProfile = await Profile.findOne({
    memberNameEnglish: {
      $eq: req.params.slugMember
    }
  });

  if (!member) {
    return next(new AppError('There is no article with that name.', 404));
  }

  // res.status(200).json({
  //   status: 'success',
  //   results: mProfile.length,
  //   data: {
  //     mProfile
  //   }
  // });

  res.status(200).render('posterEachMember', {
    title: `${member.title} Poster`,
    member,
    mProfile
  });
});

exports.getFilm = catchAsync(async (req, res, next) => {
  const film = await AllPosters.find({
    typeFilm: {
      $eq: 'film'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('film', {
    title: 'film page',
    film
  });
});

exports.getTop = catchAsync(async (req, res, next) => {
  const top = await AllPosters.find({
    typeTop: {
      $eq: 'top'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('top', {
    title: 'Top 250 movie rated',
    top
  });
});

exports.getVariety = catchAsync(async (req, res, next) => {
  const variety = await AllPosters.find({
    typeVariety: {
      $eq: 'variety'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('variety', {
    title: 'variety',
    variety
  });
});

exports.getDirector = catchAsync(async (req, res, next) => {
  const director = await AllPosters.find({
    typeDirector: {
      $eq: 'director'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('director', {
    title: 'director',
    director
  });
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const company = await AllPosters.find({
    typeCompany: {
      $eq: 'company'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('company', {
    title: 'company',
    company
  });
});

exports.getGift = catchAsync(async (req, res, next) => {
  const gift = await AllPosters.find({
    typeGift: {
      $eq: 'gift'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('gift', {
    title: 'gift',
    gift
  });
});

exports.getChashn = catchAsync(async (req, res, next) => {
  const chashn = await AllPosters.find({
    typeChashn: {
      $eq: 'chashn'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('chashn', {
    title: 'chashn',
    chashn
  });
});

exports.getSeries = catchAsync(async (req, res, next) => {
  const series = await AllPosters.find({
    typeSeries: {
      $eq: 'series'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('series', {
    title: 'series',
    series
  });
});

exports.getChamkakan = catchAsync(async (req, res, next) => {
  const chamkakan = await AllPosters.find({
    typeChamkakan: {
      $eq: 'chamkakan'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('chamkakan', {
    title: 'chamkakan',
    chamkakan
  });
});

exports.getFormProfile = catchAsync(async (req, res, next) => {
  res.status(200).render('profileForm', {
    title: 'profileForm'
  });
});

exports.getActor = catchAsync(async (req, res, next) => {
  const actor = await AllPosters.find({
    typeActor: {
      $eq: 'actor'
    }
  })
    .sort({ _id: -1 })
    .limit(120);

  res.status(200).render('actor', {
    title: 'actor',
    actor
  });
});

exports.createPoster = catchAsync(async (req, res, next) => {
  const doc = await AllPosters.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.search = catchAsync(async (req, res, next) => {
  const regex = new RegExp(`${req.query.dsearch}`, 'gi');
  const searchFor = req.query.dsearch;
  const findRes = await AllPosters.find({
    title: { $regex: regex }
  }).limit(14);

  console.log(findRes);

  res.status(200).render('allPosters', {
    title: 'all',
    all: findRes,
    search: searchFor
  });
});
// to change your remote to other existing remote using this steps
// git remote -v
// git remote set-url origin https://github.com/mohamednazm-web/tulibcinama.git
// git push -f origin master

// git add app.js
// git commit -m "changes"
// git add -A
// git push origin master
