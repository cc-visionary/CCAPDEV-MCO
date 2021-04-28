import React, { Component } from 'react';
import { message } from 'antd';
import { HashRouter as Router, Switch, Route, BrowsetRouter } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

import { Navigation, Footer } from './components';
import { Profile, Register, LandingPage, PageNotFound, Dashboard, ProductCatalog, ProductPage, Cart, Checkout, OrderHistory } from './pages';

import { UserService, ProductService, CartService } from './services';

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
      user: {},
      cart: cartDummy,
      orderHistory: [],
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
    UserService.getAllUsers().then(res => {
      this.setState({ user : res.data[0] })
    })
  }

  render() {
    const { cart, orders, orderHistory, user} = this.state;
    const { setUser, setLoggedIn, setUserType, setProducts, setCart, setOrderHistory, setOrders, addToCart } = this;

    return (
      <Router>
        <Navigation cart={cart} user={user} setUser={setUser} setLoggedIn={setLoggedIn} setUserType={setUserType} />
        <div id="main">
          {user.userType == 'seller' ? 
          <Switch>
            <Route exact path="/" component={(props) => <Dashboard cart={cart} setCart={setCart} {...props} />} />
            <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} setLoggedIn={setLoggedIn} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
          : 
          <Switch>
            <Route exact path="/" component={LandingPage} className="main" />
            <Route path="/register" component={Register} />
            <Route path="/products" component={(props) => <ProductCatalog {...props} />} />
            <Route path="/product/:slug" component={(props) => <ProductPage cart={cart} addToCart={addToCart} {...props} />} />
            <Route path="/category/:category" component={ProductCatalog} />
            <Route path="/cart" component={(props) => <Cart shippingFee={shippingFee} cart={cart} setCart={setCart} {...props} />} />
            <Route path="/checkout" component={(props) => <Checkout user={user} orderHistory={orderHistory} setProducts={setProducts} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} {...props} />} />
            <Route path="/order-history" component={(props) => <OrderHistory user={user} setProducts={setProducts} orderHistory={orderHistory} {...props} />} />
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
