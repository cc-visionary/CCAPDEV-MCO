import React, { Component } from 'react';
import { message } from 'antd';
import { HashRouter as Router, Switch, Route, BrowsetRouter } from "react-router-dom";

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/seller/Dashboard';
import ProductCatalog from './pages/buyer/ProductCatalog';
import ProductPage from './pages/buyer/ProductPage';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import OrderHistory from './pages/buyer/OrderHistory';
import moment from 'moment';

const shippingFee = 99.99;

const userDummy = [
  {userId: 1032, avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png', fullname: 'John Doe', username: 'johndoe', birthday: moment('03-20-1999', 'MM-DD-YYYY'), email: 'john-ish-doe-ish@gmail.com', password: 'coolguy123', userType: 'buyer', loggedIn: true},
  {userId: 1033, fullname: 'Kate Meeks', email: 'kate.meek443@gmail.com', username: 'sweetgirl123', userType: 'buyer', loggedIn: false},
  {userId: 1034, fullname: 'Joseph Bourne', email: 'joseph.bourne.a.lover143@gmail.com', username: 'xXbatmanXx143', userType: 'buyer', loggedIn: false},
  {userId: 1035, fullname: 'Mark Edwards', email: 'cool.mark.edwards@gmail.com', username: 'coolkidXD', userType: 'buyer', loggedIn: false},
  {userId: 1036, fullname: 'Hazel Nut', email: 'hazel.nut.coffee@gmail.com', username:'coffeelover42', userType: 'buyer', loggedIn: false},
  {userId: 1037, fullname: 'James Jones Junior', email: 'james.jones.junior@gmail.com', username: 'ufclover', userType: 'buyer', loggedIn: false},
]

const productsDummy = [
  {
    key: 1,
    product_image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftechreport.com%2Fr.x%2F2016_9_27_Razer_Deathadder_sheds_Chroma_skin_to_achieve_Elite_status%2Fdaelite_gallery02.png',
    name: 'Deathadder',
    category: 'Peripheral',
    brand: 'Razer',
    price: 32,
    stock: 2499,
    description: 'Good Mouse',
    reviews: [{user: userDummy[0], reaction: 'very very good', rating: 5, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}, {user: userDummy[1], reaction: 'fairlygood', rating: 3, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}, {user: userDummy[2], reaction: 'fair', rating: 3, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}],
    orders: 15
  },
  {
    key: 2,
    product_image: 'https://i.dell.com/das/dih.ashx/500x500/das/xa_____/global-site-design%20WEB/808a98fc-260b-f278-b92e-bd1b4de12eb2/1/OriginalPng?id=Dell/Product_Images/Peripherals/Input_Devices/Dell/Mouse/wm324/relativesize/dell-wireless-mouse-wm324-relativesize-500.png',
    name: 'WM324 Wireless Mouse',
    category: 'Peripheral',
    brand: 'Dell',
    price: 999,
    stock: 300,
    description: 'Bad Mouse',
    reviews: [{user: userDummy[2], reaction: 'cool', rating: 4, dateReviewed: moment('01-25-2021', 'MM-DD-YYYY')}, {user: userDummy[4], reaction: 'awesome', rating: 5, dateReviewed: moment('12-20-2020', 'MM-DD-YYYY')}],
    orders: 23
  },
  {
    key: 3,
    product_image: 'https://www.epson.eu/files/assets/converted/1500m-1500m/e/p/s/o/epson_perfection_v500_web.png.png',
    name: 'V500 Photo Scanner',
    category: 'Scanner',
    brand: 'Epson',
    price: 20000,
    stock: 150,
    description: 'Cool Scan',
    reviews: [{user: userDummy[0], reaction: 'awesome cool', rating: 4, dateReviewed: moment('01-14-2021', 'MM-DD-YYYY')}, {user: userDummy[2], reaction: 'cool', rating: 4, dateReviewed: moment('02-15-2021', 'MM-DD-YYYY')}, {user: userDummy[5], reaction: 'nice', rating: 3, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}],
    orders: 20
  },
  {
    key: 4,
    product_image: 'https://mediaserver.goepson.com/ImConvServlet/imconv/d4ad82746aacb0b9b4ad029051822baa2a532451/515Wx515H?use=productpictures&assetDescr=wf2850_SPT_C11CG31201_384x286',
    name: 'WF-2850 Printer',
    category: 'Printer',
    brand: 'Epson',
    price: 25000,
    stock: 200,
    description: 'Cool Print',
    reviews: [{user: userDummy[1], reaction: 'not satisfied', rating: 2, dateReviewed: moment('01-22-2021', 'MM-DD-YYYY')}, {user: userDummy[2], reaction: 'not satisfied', rating: 2, dateReviewed: moment('01-22-2021', 'MM-DD-YYYY')}, {user: userDummy[4], reaction: 'fair', rating: 3, dateReviewed: moment('03-04-2021', 'MM-DD-YYYY')}, {user: userDummy[5], reaction: 'cool', rating: 4, dateReviewed: moment('01-20-2021', 'MM-DD-YYYY')}],
    orders: 18
  },
  {
    key: 5,
    product_image: 'https://www.pngkit.com/png/full/362-3625160_lenovo-laptop-png-download-yoga-lenovo-920-black.png',
    name: 'Lenovo Laptop',
    category: 'Laptop',
    brand: 'Lenovo',
    price: 50000,
    stock: 20,
    description: 'Cool laptop',
    rating: 0,
    reviews: [{user: userDummy[4], reaction: 'awesome', rating: 4, dateReviewed: moment('01-24-2021', 'MM-DD-YYYY')}],
    orders: 13
  },
]

const orderListDummy = [
  {
    key: 1,
    orderId: '112311',
    total: [{...productsDummy[3], quantity: 1}, {...productsDummy[4], quantity: 3}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[3], quantity: 1}, {...productsDummy[4], quantity: 3}],
    shippingFee: shippingFee,
    dateOrdered: moment('03-26-2021', 'MM-DD-YYYY'),
  },
  {
    key: 2,
    orderId: '112312',
    total: [{...productsDummy[3], quantity: 1}, {...productsDummy[1], quantity: 1}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[3], quantity: 1}, {...productsDummy[1], quantity: 1}],
    shippingFee: shippingFee,
    dateOrdered: moment('03-27-2021', 'MM-DD-YYYY'),
  },
  {
    key: 3,
    orderId: '112313',
    total: [{...productsDummy[4], quantity: 1}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[4], quantity: 1}],
    shippingFee: shippingFee,
    dateOrdered: moment('03-27-2021', 'MM-DD-YYYY'),
  },
  {
    key: 4,
    orderId: '112314',
    total: [{...productsDummy[3], quantity: 2}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[3], quantity: 2}],
    shippingFee: shippingFee,
    dateOrdered: moment('03-27-2021', 'MM-DD-YYYY'),
  },
];

const cartDummy = [
  { key: 1, quantity: 2 },
  { key: 3, quantity: 1 },
  { key: 5, quantity: 1 }
]

const orderHistoryDummy = [
  orderListDummy[0],
  orderListDummy[3]
]

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: userDummy[0],
      products: productsDummy,
      cart: cartDummy,
      orderHistory: orderHistoryDummy,
      orderList: orderListDummy
    }
  }

  setUser = ( user ) => {
    this.setState({ user })
  }

  setUserType = ( userType ) => {
    this.setState({ user: { ...this.state.user, userType } });
  }

  setLoggedIn = ( loggedIn ) => {
    this.setState({ user: { ...this.state.user, loggedIn } });
  }

  setProducts = ( products ) => {
    this.setState({ products });
  }

  setCart = ( cart ) => {
    this.setState({ cart });
  }

  setOrderHistory = ( orderHistory ) => {
    this.setState({ orderHistory });
  }

  setOrderList = ( orderList ) => {
    this.setState({ orderList })
  }

  addToCart = (item) => {
    const { cart } = this.state;

    let inCart = false
    
    const newCart = cart.map((data) => {
      if(data.key === item.key) {
        inCart = true;
        data['quantity'] += item.quantity
      }

      return data;
    })

    if(inCart) this.setCart(newCart)
    else this.setCart([...cart, item])  

    message.success('Successfully added to cart')
  }

  componentDidMount = () => {

  }

  render() {
    const { cart, products, orderList, orderHistory, user} = this.state;
    const { setUser, setLoggedIn, setUserType, setProducts, setCart, setOrderHistory, setOrderList, addToCart } = this;

    return (
      <Router>
        <Navigation products={products} cart={cart} user={user} setUser={setUser} setLoggedIn={setLoggedIn} setUserType={setUserType} />
        <div id="main">
          {user.userType == 'seller' ? 
          <Switch>
            <Route exact path="/" component={(props) => <Dashboard users={userDummy} cart={cart} setCart={setCart} products={products} setProducts={setProducts} orderList={orderList} {...props} />} />
            <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} setLoggedIn={setLoggedIn} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
          : 
          <Switch>
            <Route exact path="/" component={LandingPage} className="main" />
            <Route path="/register" component={Register} />
            <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/product/:slug" component={(props) => <ProductPage addToCart={addToCart} {...props} />} />
            <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/cart" component={(props) => <Cart shippingFee={shippingFee} cart={cart} products={products} setCart={setCart} {...props} />} />
            <Route path="/checkout" component={(props) => <Checkout user={user} orderHistory={orderHistory} products={products} setProducts={setProducts} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} orderList={orderList} setOrderList={setOrderList} {...props} />} />
            <Route path="/order-history" component={(props) => <OrderHistory user={user} products={products} setProducts={setProducts} orderHistory={orderHistory} {...props} />} />
            <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} setLoggedIn={setLoggedIn} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
          }
        </div>
        <Footer />
      </Router>
    );
  }
}
