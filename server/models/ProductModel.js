// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `products`
const ProductSchema = new Schema({
  productId: {
    type: Number,
    required: true
  },
  product_image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: {
    type: [],
    required: true
  },
  sold: {
    type: Number,
    required: true
  }
});

/*
  exports a mongoose.model object based on `ProductSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `products` -> plural of the argument `Product`
*/
module.exports = mongoose.model('Product', ProductSchema);