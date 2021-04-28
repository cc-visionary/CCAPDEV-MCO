import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { DollarOutlined, UserOutlined, TagOutlined, ShoppingOutlined } from '@ant-design/icons';

import Inventory from '../../components/seller/Inventory';
import OrderList from '../../components/seller/OrderList';

const Dashboard = ({ users, cart, setCart, products, setProducts, orders }) => {
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
      <Inventory cart={cart} setCart={setCart} products={products} setProducts={setProducts} />
      <OrderList orders={orders} />
    </div>
  );
}

export default Dashboard;