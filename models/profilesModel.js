const mongoose = require('mongoose');
const slugify = require('slugify');

const posterSchema = new mongoose.Schema({
  m: {
    type: String,
    unique: true
  },
  memberName: {
    type: String,
    unique: true
  },
  typeNaxshandn: {
    type: String
  },
  typeDeveloper: {
    type: String
  },
  typeAction: {
    type: String
  },
  href: {
    type: String
  },
  memberNameEnglish: {
    type: String,
    unique: true
  },
  slugMember: String,
  imageProfile: {
    type: String
  },
  description: {
    type: String
  },
  numOfPosters: {
    type: Number
  }
});

posterSchema.index({
  slugMember: 1
});

posterSchema.pre('save', function(next) {
  // this keyword only access current document not others like query ...
  this.slugMember = slugify(this.memberNameEnglish, {
    // you should install it // npm install slugify
    lower: true
  });
  next();
});

const Profile = mongoose.model('Profile', posterSchema);

module.exports = Profile;
