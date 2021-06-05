const mongoose = require('mongoose');
const slugify = require('slugify');

const posterSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  p: {
    type: Number,
    unique: true
  },
  typeFilm: {
    type: String
  },
  typeFilmNew: {
    type: String
  },
  typeTop: {
    type: String
  },
  typeVariety: {
    type: String
  },
  typeDirector: {
    type: String
  },
  typeCompany: {
    type: String
  },
  typeGift: {
    type: String
  },
  typeSeries: {
    type: String
  },
  typeChashn: {
    type: String
  },
  typeChamkakan: {
    type: String
  },
  slug: String,
  photo: {
    type: String,
    default: 'default.jpg'
  },
  memberNameEnglish: {
    type: String
  },
  typeActor: {
    type: String
  },
  writingN: {
    type: String
  },
  nameF: {
    type: String
  },
  translator: {
    type: String
  },
  description: {
    type: String
  },
  idPoster: {
    type: String
  },
  hasViewd: {
    type: Number
  }
});

posterSchema.index({
  slug: 1
});

posterSchema.pre('save', function(next) {
  // this keyword only access current document not others like query ...
  this.slug = slugify(this.title, {
    // you should install it // npm install slugify
    lower: true
  });
  next();
});

const AllPosters = mongoose.model('AllPosters', posterSchema);

module.exports = AllPosters;
