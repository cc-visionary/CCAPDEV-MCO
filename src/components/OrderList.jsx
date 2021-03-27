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

const data = [
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

const OrderList = () => {
  return (
    <Table title={() => <Title level={3}>Order List</Title>} columns={columns} dataSource={data} />
  )
}

export default OrderList;