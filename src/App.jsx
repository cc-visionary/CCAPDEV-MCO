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
    reviews: [{reaction: 'not really good', rating: 2}, {reaction: 'fair', rating: 3}],
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
    reviews: [{reaction: 'cool', rating: 4}, {reaction: 'awesome', rating: 5}],
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
    reviews: [{reaction: 'awesome cool', rating: 4}, {reaction: 'cool', rating: 4}, {reaction: 'nice', rating: 3}],
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
    reviews: [{reaction: 'not satisfied', rating: 2}, {reaction: 'fair', rating: 3}, {reaction: 'cool', rating: 4}],
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
    rating: 3,
    reviews: [{reaction: 'awesome', rating: 4}],
    orders: 13
  },
  {
    key: 6,
    product_image: 'https://www.pngarts.com/files/4/Dell-Laptop-PNG-Image.png',
    name: 'Dell Laptop',
    category: 'Laptop',
    brand: 'Dell',
    price: 50000,
    stock: 0,
    description: 'Awesome Laptop',
    reviews: [],
    orders: 0
  },
  {
    key: 7,
    product_image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nanotek.lk%2Fuploads%2Fproduct%2F822-20180919151235-logitech613.png&f=1&nofb=1',
    name: 'Logitech G703 LightSpeed Wireless Gaming Mouse',
    category: 'Peripheral',
    brand: 'Logitech',
    price: 2000,
    stock: 1,
    description: "One of the most favored gaming mouse recommended by gamers.",
    reviews: [],
    orders: 0
  },
]

const orderListDummy = [
  {
    key: 1,
    order_id: '112311',
    total: [{...productsDummy[3], quantity: 1}, {...productsDummy[4], quantity: 3}, {...productsDummy[5], quantity: 2}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[3], quantity: 1}, {...productsDummy[4], quantity: 3}, {...productsDummy[5], quantity: 2}],
    shippingFee: shippingFee,
    date_ordered: moment('03-26-2021', 'MM-DD-YYYY'),
  },
  {
    key: 2,
    order_id: '112312',
    total: [{...productsDummy[3], quantity: 1}, {...productsDummy[1], quantity: 1}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[3], quantity: 1}, {...productsDummy[1], quantity: 1}],
    shippingFee: shippingFee,
    date_ordered: moment('03-27-2021', 'MM-DD-YYYY'),
  },
  {
    key: 3,
    order_id: '112313',
    total: [{...productsDummy[5], quantity: 1}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[5], quantity: 1}],
    shippingFee: shippingFee,
    date_ordered: moment('03-27-2021', 'MM-DD-YYYY'),
  },
  {
    key: 4,
    order_id: '112314',
    total: [{...productsDummy[6], quantity: 2}].reduce((sum, product) => sum + product.price * product.quantity, 0) + shippingFee,
    items: [{...productsDummy[6], quantity: 2}],
    shippingFee: shippingFee,
    date_ordered: moment('03-27-2021', 'MM-DD-YYYY'),
  },
];

const cartDummy = [
  { key: 1, quantity: 2 },
  { key: 3, quantity: 1 },
  { key: 7, quantity: 1 }
]

const orderHistoryDummy = [
  {
    key: 1,
    contactInfo: [],
    total: [{...productsDummy[0], quantity: 1}, {...productsDummy[2], quantity: 2}, {...productsDummy[3], quantity: 4}].reduce((sum, data) => sum + parseFloat(data.price) * parseFloat(data.quantity), 0) + shippingFee,
    items: [{...productsDummy[0], quantity: 1}, {...productsDummy[2], quantity: 2}, {...productsDummy[3], quantity: 4}],
    shippingFee: shippingFee,
    date_ordered: moment('04-21-2020 ', 'MM-DD-YYYY'),
  }
]

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userType: 'buyer',
      loggedIn: true,
      products: productsDummy,
      cart: cartDummy,
      orderHistory: orderHistoryDummy,
      orderList: orderListDummy
    }
  }

  setUserType = ( userType ) => {
    this.setState({ userType });
  }

  setLoggedIn = ( loggedIn ) => {
    this.setState({ loggedIn });
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

  addToOrderList = (order) => {
    this.setOrderList([...this.state.orderList, {...order, key: this.state.orderList.length + 1, order_id: 112310 + this.state.orderList.length + 1}])
  }

  componentDidMount = () => {

  }

  render() {
    const { cart, products, orderList, orderHistory, loggedIn, userType } = this.state;
    const { setLoggedIn, setUserType, setProducts, setCart, setOrderHistory, addToCart, addToOrderList } = this;

    return (
      <Router>
        <Navigation products={products} cart={cart} loggedIn={loggedIn} setLoggedIn={setLoggedIn} userType={userType} setUserType={setUserType} />
        <div id="main">
          {userType == 'seller' ? 
          <Switch>
            <Route exact path="/" component={(props) => <Dashboard cart={cart} setCart={setCart} products={products} setProducts={setProducts} orderList={orderList} {...props} />} />
          </Switch>
          : 
          <Switch>
            <Route exact path="/" component={LandingPage} className="main" />
            <Route path="/profile" component={(props) => <Profile setLoggedIn={setLoggedIn} {...props} />} />
            <Route path="/register" component={Register} />
            <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/product/:slug" component={(props) => <ProductPage addToCart={addToCart} {...props} />} />
            <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/cart" component={(props) => <Cart shippingFee={shippingFee} cart={cart} products={products} setCart={setCart} {...props} />} />
            <Route path="/checkout" component={(props) => <Checkout orderHistory={orderHistory} products={products} setProducts={setProducts} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} addToOrderList={addToOrderList} {...props} />} />
            <Route path="/order-history" component={(props) => <OrderHistory products={products} setProducts={setProducts} orderHistory={orderHistory} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
          }
        </div>
        <Footer />
      </Router>
    );
  }
}
