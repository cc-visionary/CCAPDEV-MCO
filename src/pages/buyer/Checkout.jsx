import React, { Component } from 'react';
import { Image, Button, Row, Col, Divider, Typography, Form, Input, Select, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

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

  componentDidMount = () => {
    // get the countries through a third party api
    axios.get('https://restcountries.eu/rest/v2/all?fields=name')
      .then(res => this.setState({ countries: res.data }))
  }

  onFinish = (values) => {
    const { shippingFee, cart, orderHistory, setOrderHistory, setCart } = this.props;

    const newOrder = {
      key: orderHistory.length + 1,
      contactInfo: values,
      total: cart.reduce((sum, data) => sum + parseFloat(data.price * data.quantity), 0).toFixed(2),
      items: cart,
      shippingFee: shippingFee,
      date_ordered: moment()
    }

    this.setState({ redirect: true })
    setOrderHistory([...orderHistory, newOrder])
    setCart([])
    message.success('Checkout was successful!');
  }

  render () {
    const { redirect } = this.state;
    const { cart, shippingFee } = this.props;

    const subtotal = cart.reduce((sum, data) => sum + parseFloat(data.price * data.quantity), 0).toFixed(2);

    return redirect ? 
    <Redirect to='/' />
    :
    (
      <Row id="checkout" gutter={25}>
        <Col span={16}>
          <Form id='checkout-info' name='checkout-info' layout='vertical' onFinish={this.onFinish}>
            <Title level={3}>Customer Info</Title>
            <Divider />
            <Form.Item  name='email' label='Email' rules={[{ type: 'email', message: 'Please enter a valid email'}, { required: true, message: 'Please enter your email'},]}>
              <Input placeholder='Enter your email' />
            </Form.Item>
            <Title level={3}>Shipping Address</Title>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name='fullname' label='Full Name' rules={[{ required: true, message: 'Please enter your fullname' }]}>
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
                <Form.Item name='postal-code' label='Postal Code' rules={[{ required: true, message: 'Please enter your postal code' }]}  >
                  <Input placeholder='Enter your postal code' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='telephone' label='Telephone' rules={[{ required: true, message: 'Please enter your phone number' }]}  >
                  <Input placeholder='Enter your telephone' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='province' label='Province (optional)' >
                  <Input placeholder='Enter your province' />
                </Form.Item>
              </Col>
            </Row>
            <div class='buttons'>
              <Button type='link'><Link to='/cart'><Text type='secondary'><LeftOutlined/> Return to Cart</Text></Link></Button>
              <Button htmlType="submit">Continue</Button>
            </div>
          </Form>
        </Col>
        <Col className='cart' span={8}>
        <Title level={3}>Your Cart</Title>
          <Divider />
          {cart.map(data => {
            return <Row gutter={16}>
              <Col span={3}><Image width={50} height={50} preview={false} src={data.product_image} /></Col>
              <Col span={14}><Text>{data.name}</Text><br /><Text type='secondary'>{data.brand}</Text></Col>
              <Col span={7}><Text className='prices'>₱{parseFloat(data.price * data.quantity).toFixed(2)}</Text></Col>
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