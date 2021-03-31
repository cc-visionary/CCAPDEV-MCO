import React from 'react';
import { Table, Typography } from 'antd';
import moment from 'moment';

const { Title } = Typography;

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'order_id',
  },
  {
    title: 'Items',
    dataIndex: 'items',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Date Ordered',
    dataIndex: 'date_ordered',
    sorter: (a, b) => moment(a.date_ordered, 'MM-DD-YYYY') - moment(b.date_ordered, 'MM-DD-YYYY'),
  },
];

const OrderList = ({ orderList }) => {
  return (
    <Table title={() => <Title level={3}>Order List</Title>} columns={columns} dataSource={orderList} />
  )
}

export default OrderList;