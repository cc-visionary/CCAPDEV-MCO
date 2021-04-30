/* 
  This file contains the view and functions for the Cart page.
  This page will be shown if the url path is '/cart', the user's userType is a 'buyer' loggedIn is true.
*/

import React, { Component } from 'react';
import { Image, Button, Row, Col, Divider, Typography, Form, Input, InputNumber, Select, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

import { OrderService, CartService, ProductService } from '../../services'

const { Title, Text } = Typography;
const { Option } = Select;

export default class Checkout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: [],
      redirect: false
    }
  }

  // when the page mounts, it sets `this.state.countries` to the requested list of countries
  componentDidMount = () => {
    // get the countries through a third party api
    axios.get('https://restcountries.eu/rest/v2/all?fields=name')
      .then(res => this.setState({ countries: res.data }))
  }

  /* 
    called when the user intends to checkout and does the following:
    1. Creates the newOrder object, then add that to the orders database
    2. Redirect to the url path '/'
    3. Change values locally
    4. For each product in the order, update their stock and sold value locally as well as in the database.
       Then if the stock is less than or equal to 0, it deletes that product from all of the user's carts 
  */
  onFinish = (values) => {
    const { user, products, setProducts, shippingFee, cart, orderHistory, setOrderHistory, setCart, orders, setOrders } = this.props;

    const productIds = products.map(data => data.productId);

    const newOrder = {
      orderId: Math.max(...orders.map(order => order.orderId)) + 1,
      contactInfo: values,
      total: cart.reduce((sum, item) => sum + products[productIds.indexOf(item.productId)].price.$numberDecimal * item.quantity, 0) + shippingFee,
      items: cart.map((item) => ({...products[productIds.indexOf(item.productId)], price: products[productIds.indexOf(item.productId)].price.$numberDecimal, quantity: item.quantity})),
      shippingFee,
      userId: user.userId,
      dateOrdered: new Date(moment())
    }
    
    OrderService.addOrder(newOrder)
    
    this.setState({ redirect: true });

    // add to Order History
    setOrderHistory([newOrder, ...orderHistory])

    // add to Order List 
    setOrders([newOrder, ...orders])

    const newProducts = products.map(product => {
      const productIds = newOrder.items.map(item => item.productId);
      if(productIds.includes(product.productId)) {
        const quantity = cart[productIds.indexOf(product.productId)].quantity;
        product['stock'] -= quantity;
        // if stock is negative, set it to 0
        product['stock'] = Math.max(product['stock'], 0);
        product['sold'] += quantity;

        if(product['_id']) delete product['_id']

        ProductService.updateProduct(product);

        // if stock lowers to 0, delete it to all the other user's cart
        if(product.stock <= 0) {
          CartService.deleteCartByItem(product.productId)
        }
      }

      return product;
    })

    // update item stocks
    setProducts(newProducts)

    CartService.deleteCartByUser(user.userId).then(() => {
      // empty cart
      setCart([])
    })

    message.success('Checkout was successful!');
  }

  render () {
    const { redirect } = this.state;
    const { user, products, cart, shippingFee } = this.props;

    const productIds = products.map(data => data.productId);
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(parseFloat(products[productIds.indexOf(item.productId)].price.$numberDecimal ? products[productIds.indexOf(item.productId)].price.$numberDecimal : products[productIds.indexOf(item.productId)].price) * parseFloat(item.quantity.$numberDecimal ? item.quantity.$numberDecimal : item.quantity)), 0).toFixed(2);

    return redirect ? 
    <Redirect to='/' />
    :
    (
      <Row id="checkout" gutter={25}>
        <Col span={16}>
          <Form id='checkout-info' name='checkout-info' layout='vertical' onFinish={this.onFinish}>
            <Title level={3}>Customer Info</Title>
            <Divider />
            <Form.Item initialValue={user.email} name='email' label='Email' rules={[{ type: 'email', message: 'Please enter a valid email'}, { required: true, message: 'Please enter your email'},]}>
              <Input placeholder='Enter your email' />
            </Form.Item>
            <Title level={3}>Shipping Address</Title>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item initialValue={user.fullname} name='fullname' label='Full Name' rules={[{ required: true, message: 'Please enter your fullname' }]}>
                  <Input placeholder='Enter your full name' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='company' label='Company (optional)' >
                  <Input placeholder='Enter your company' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='address-1' label='Address Line 1' rules={[{ required: true, message: 'Please enter your address' }]} >
                  <Input placeholder='Enter your address line 1' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='address-2' label='Address Line 2 (optional)' >
                  <Input placeholder='Enter your address line 1' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='country' label='Country' rules={[{ required: true, message: 'Please select your country' }]} initialValue='Philippines' >
                  <Select showSearch>
                    {this.state.countries.map(data => <Option value={data.name}>{data.name}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='city' label='City' rules={[{ required: true, message: 'Please enter your city' }]} >
                  <Input placeholder='Enter your city' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name='postal-code' label='Postal Code' rules={[{ required: true, message: 'Please enter your postal code' }, { pattern: /^(?:\d*)$/, message: 'Postal Code must consists only of numbers' }]}  >
                  <Input placeholder='Enter your postal code' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='phone' label='Phone Number' rules={[{ required: true, message: 'Please enter your phone number' }, { pattern: /^(?:\d*)$/, message: 'Phone Number must consists only of numbers' }, { pattern: /^[\d]{11}$/, message: 'Phone Number must be 11 digits only' }]}  >
                  <Input placeholder='Enter your phone number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='province' label='Province (optional)' >
                  <Input placeholder='Enter your province' />
                </Form.Item>
              </Col>
            </Row>
            <div className='buttons'>
              <Button type='link'><Link to='/cart'><Text type='secondary'><LeftOutlined/> Return to Cart</Text></Link></Button>
              <Button htmlType="submit">Continue</Button>
            </div>
          </Form>
        </Col>
        <Col className='cart' span={8}>
        <Title level={3}>Your Cart</Title>
          <Divider />
          {cart.map(data => {
            const index = products.map(d => d.productId).indexOf(data.productId)
            return <Row gutter={16} key={data.productId}>
              <Col span={3}><Image width={50} height={50} preview={false} src={products[index].product_image} /></Col>
              <Col span={14}><Text>{products[index].name}</Text><br /><Text type='secondary'>{products[index].brand}</Text></Col>
              <Col span={7}><Text className='prices'>₱{parseFloat(parseFloat(products[index].price.$numberDecimal ? products[index].price.$numberDecimal : products[index].price) * data.quantity).toFixed(2)}</Text></Col>
            </Row>
          })}
          <Divider/>
          <Row gutter={16}>
            <Col span={12}><Text strong>Item Subtotal</Text></Col>
            <Col className='prices' span={12}>₱{subtotal}</Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Text strong>Shipping</Text></Col>
            <Col className='prices' span={12}>₱{cart.length == 0 ? 0 : shippingFee}</Col>
          </Row>
          <Divider/>
          <Row gutter={16}>
            <Col span={12}><Title level={3}>Total</Title></Col>
            <Col className='prices' span={12}><Title level={3}>₱{parseFloat(subtotal) + parseFloat(cart.length == 0 ? 0 : shippingFee)}</Title></Col>
          </Row>
        </Col>
      </Row>
    );
  }
}