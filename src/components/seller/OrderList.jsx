import React from 'react';
import { Collapse, Table, Typography } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'order_id',
  },
  {
    title: 'Items',
    dataIndex: 'items',
    render: (_, record) => <Collapse><Panel header={`${record.items.length} item${record.items.length > 1 ? 's' : ''}`}>{record.items.map(item => <div>{item.name} - {item.quantity} pc{item.quantity > 1 ? 's' : ''}.</div>)}</Panel></Collapse>
  },
  {
    title: 'Total',
    dataIndex: 'total',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.total - b.total,
    render: (_, record) => <Text>₱{parseFloat(record.total).toFixed(2)}</Text>
  },
  {
    title: 'Date Ordered',
    dataIndex: 'date_ordered',
    sorter: (a, b) => moment(a.date_ordered, 'MM-DD-YYYY') - moment(b.date_ordered, 'MM-DD-YYYY'),
    render: (_, record) => <Text>{record.date_ordered.format('MM-DD-YYYY')}</Text>
  },
];

const OrderList = ({ orderList }) => {
  return (
    <Table title={() => <Title level={3}>Order List</Title>} columns={columns} dataSource={orderList} />
  )
}

export default OrderList;