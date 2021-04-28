/*
  This script removes the following collections:
    1. users
    2. products
    3. orders
    4. cart
*/

// import module from `./models/database.js`
const db = require('../models/database.js');

db.dropCollection('users');
db.dropCollection('products');
db.dropCollection('orders');
db.dropCollection('cart');