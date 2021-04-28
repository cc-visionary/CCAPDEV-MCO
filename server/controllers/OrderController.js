// import module from `../models/database.js`
const db = require('../models/database.js');

const collection = 'orders';

const OrderController = {
  getAllOrders: (req, res) => {
    db.findMany(collection, {}, (result) => res.status(200).json(result));
  },
  addOrderToList: (req, res) => {

  },
};
/*
    exports the object `OrderController` (defined above)
    when another script exports from this file
*/
module.exports = OrderController;