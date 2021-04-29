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

    console.log(item)
    
    const newCart = cart.map((data) => {
      if(data.key === item.key) {
        inCart = true;
        data['quantity'] += item.quantity
      }

      return data;
    })

    if(inCart) {
      let cartToUpdate = newCart[cart.map(c => c.key).indexOf(item.key)]
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

  componentDidMount = () => {
    UserService.getAllUsers().then(res => {
      this.setState({ user: res.data[0], users: res.data })
      return res.data[0];
    }).then(user => {
      CartService.getUserCart(user.userId).then(res => {
        this.setCart(res.data);
      })

      OrderService.getOrderByUser(user.userId).then(res => {
        this.setOrderHistory(res.data);
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
    const { cart, products, orders, orderHistory, user, users} = this.state;
    const { setUser, setLoggedIn, setUserType, setProducts, setCart, setOrderHistory, setOrders, addToCart } = this;

    console.log(orders)

    return (
      <Router>
        <Navigation products={products} cart={cart} user={user} setUser={setUser} setLoggedIn={setLoggedIn} setUserType={setUserType} />
        <div id="main">
          {user.userType == 'seller' ? 
          <Switch>
            <Route exact path="/" component={(props) => <Dashboard products={products} users={users} orders={orders} cart={cart} setCart={setCart} {...props} />} />
            <Route path="/profile" component={(props) => <Profile user={user} setUser={setUser} setLoggedIn={setLoggedIn} {...props} />} />
            <Route component={PageNotFound} />
          </Switch>
          : 
          <Switch>
            <Route exact path="/" component={LandingPage} className="main" />
            <Route path="/register" component={Register} />
            <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/product/:slug" component={(props) => <ProductPage products={products} users={users} cart={cart} addToCart={addToCart} {...props} />} />
            <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
            <Route path="/cart" component={(props) => <Cart products={products} shippingFee={shippingFee} cart={cart} setCart={setCart} {...props} />} />
            <Route path="/checkout" component={(props) => <Checkout user={user} products={products} setProducts={setProducts} orderHistory={orderHistory} setOrderHistory={setOrderHistory} shippingFee={shippingFee} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} {...props} />} />
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
