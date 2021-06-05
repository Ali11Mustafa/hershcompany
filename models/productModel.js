const mongoose = require('mongoose');
const slugify = require('slugify');

const posterSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true
  },
  stars: {
    type: Number
  },
  typeProduct: {
    type: String
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  // slug: String,
  price: {
    type: Number
  },
  description: {
    type: String
  },
  brandName: {
    type: String
  },
  //   idPoster: {
  //     type: String
  //   },
  hasViewd: {
    type: Number
  }
});

// posterSchema.index({
//   slug: 1
// });

// posterSchema.pre('save', function(next) {
//   // this keyword only access current document not others like query ...
//   this.slug = slugify(this.title, {
//     // you should install it // npm install slugify
//     lower: true
//   });
//   next();
// });

const Products = mongoose.model('Products', posterSchema);

module.exports = Products;
