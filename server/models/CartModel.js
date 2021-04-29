// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `cart`
const CartSchema = new Schema({
  productId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
});

/*
  exports a mongoose.model object based on `CartSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `cart` -> plural of the argument `Cart`
*/
module.exports = mongoose.model('Cart', CartSchema);