/* 
  Main file which controls the whole Website
  Main Purpose:
    1. Routes the pages to their respective paths through react-router-dom
    2. Requests the datas needed from the database (users, cart, orders, and products) and passes those as props to the pages that needs those 
    3. Contains the functions that can be reused by different pages (ex. setUser, etc.)
*/

import React, { Component } from 'react';
import { message } from 'antd';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

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

  // sets the `this.state.user` value to the parameter `user` that was passed
  setUser = ( user ) => {
    if(user === null) user = {};
    this.setState({ user })
  }

  // sets the `this.state.loggedIn` value to the parameter `loggedIn` that was passed
  setLoggedIn = ( loggedIn ) => {
    this.setState({ loggedIn });
  }

  // sets the `this.state.products` value to the parameter `products` that was passed
  setProducts = ( products ) => {
    this.setState({ products });
  }

  // sets the `this.state.cart` value to the parameter `cart` that was passed
  setCart = ( cart ) => {
    this.setState({ cart });
  }

  // sets the `this.state.orderHistory` value to the parameter `orderHistory` that was passed
  setOrderHistory = ( orderHistory ) => {
    this.setState({ orderHistory });
  }

  // sets the `this.state.orders` value to the parameter `orders` that was passed
  setOrders = ( orders ) => {
    this.setState({ orders })
  }

  /*
    adds the parameter `item` to the cart. 
    this checks if the parameter `item` is already in the cart.
      if it is, then it'll just add the `item`'s quantity to the existing item in the cart
      if not it'll simply add that item to the cart
  */ 
  addToCart = (item) => {
    const { cart } = this.state;

    let inCart = false
    
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

  /* 
    gets the user's cart and orderHistory then set those to the app's curernt cart and orderHistory. 
    then sets the `this.state.user` to the parameter `user` and `this.state.loggedIn` to true.
  */
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

  /*
    logs the user our then set all the related this.state variable to empty/null then set `this.state.loggedIn` to false
  */
  logUserOut = () => {
    UserService.logout().then(res => {
      this.setUser(null);
      this.setCart([]);
      this.setOrderHistory([]);
      this.setLoggedIn(false);
      message.success('Logged out successfully!');
    })
  }

  /*
    When the page has been mounted, do the following:
    1. Get all the users from the database then assign it to `this.state.users`
    2. Check if there is a current user logged in
    3. Get all the products from the database then assign it to `this.state.products`
    4. Get all the orders from the database then assign it to `this.state.orders`
  */
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
    const { setProducts, setCart, setOrderHistory, setOrders, addToCart, logUserIn, logUserOut, setUser } = this;
    
    return (
      <Router>
        <Navigation logUserIn={logUserIn} logUserOut={logUserOut} products={products} cart={cart} user={user} loggedIn={loggedIn} />
        <div id="main">
          {loggedIn ? 
            user.userType == 'seller' ? 
              <Switch>
                <Route exact path="/" component={(props) => <Dashboard products={products} setProducts={setProducts} users={users} orders={orders} cart={cart} setCart={setCart} {...props} />} />
                <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} logUserOut={logUserOut} {...props} />} />
                <Route component={PageNotFound} />
              </Switch>
              : 
              <Switch>
                <Route exact path="/" component={LandingPage} className="main" />
                <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
                <Route path="/product/:slug" component={(props) => <ProductPage loggedIn={loggedIn} products={products} users={users} cart={cart} addToCart={addToCart} {...props} />} />
                <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
                <Route path="/cart" component={(props) => <Cart products={products} shippingFee={shippingFee} cart={cart} setCart={setCart} {...props} />} />
                <Route path="/checkout" component={(props) => <Checkout user={user} products={products} setProducts={setProducts} orderHistory={orderHistory} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} {...props} />} />
                <Route path="/order-history" component={(props) => <OrderHistory user={user} products={products} setProducts={setProducts} orderHistory={orderHistory} {...props} />} />
                <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} logUserOut={logUserOut} {...props} />} />
                <Route component={PageNotFound} />
              </Switch>
              :
            <Switch>
              <Route exact path="/" component={LandingPage} className="main" />
              <Route path="/register" component={(props) => <Register users={users} uniqueUserId={Math.max(...users.map(user => user.userId)) + 1} logUserIn={logUserIn} {...props} />} />
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
