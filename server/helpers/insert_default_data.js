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

const shippingFee = 99.99;

const users = [
  {userId: 1031, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'John Doe', username: 'buyer', birthday: '03-20-1999', email: 'john-ish-doe-ish@gmail.com', password: 'buyerpass', userType: 'buyer'},
  {userId: 1032, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Kate Meeks', birthday: '05-22-2001', email: 'kate.meek443@gmail.com', username: 'sweetgirl123', password: 'lksad', userType: 'buyer'},
  {userId: 1033, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Joseph Bourne', birthday: '02-12-1980', email: 'joseph.bourne.a.lover143@gmail.com', username: 'xXbatmanXx143', password: 'qweqasd', userType: 'buyer'},
  {userId: 1034, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Mark Edwards', birthday: '12-04-1995', email: 'cool.mark.edwards@gmail.com', username: 'coolkidXD', password: 'axzcas', userType: 'buyer'},
  {userId: 1035, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'James Jones Junior', birthday: '11-15-1992', email: 'james.jones.junior@gmail.com', username: 'seller', password: 'sellerpass', userType: 'seller'},
]

const products = [
  {
    productId: 1,
    product_image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftechreport.com%2Fr.x%2F2016_9_27_Razer_Deathadder_sheds_Chroma_skin_to_achieve_Elite_status%2Fdaelite_gallery02.png',
    name: 'Deathadder',
    slug: 'deathadder',
    category: 'Peripheral',
    brand: 'Razer',
    price: 32,
    stock: 2499,
    description: 'Good Mouse',
    reviews: [],
    sold: 0
  },
  {
    productId: 2,
    product_image: 'https://i.dell.com/das/dih.ashx/500x500/das/xa_____/global-site-design%20WEB/808a98fc-260b-f278-b92e-bd1b4de12eb2/1/OriginalPng?id=Dell/Product_Images/Peripherals/Input_Devices/Dell/Mouse/wm324/relativesize/dell-wireless-mouse-wm324-relativesize-500.png',
    name: 'WM324 Wireless Mouse',
    slug: 'wm324-wireless-mouse',
    category: 'Peripheral',
    brand: 'Dell',
    price: 999,
    stock: 300,
    description: 'Bad Mouse',
    reviews: [{userId: users[1].userId, reaction: 'cool', rating: 4, dateReviewed: '2021-01-25T16:00:00.000Z'}],
    sold: 1
  },
  {
    productId: 3,
    product_image: 'https://www.epson.eu/files/assets/converted/1500m-1500m/e/p/s/o/epson_perfection_v500_web.png.png',
    name: 'V500 Photo Scanner',
    slug: 'v500-photo-scanner',
    category: 'Scanner',
    brand: 'Epson',
    price: 20000,
    stock: 150,
    description: 'Cool Scan',
    reviews: [],
    sold: 14
  },
  {
    productId: 4,
    product_image: 'https://mediaserver.goepson.com/ImConvServlet/imconv/d4ad82746aacb0b9b4ad029051822baa2a532451/515Wx515H?use=productpictures&assetDescr=wf2850_SPT_C11CG31201_384x286',
    name: 'WF-2850 Printer',
    slug: 'wf-2850-printer',
    category: 'Printer',
    brand: 'Epson',
    price: 25000,
    stock: 200,
    description: 'Cool Print',
    reviews: [{userId: users[0].userId, reaction: 'not satisfied', rating: 2, dateReviewed: '2021-01-22T16:00:00.000Z'}, {userId: users[1].userId, reaction: 'not satisfied', rating: 2, dateReviewed: '2021-01-22T16:00:00.000Z'}, {userId: users[3].userId, reaction: 'fair', rating: 3, dateReviewed: '2021-03-04T16:00:00.000Z'}],
    sold: 3
  },
  {
    productId: 5,
    product_image: 'https://www.pngkit.com/png/full/362-3625160_lenovo-laptop-png-download-yoga-lenovo-920-black.png',
    name: 'Lenovo Laptop',
    slug: 'lenovo-laptop',
    category: 'Laptop',
    brand: 'Lenovo',
    price: 50000,
    stock: 20,
    description: 'Cool laptop',
    rating: 0,
    reviews: [{userId: users[1].userId, reaction: 'awesome', rating: 5, dateReviewed: '2021-01-24T16:00:00.000Z'}, {userId: users[2].userId, reaction: 'nice!', rating: 4, dateReviewed: '2021-01-24T16:00:00.000Z'}],
    sold: 2
  }
]

const orderlist = [
  {
    orderId: 100,
    userId: users[0].userId,
    total: [{...products[3], quantity: 1}, {...products[4], quantity: 3}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...products[3], quantity: 1}, {...products[4], quantity: 3}],
    shippingFee: shippingFee,
    dateOrdered: '03-26-2021',
  },
  {
    orderId: 101,
    userId: users[1].userId,
    total: [{...products[3], quantity: 1}, {...products[1], quantity: 1}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...products[3], quantity: 1}, {...products[1], quantity: 1}],
    shippingFee: shippingFee,
    dateOrdered: '02-19-2021',
  },
  {
    orderId: 102,
    userId: users[2].userId,
    total: [{...products[4], quantity: 1}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...products[4], quantity: 1}],
    shippingFee: shippingFee,
    dateOrdered: '05-27-2020',
  },
  {
    orderId: 103,
    userId: users[3].userId,
    total: [{...products[3], quantity: 2}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...products[3], quantity: 2}],
    shippingFee: shippingFee,
    dateOrdered: '03-27-2021',
  },
  {
    orderId: 104,
    userId: users[0].userId,
    total: [{...products[2], quantity: 14}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...products[2], quantity: 14}],
    shippingFee: shippingFee,
    dateOrdered: '04-22-2021',
  },
];

const cart = [
  { productId: 1, quantity: 2, userId: users[0].userId },
  { productId: 3, quantity: 1, userId: users[0].userId },
  { productId: 5, quantity: 2, userId: users[0].userId },
  { productId: 4, quantity: 4, userId: users[1].userId },
  { productId: 1, quantity: 3, userId: users[2].userId },
]

const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
db.insertMany(User, users, () => console.log('Users inserted successfully'));
db.insertMany(Product, products, () => console.log('Products inserted successfully'));
db.insertMany(Order, orderlist, () => console.log('Orders inserted successfully'));
db.insertMany(Cart, cart, () => console.log('Cart Items inserted successfully'));