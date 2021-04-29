import React, { Component } from 'react';
import { message } from 'antd';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import { Navigation, Footer } from './components';
import { Profile, Register, LandingPage, PageNotFound, Dashboard, ProductCatalog, ProductPage, Cart, Checkout, OrderHistory } from './pages';

import { UserService, CartService, OrderService, ProductService } from './services';

const shippingFee = 99.99;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      user: {},
      products: [],
      orders: [],
      cart: [],
      orderHistory: [],
      loggedIn: false,
    }
  }

  setUser = ( user ) => {
    if(user === null) user = {};
    this.setState({ user })
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

  setOrders = ( orders ) => {
    this.setState({ orders })
  }

  addToCart = (item) => {
    const { cart } = this.state;

    let inCart = false

    console.log(item)
    
    const newCart = cart.map((data) => {
      if(data.productId === item.productId) {
        inCart = true;
        data['quantity'] += item.quantity
      }

      return data;
    })

    if(inCart) {
      let cartToUpdate = newCart[cart.map(c => c.productId).indexOf(item.productId)]
      CartService.updateCart(cartToUpdate).then(() => {
        this.setState( { cart: newCart });
        message.success('Successfully updated the cart')
      })
    } else {
      const newItem = {...item, userId: this.state.user.userId};
      CartService.addToCart(newItem).then(() => {
        this.setState({ cart: [...cart, newItem]});
        message.success('Successfully added the item to cart')
      })
    }
  }

  logUserIn = ( user ) => {
    CartService.getUserCart(user.userId).then(res => {
      this.setCart(res.data);
    })

    OrderService.getOrderByUser(user.userId).then(res => {
      this.setOrderHistory(res.data);
    })

    this.setUser(user);
    this.setLoggedIn(true);
    message.success('Logged in successfully!');
  }

  logUserOut = () => {
    UserService.logout().then(res => {
      this.setUser(null);
      this.setCart([]);
      this.setOrderHistory([]);
      this.setLoggedIn(false);
      message.success('Logged out successfully!');
    })
  }

  componentDidMount = () => {
    UserService.getAllUsers().then(res => {
      this.setState({ users: res.data })
      return res.data
    }).then(users => {
      UserService.getLogin().then(res => {
        const { success, user } = res.data;
        const userIds = users.map(user => user.userId);
        if(success) {
          this.logUserIn(users[userIds.indexOf(user.userId)]);
        } 
      })
    })
    
    ProductService.getAllProducts().then(res => {
      this.setProducts(res.data)
    })

    OrderService.getAllOrders().then(res => {
      this.setOrders(res.data)
    })
  }

  render() {
    const { cart, products, orders, orderHistory, user, users, loggedIn } = this.state;
    const { setProducts, setCart, setOrderHistory, setOrders, addToCart, logUserIn, logUserOut } = this;

    return (
      <Router>
        <Navigation logUserIn={logUserIn} logUserOut={logUserOut} products={products} cart={cart} user={user} loggedIn={loggedIn} />
        <div id="main">
          {loggedIn ? 
            user.userType == 'seller' ? 
              <Switch>
                <Route exact path="/" component={(props) => <Dashboard products={products} users={users} orders={orders} cart={cart} setCart={setCart} {...props} />} />
                <Route path="/profile" component={(props) => <Profile user={user} logUserOut={logUserOut} {...props} />} />
                <Route component={PageNotFound} />
              </Switch>
              : 
              <Switch>
                <Route exact path="/" component={LandingPage} className="main" />
                <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
                <Route path="/product/:slug" component={(props) => <ProductPage products={products} users={users} cart={cart} addToCart={addToCart} {...props} />} />
                <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
                <Route path="/cart" component={(props) => <Cart products={products} shippingFee={shippingFee} cart={cart} setCart={setCart} {...props} />} />
                <Route path="/checkout" component={(props) => <Checkout user={user} products={products} setProducts={setProducts} orderHistory={orderHistory} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} {...props} />} />
                <Route path="/order-history" component={(props) => <OrderHistory user={user} products={products} setProducts={setProducts} orderHistory={orderHistory} {...props} />} />
                <Route path="/profile" component={(props) => <Profile user={user} logUserOut={logUserOut} {...props} />} />
                <Route component={PageNotFound} />
              </Switch>
              :
            <Switch>
              <Route exact path="/" component={LandingPage} className="main" />
              <Route path="/register" component={(props) => <Register uniqueUserId={Math.max(...users.map(user => user.userId)) + 1} logUserIn={logUserIn} {...props} />} />
              <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
              <Route path="/product/:slug" component={(props) => <ProductPage products={products} users={users} cart={cart} addToCart={addToCart} {...props} />} />
              <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
              <Route component={PageNotFound} />
            </Switch>
          }
        </div>
        <Footer />
      </Router>
    );
  }
}
