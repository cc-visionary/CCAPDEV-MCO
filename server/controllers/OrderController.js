// import module from `../models/database.js`
const db = require('../models/database.js');

// import OrderSchema from `../models/OrderModel.js`
const Order = require('../models/OrderModel');

// import module `validationResult` from `express-validator`
const { validationResult } = require('express-validator');

const defaultCallback = (res, result) => res.status(200).json(result)

const OrderController = {
  getAllOrders: (req, res) => {
    db.findMany(Order, {}, (result) => defaultCallback(res, result), {dateOrdered : -1});
  },
  getOrderByUser: (req, res) => {
    const { userId } = req.params;

    db.findMany(Order, { userId : parseInt(userId) }, (result) => defaultCallback(res, result), {dateOrdered : -1})
  },
  addOrderToList: (req, res) => {
    // checks if there are validation errors
    var errors = validationResult(req);

    if(errors.isEmpty()) {
      db.insertOne(Order, req.body, (result) => defaultCallback(res, result))
    }
  },
};
/*
    exports the object `OrderController` (defined above)
    when another script exports from this file
*/
module.exports = OrderController;