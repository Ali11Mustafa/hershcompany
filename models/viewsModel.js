const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  homePageHasView: { type: Number }
});

viewSchema.pre('save', function(next) {
  next();
});

const Allviews = mongoose.model('Views', viewSchema);

module.exports = Allviews;
