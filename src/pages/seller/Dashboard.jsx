import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { DollarOutlined, UserOutlined, TagOutlined, ShoppingOutlined } from '@ant-design/icons';

import Inventory from '../../components/seller/Inventory';
import OrderList from '../../components/seller/OrderList';

const Dashboard = ({ cart, setCart, products, setProducts, orderList }) => {
  return (
    <div id="dashboard">
      <Row align='middle' gutter={[16, 16]}>
        <Col span={6}>
          <Statistic title="Customers" value={500} prefix={<UserOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Products" value={50} prefix={<TagOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Items Sold" value={1000} prefix={<ShoppingOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Total Earned" value={10000} prefix={<DollarOutlined />} />
        </Col>
      </Row>
      <Inventory cart={cart} setCart={setCart} products={products} setProducts={setProducts} />
      <OrderList orderList={orderList} />
    </div>
  );
}

export default Dashboard;