// import module from `../models/database.js`
const db = require('../models/database.js');

const collection = 'cart';

const CartController = {
  getItemsFromCart: (req, res) => {
    db.findMany(collection, { userId: req.params.userId }, result => res.status(200).json(result));
  },
  addItemToCart: (req, res) => {
    db.insertOne(collection, req.body);
  },
  updateCartItem: (req, res) => {
    db.updateOne(collection, { key: req.body.key , userId: req.body.userId }, req)
  },
  deleteItemFromCart: (req, res) => {
    const query = req.body.key ? { key : req.body.key } : { userId : req.body.userId }

    db.deleteMany(collection, query)
  }
};
/*
    exports the object `CartController` (defined above)
    when another script exports from this file
*/
module.exports = CartController;