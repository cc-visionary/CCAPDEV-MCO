import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { DollarOutlined, UserOutlined, TagOutlined, ShoppingOutlined } from '@ant-design/icons';

import Inventory from '../../components/Inventory';

const Dashboard = () => {
  return (
    <div id="dashboard">
      <Row gutter={[16, 16]}>
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
      <Inventory />
    </div>
  );
}

export default Dashboard;