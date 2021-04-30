
/* 
  This file contains the view for the Dashboard page.
  This page will be shown if the url path is '/' and user's userType is a 'seller'.
*/

import React, { Component } from 'react';
import { Statistic, Row, Col } from 'antd';
import { DollarOutlined, UserOutlined, TagOutlined, ShoppingOutlined } from '@ant-design/icons';

import { Inventory, OrderList } from '../../components';

const Dashboard = ({ users, products, setProducts, orders, cart, setCart }) => {
  return (
    <div id="dashboard">
      <Row align='middle' className="statistics">
        <Col span={6}>
          <Statistic title="Users" value={users.length} prefix={<UserOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Products" value={products.length} prefix={<TagOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Items Sold" value={orders.reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.quantity, 0), 0)} prefix={<ShoppingOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Total Sold" value={orders.reduce((sum, order) => sum + parseFloat(order.total.$numberDecimal ? order.total.$numberDecimal : order.total), 0).toFixed(2)} prefix={<DollarOutlined />} />
        </Col>
      </Row>
      <Inventory cart={cart} setCart={setCart} products={products} setProducts={setProducts} />
      <OrderList orders={orders} products={products} />
    </div>
  );
}

export default Dashboard;