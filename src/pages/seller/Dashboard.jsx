import React, { Component } from 'react';
import { Statistic, Row, Col } from 'antd';
import { DollarOutlined, UserOutlined, TagOutlined, ShoppingOutlined } from '@ant-design/icons';

import { Inventory, OrderList } from '../../components';
import { UserService, ProductService, OrderService } from '../../../server/services';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      products: [],
      orders: [],
    }
  }

  componentDidMount = () => {
    UserService.getAllUsers().then(res => {
      this.setState({ users : res.data });
    })

    ProductService.getAllProducts().then(res => {
      this.setState({ products : res.data });
    })

    OrderService.getAllOrders().then(res => {
      this.setState({ orders : res.data });
    })
  }

  render = () => {
    const { cart, setCart } = this.props;
    const { users, products, orders } = this.state;
    
    return (
      <div id="dashboard">
        <Row align='middle' className="statistics">
          <Col span={6}>
            <Statistic title="Customers" value={users.length} prefix={<UserOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Products" value={products.length} prefix={<TagOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Items Sold" value={orders.reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.quantity, 0), 0)} prefix={<ShoppingOutlined />} />
          </Col>
          <Col span={6}>
            <Statistic title="Total Sold" value={orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} prefix={<DollarOutlined />} />
          </Col>
        </Row>
        <Inventory cart={cart} setCart={setCart} products={products} />
        <OrderList orders={orders} />
      </div>
    );
  }
  
}

export default Dashboard;