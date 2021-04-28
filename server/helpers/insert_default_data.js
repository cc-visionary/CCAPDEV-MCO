/*
  This script inserts the following:
    1. 6 users to the collection 'users' 
    2. 5 products to collection 'products'
    3. 4 orders to collection 'orderlist'
    4. 3 items to collection 'cart'
*/

// import module from `./models/database.js`
const db = require('../models/database.js');

const shippingFee = 99.99;

const users = [
  {userId: 1032, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'John Doe', username: 'johndoe', birthday: '03-20-1999', email: 'john-ish-doe-ish@gmail.com', password: 'coolguy123', userType: 'buyer', loggedIn: true},
  {userId: 1033, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Kate Meeks', birthday: '05-22-2001', email: 'kate.meek443@gmail.com', username: 'sweetgirl123', userType: 'buyer', loggedIn: false},
  {userId: 1034, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Joseph Bourne', birthday: '02-12-1980', email: 'joseph.bourne.a.lover143@gmail.com', username: 'xXbatmanXx143', userType: 'buyer', loggedIn: false},
  {userId: 1035, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Mark Edwards', birthday: '12-04-1995', email: 'cool.mark.edwards@gmail.com', username: 'coolkidXD', userType: 'buyer', loggedIn: false},
  {userId: 1036, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'Hazel Nut', birthday: '08-02-2002', email: 'hazel.nut.coffee@gmail.com', username:'coffeelover42', userType: 'buyer', loggedIn: false},
  {userId: 1037, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'James Jones Junior', birthday: '11-15-1992', email: 'james.jones.junior@gmail.com', username: 'ufclover', userType: 'buyer', loggedIn: false},
]

const products = [
  {
    key: 1,
    product_image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftechreport.com%2Fr.x%2F2016_9_27_Razer_Deathadder_sheds_Chroma_skin_to_achieve_Elite_status%2Fdaelite_gallery02.png',
    name: 'Deathadder',
    slug: 'deathadder',
    category: 'Peripheral',
    brand: 'Razer',
    price: 32,
    stock: 2499,
    description: 'Good Mouse',
    reviews: [{userId: users[0].userId, reaction: 'very very good', rating: 5, dateReviewed: '01-20-2021'}, {userId: users[1].userId, reaction: 'fairlygood', rating: 3, dateReviewed: '01-20-2021'}, {userId: users[2].userId, reaction: 'fair', rating: 3, dateReviewed: '01-20-2021'}],
    orders: 0
  },
  {
    key: 2,
    product_image: 'https://i.dell.com/das/dih.ashx/500x500/das/xa_____/global-site-design%20WEB/808a98fc-260b-f278-b92e-bd1b4de12eb2/1/OriginalPng?id=Dell/Product_Images/Peripherals/Input_Devices/Dell/Mouse/wm324/relativesize/dell-wireless-mouse-wm324-relativesize-500.png',
    name: 'WM324 Wireless Mouse',
    slug: 'wm324-wireless-mouse',
    category: 'Peripheral',
    brand: 'Dell',
    price: 999,
    stock: 300,
    description: 'Bad Mouse',
    reviews: [{userId: users[2].userId, reaction: 'cool', rating: 4, dateReviewed: '01-25-2021'}, {userId: users[4].userId, reaction: 'awesome', rating: 5, dateReviewed: '12-20-2020'}],
    orders: 1
  },
  {
    key: 3,
    product_image: 'https://www.epson.eu/files/assets/converted/1500m-1500m/e/p/s/o/epson_perfection_v500_web.png.png',
    name: 'V500 Photo Scanner',
    slug: 'v500-photo-scanner',
    category: 'Scanner',
    brand: 'Epson',
    price: 20000,
    stock: 150,
    description: 'Cool Scan',
    reviews: [{userId: users[0].userId, reaction: 'awesome cool', rating: 4, dateReviewed: '01-14-2021'}, {userId: users[2].userId, reaction: 'cool', rating: 4, dateReviewed: '02-15-2021'}, {userId: users[5].userId, reaction: 'nice', rating: 3, dateReviewed: '01-20-2021'}],
    orders: 0
  },
  {
    key: 4,
    product_image: 'https://mediaserver.goepson.com/ImConvServlet/imconv/d4ad82746aacb0b9b4ad029051822baa2a532451/515Wx515H?use=productpictures&assetDescr=wf2850_SPT_C11CG31201_384x286',
    name: 'WF-2850 Printer',
    slug: 'wf-2850-printer',
    category: 'Printer',
    brand: 'Epson',
    price: 25000,
    stock: 200,
    description: 'Cool Print',
    reviews: [{userId: users[1].userId, reaction: 'not satisfied', rating: 2, dateReviewed: '01-22-2021'}, {userId: users[2].userId, reaction: 'not satisfied', rating: 2, dateReviewed: '01-22-2021'}, {userId: users[4].userId, reaction: 'fair', rating: 3, dateReviewed: '03-04-2021'}, {userId: users[5].userId, reaction: 'cool', rating: 4, dateReviewed: '01-20-2021'}],
    orders: 4
  },
  {
    key: 5,
    product_image: 'https://www.pngkit.com/png/full/362-3625160_lenovo-laptop-png-download-yoga-lenovo-920-black.png',
    name: 'Lenovo Laptop',
    slug: 'lenovo-laptop',
    category: 'Laptop',
    brand: 'Lenovo',
    price: 50000,
    stock: 20,
    description: 'Cool laptop',
    rating: 0,
    reviews: [{userId: users[4].userId, reaction: 'awesome', rating: 4, dateReviewed: '01-24-2021'}],
    orders: 4
  },
]

const productKeys = products.map(product => product.key);

const orderlist = [
  {
    key: 1,
    orderId: '112311',
    userId: users[0].userId,
    total: [{key: products[3].key, quantity: 1}, {key: products[4].key, quantity: 3}].reduce((sum, product) => sum + products[productKeys.indexOf(product.key)].price * product.quantity, 0) + shippingFee,
    items: [{key: products[3].key, quantity: 1}, {key: products[4].key, quantity: 3}],
    shippingFee: shippingFee,
    dateOrdered: '03-26-2021',
  },
  {
    key: 2,
    orderId: '112312',
    userId: users[1].userId,
    total: [{key: products[3].key, quantity: 1}, {key: products[1].key, quantity: 1}].reduce((sum, product) => sum + products[productKeys.indexOf(product.key)].price * product.quantity, 0) + shippingFee,
    items: [{key: products[3].key, quantity: 1}, {key: products[1].key, quantity: 1}],
    shippingFee: shippingFee,
    dateOrdered: '03-27-2021',
  },
  {
    key: 3,
    orderId: '112313',
    userId: users[2].userId,
    total: [{key: products[4].key, quantity: 1}].reduce((sum, product) => sum + products[productKeys.indexOf(product.key)].price * product.quantity, 0) + shippingFee,
    items: [{key: products[4].key, quantity: 1}],
    shippingFee: shippingFee,
    dateOrdered: '03-27-2021',
  },
  {
    key: 4,
    orderId: '112314',
    userId: users[3].userId,
    total: [{key: products[3].key, quantity: 2}].reduce((sum, product) => sum + products[productKeys.indexOf(product.key)].price * product.quantity, 0) + shippingFee,
    items: [{key: products[3].key, quantity: 2}],
    shippingFee: shippingFee,
    dateOrdered: '03-27-2021',
  },
];

const cart = [
  { key: 1, quantity: 2, userId: users[0].userId },
  { key: 3, quantity: 1, userId: users[0].userId },
  { key: 5, quantity: 1, userId: users[0].userId }
]

db.insertMany('users', users);
db.insertMany('products', products);
db.insertMany('orders', orderlist);
db.insertMany('cart', cart);