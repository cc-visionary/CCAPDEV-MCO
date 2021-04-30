// import module `express`
const express = require('express');

// import module `UserController` from `../controllers/UserController.js`
const UserController = require('../controllers/UserController.js')

// import module `ProductController` from `../controllers/ProductController.js`
const ProductController = require('../controllers/ProductController.js')

// import module `OrderController` from `../controllers/OrderController.js`
const OrderController = require('../controllers/OrderController.js')

// import module `CartController` from `../controllers/CartController.js`
const CartController = require('../controllers/CartController.js')

const app = express();

app.get('/users', UserController.getAllUsers);

app.post('/users', UserController.addUser);

app.delete('/users/:userId', UserController.deleteUser);

app.get('/users/login', UserController.getLogin);

app.post('/users/login', UserController.login);

app.post('/users/logout', UserController.logout);

app.put('/users', UserController.updateUser);

app.get('/products', ProductController.getAllProducts);

app.post('/products', ProductController.addProduct);

app.put('/products', ProductController.updateProduct);

app.delete('/products/:slug', ProductController.deleteProduct);

app.get('/products/:slug', ProductController.getProduct);

app.get('/orders', OrderController.getAllOrders)

app.get('/orders/:userId', OrderController.getOrderByUser)

app.post('/orders', OrderController.addOrderToList)

app.get('/cart/:userId', CartController.getItemsFromCart);

app.put('/cart', CartController.updateCartItem);

app.post('/cart', CartController.addItemToCart);

app.delete('/cart/productId/:productId', CartController.deleteByItem);

app.delete('/cart/userId/:userId', CartController.deleteByUser);

app.delete('/cart', CartController.deleteItems);

/*
    exports the object `app` (defined above)
    when another script exports from this file
*/
module.exports = app;