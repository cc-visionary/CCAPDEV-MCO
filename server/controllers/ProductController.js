// import module from `../models/database.js`
const db = require('../models/database.js');

const collection = 'products';

const ProductController = {
  getAllProducts: (req, res) => {
    db.findMany(collection, null, (result) => res.status(200).json({result: result}));
  },
  getProduct: (req, res) => {
    const { slug } = req.params;

    const query = { name : slug.replaceAll('-', ' ').toTitleCase() };

    // finds the product which matches the name from the slug
    db.findOne(collection, query, (result) => res.status(200).json({result: result}));
  },
  addProduct: (req, res) => {
    // key: 1,
    // product_image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftechreport.com%2Fr.x%2F2016_9_27_Razer_Deathadder_sheds_Chroma_skin_to_achieve_Elite_status%2Fdaelite_gallery02.png',
    // name: 'Deathadder',
    // category: 'Peripheral',
    // brand: 'Razer',
    // price: 32,
    // stock: 2499,
    // description: 'Good Mouse',
    // reviews: [{user: users[0], reaction: 'very very good', rating: 5, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}, {user: users[1], reaction: 'fairlygood', rating: 3, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}, {user: users[2], reaction: 'fair', rating: 3, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}],
    // orders: 0
  },
  updateProduct: (req, res) => {
    
  },
  deleteProduct: (req, res) => {
    
  },
  getProducts: (req, res) => {

  },
  deleteProducts: (req, res) => {

  },
};
/*
    exports the object `ProductController` (defined above)
    when another script exports from this file
*/
module.exports = ProductController;