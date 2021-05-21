// import module from `../models/database.js`
const db = require('../models/database.js');

// import CartSchema from `../models/CartModel.js`
const Cart = require('../models/CartModel');

// import module `validationResult` from `express-validator`
const { validationResult } = require('express-validator');

const defaultCallback = (res, result) => res.status(200).json(result)

const CartController = {
  getItemsFromCart: (req, res) => {
    const { userId } = req.params;
    db.findMany(Cart, { userId : parseInt(userId) }, (result) => defaultCallback(res, result));
  },
  addItemToCart: (req, res) => {
    // checks if there are validation errors
    var errors = validationResult(req);

    if(errors.isEmpty()) {
      db.insertOne(Cart, req.body, (result) => defaultCallback(res, result));
    }
  },
  updateCartItem: (req, res) => {
    const { productId, userId } = req.body
    
    db.updateOne(Cart, { productId , userId }, req.body, (result) => defaultCallback(res, result))
  },
  deleteByItem: (req, res) => {
    const { productId } = req.params;

    db.deleteMany(Cart, { productId : parseInt(productId) }, (result) => defaultCallback(res, result))
  },
  deleteByUser: (req, res) => {
    const { userId } = req.params;
    
    db.deleteMany(Cart, { userId : parseInt(userId) }, (result) => defaultCallback(res, result))
  },
  deleteItems: (req, res) => {
    db.deleteMany(Cart, { productId: { $in: req.body.map(item => item.productId) }, userId: { $in: req.body.map(item => item.userId)} }, (result) => defaultCallback(res, result))
  }
};
/*
    exports the object `CartController` (defined above)
    when another script exports from this file
*/
module.exports = CartController;