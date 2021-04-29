// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `orders`
const OrderSchema = new Schema({
  orderId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  total: {
    type: Schema.Types.Decimal128,
    required: true
  },
  items: {
    type: [],
    required: true
  },
  shippingFee: {
    type: Schema.Types.Decimal128,
    required: true
  },
  dateOrdered: {
    type: Date,
    required: true
  }
});

/*
  exports a mongoose.model object based on `OrderSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `orders` -> plural of the argument `Order`
*/
module.exports = mongoose.model('Order', OrderSchema);