import React, { useState } from 'react';
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
import Checkout from './pages/buyer/Checkout';

const products = [
  {
    key: 1,
    product_image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ftechreport.com%2Fr.x%2F2016_9_27_Razer_Deathadder_sheds_Chroma_skin_to_achieve_Elite_status%2Fdaelite_gallery02.png',
    name: 'Deathadder',
    category: 'Peripheral',
    brand: 'Razer',
    price: 32,
    stock: 2499.99,
    description: 'Good Mouse',
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
  },
  {
    key: 6,
    product_image: 'https://www.pngarts.com/files/4/Dell-Laptop-PNG-Image.png',
    name: 'Dell Laptop',
    category: 'Laptop',
    brand: 'Dell',
    price: 50000,
    stock: 25,
    description: 'Awesome Laptop',
  },
  {
    key: 7,
    product_image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nanotek.lk%2Fuploads%2Fproduct%2F822-20180919151235-logitech613.png&f=1&nofb=1',
    name: 'Logitech G703 LightSpeed Wireless Gaming Mouse',
    category: 'Peripheral',
    brand: 'Logitech',
    price: 2000,
    stock: 25,
    description: "One of the most favored gaming mouse recommended by gamers.",
  },
]

const orderList = [
  {
    key: 1,
    order_id: '112311',
    amount: 200.00,
    items: 'Razer Mouse, Logitech Mouse',
    date_ordered: '03-26-2021',
  },
  {
    key: 2,
    order_id: '112312',
    amount: 50000.00,
    items: 'Lenovo Laptop',
    date_ordered: '03-27-2021',
  },
  {
    key: 3,
    order_id: '112313',
    amount: 300.00,
    items: 'Laptop Fan',
    date_ordered: '03-27-2021',
  },
  {
    key: 4,
    order_id: '112314',
    amount: 50000.00,
    items: 'Dell Laptop',
    date_ordered: '03-27-2021',
  },
];

const cart = [
  products[0],
  products[2],
  products[6]
]

const App = () => {
  const [userType, setUserType] = useState('buyer');
  const [loggedIn, setLoggedIn] = useState(true);
  const [cartList, setCartList] = useState(cart);

  const addToCart = (product) => {
    setCartList([...cartList, product])
  }

  const deleteFromCart = (product) => {

  }

  return (
    <Router>
      <Navigation cart={cartList} deleteFromCart={deleteFromCart} loggedIn={loggedIn} setLoggedIn={setLoggedIn} userType={userType} setUserType={setUserType} />
      <div className="main">
        {userType == 'seller' ? 
        <Switch>
          <Route exact path="/" component={(props) => <Dashboard products={products} orderList={orderList} {...props} />} />
        </Switch>
        : 
        <Switch>
          <Route exact path="/" component={LandingPage} className="main" />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/products" component={(props) => <ProductCatalog products={products} {...props} />} />
          <Route path="/product/:slug" component={(props) => <ProductPage addToCart={addToCart} {...props} />} />
          <Route path="/category/:category" component={(props) => <ProductCatalog products={products} {...props} />} />
          <Route path="/checkout" component={Checkout} />
          <Route component={PageNotFound} />
        </Switch>
        }
        
      </div>
      <Footer />
    </Router>
  );
}

export default App;
