// import module from `../models/database.js`
const db = require('../models/database.js');

// import CartSchema from `../models/CartModel.js`
const Cart = require('../models/CartModel');

const defaultCallback = (res, result) => res.status(200).json(result)

const CartController = {
  getItemsFromCart: (req, res) => {
    const { userId } = req.params;
    db.findMany(Cart, { userId : parseInt(userId) }, (result) => defaultCallback(res, result));
  },
  addItemToCart: (req, res) => {
    db.insertOne(Cart, req.body, (result) => defaultCallback(res, result));
  },
  updateCartItem: (req, res) => {
    const { key, userId } = req.body
    
    db.updateOne(Cart, { key , userId }, req.body, (result) => defaultCallback(res, result))
  },
  deleteByItem: (req, res) => {
    const { key } = req.params;

    db.deleteMany(Cart, { key : parseInt(key) }, (result) => defaultCallback(res, result))
  },
  deleteByUser: (req, res) => {
    const { userId } = req.params;
    
    db.deleteMany(Cart, { userId : parseInt(userId) }, (result) => defaultCallback(res, result))
  },
  deleteItems: (req, res) => {
    db.deleteMany(Cart, { key: { $in: req.body.map(item => item.key) }, userId: { $in: req.body.map(item => item.userId)} }, (result) => defaultCallback(res, result))
  }
};
/*
    exports the object `CartController` (defined above)
    when another script exports from this file
*/
module.exports = CartController;