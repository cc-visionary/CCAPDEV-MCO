import React, { Component } from 'react';
import { message } from 'antd';
import { HashRouter as Router, Switch, Route, BrowsetRouter } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

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

const shippingFee = 99.99;

const cartDummy = [
  { key: 1, quantity: 2 },
  { key: 3, quantity: 1 },
  { key: 5, quantity: 1 }
]

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      products: [],
      cart: cartDummy,
      orderHistory: [],
      orders: []
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

  setOrders = ( orders ) => {
    this.setState({ orders })
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
    const { cart, products, orders, orderHistory, user} = this.state;
    const { setUser, setLoggedIn, setUserType, setProducts, setCart, setOrderHistory, setOrders, addToCart } = this;

    return (
      <Router>
        <Navigation products={products} cart={cart} user={user} setUser={setUser} setLoggedIn={setLoggedIn} setUserType={setUserType} />
        <div id="main">
          {user.userType == 'seller' ? 
          <Switch>
            <Route exact path="/" component={(props) => <Dashboard users={userDummy} cart={cart} setCart={setCart} products={products} setProducts={setProducts} orders={orders} {...props} />} />
            <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} setLoggedIn={setLoggedIn} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
          : 
          <Switch>
            <Route exact path="/" component={LandingPage} className="main" />
            <Route path="/register" component={Register} />
            <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/product/:slug" component={(props) => <ProductPage cart={cart} addToCart={addToCart} {...props} />} />
            <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/cart" component={(props) => <Cart shippingFee={shippingFee} cart={cart} products={products} setCart={setCart} {...props} />} />
            <Route path="/checkout" component={(props) => <Checkout user={user} orderHistory={orderHistory} products={products} setProducts={setProducts} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} {...props} />} />
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
