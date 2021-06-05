const mongoose = require('mongoose');

const calculateSchema = new mongoose.Schema({
  memberNameEnglish: { type: String },
  numOfPosters: { type: Number }
});

calculateSchema.pre('save', function(next) {
  next();
});

const Allcalculate = mongoose.model('Calculate', calculateSchema);

module.exports = Allcalculate;
