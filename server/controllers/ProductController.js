// import module from `../models/database.js`
const db = require('../models/database.js');

const collection = 'products';

const ProductController = {
  getAllProducts: (req, res) => {
    db.findMany(collection, null, (result) => res.status(200).json(result));
  },
  getProduct: (req, res) => {
    const { slug } = req.params;

    // finds the product which matches the name from the slug
    db.findOne(collection, { slug }, (result) => res.status(200).json(result));
  },
  addProduct: (req, res) => {
    db.insertOne(collection, req.body)
  },
  updateProduct: (req, res) => {
    db.updateOne(collection, { key: req.body.key }, req.body)
  },
  deleteProduct: (req, res) => {
    const { slug } = req.params;
    
    db.deleteOne(collection, { slug })
  },
};
/*
    exports the object `ProductController` (defined above)
    when another script exports from this file
*/
module.exports = ProductController;