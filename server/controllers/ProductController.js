// import module from `../models/database.js`
const db = require('../models/database.js');

// import ProductSchema from `../models/ProductModel.js`
const Product = require('../models/ProductModel');

const defaultCallback = (res, result) => res.status(200).json(result)

const ProductController = {
  getAllProducts: (req, res) => {
    db.findMany(Product, null, (result) => defaultCallback(res, result));
  },
  getProduct: (req, res) => {
    const { slug } = req.params;

    // finds the product which matches the name from the slug
    db.findOne(Product, { slug }, (result) => defaultCallback(res, result));
  },
  addProduct: (req, res) => {
    db.insertOne(Product, req.body, (result) => defaultCallback(res, result))
  },
  updateProduct: (req, res) => {
    db.updateOne(Product, { key: parseInt(req.body.key) }, req.body, (result) => defaultCallback(res, result))
  },
  deleteProduct: (req, res) => {
    const { slug } = req.params;
    
    db.deleteOne(Product, { slug }, (result) => defaultCallback(res, result))
  },
};
/*
    exports the object `ProductController` (defined above)
    when another script exports from this file
*/
module.exports = ProductController;