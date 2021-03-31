import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/seller/Dashboard';
import ProductCatalog from './pages/buyer/ProductCatalog';
import ProductInCategory from './pages/buyer/ProductInCategory';
import ProductPage from './pages/buyer/ProductPage';

const products = [
  {
    key: '1',
    product_image: '',
    name: 'Deathadder',
    category: 'Peripherals',
    brand: 'Razer',
    price: 32,
    description: 'Good Mouse',
  },
  {
    key: '2',
    product_image: '',
    name: 'Mouse',
    category: 'Peripherals',
    brand: 'Dell',
    price: 42,
    description: 'Bad Mouse',
  },
  {
    key: '3',
    product_image: '',
    name: 'Epson Scan',
    category: 'Scanner',
    brand: 'Epson',
    price: 32,
    description: 'Cool Scan',
  },
  {
    key: '4',
    product_image: '',
    name: 'Epson Print',
    category: 'Printer',
    brand: 'Epson',
    price: 32,
    description: 'Cool Print',
  },
]

const orderList = [
  {
    key: '1',
    order_id: '112311',
    amount: 200.00,
    items: 'Razer Mouse, Logitech Mouse',
    date_ordered: '03-26-2021',
  },
  {
    key: '2',
    order_id: '112312',
    amount: 50000.00,
    items: 'Lenovo Laptop',
    date_ordered: '03-27-2021',
  },
  {
    key: '3',
    order_id: '112313',
    amount: 300.00,
    items: 'Laptop Fan',
    date_ordered: '03-27-2021',
  },
  {
    key: '4',
    order_id: '112314',
    amount: 50000.00,
    items: 'Dell Laptop',
    date_ordered: '03-27-2021',
  },
];

const App = () => {
  const loggedIn = true;
  const user = 'buyer';

  return (
    <Router>
      <Navigation loggedIn={loggedIn} user={user} />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <ProductCatalog products={products} />
          {/* <Dashboard products={products} orderList={orderList} /> */}
          {/* <LandingPage /> */}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
