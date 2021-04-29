/*
  This script inserts the following:
    1. 6 users to the collection 'users' 
    2. 5 products to collection 'products'
    3. 4 orders to collection 'orderlist'
    4. 3 items to collection 'cart'
*/

// import module from `./models/database.js`
const db = require('../models/database.js');

db.connect();

db.dropCollection('users', () => console.log(''));
db.dropCollection('products', () => console.log(''));
db.dropCollection('orders', () => console.log(''));
db.dropCollection('carts', () => console.log(''));
db.dropCollection('sessions', () => console.log(''));