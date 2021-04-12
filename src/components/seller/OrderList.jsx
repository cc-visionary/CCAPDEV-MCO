import React, { useState } from 'react';
import { Row, Col, Divider, Modal, Image, Button, Collapse, Table, Typography } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const OrderList = ({ orderList }) => {
  const [ visible, setVisible ] = useState(false)
  const [ currData, setCurrData ] = useState(orderList[0])

  const onOpen = (record) => {
    setVisible(true);
    setCurrData(record);
  }

  const onClose = () => {
    setVisible(false);
    setIndex(orderList[0]);
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
    },
    {
      title: 'Items',
      dataIndex: 'items',
      render: (_, record) => <Button onClick={() => onOpen(record)} type='link'><Text>{record.items.length != 0 ? record.items.length : 0} item{record.items.length > 1 ? 's' : ''}</Text></Button>
    },
    {
      title: 'Total',
      dataIndex: 'total',
      sorter: (a, b) => a.total - b.total,
      render: (_, record) => <Text>₱{parseFloat(record.total).toFixed(2)}</Text>
    },
    {
      title: 'Date Ordered',
      dataIndex: 'dateOrdered',
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.dateOrdered, 'MM-DD-YYYY') - moment(b.dateOrdered, 'MM-DD-YYYY'),
      render: (_, record) => <Text>{record.dateOrdered.format('MM-DD-YYYY')}</Text>
    },
  ];  

  return (
    <div>
      <Table title={() => <Title level={3}>Order List</Title>} columns={columns} dataSource={orderList} />
      <Modal width={720} visible={visible} footer={false} onCancel={onClose} destroyOnClose>
        <Row gutter={16}>
            <Col span={2}></Col>
            <Col span={10}>Name</Col>
            <Col span={4}>Price per Item</Col>
            <Col span={4}>Quantity</Col>
            <Col span={4}>Subtotal</Col>
          </Row>
          <Divider />
          {
            currData.items.map((data, i) => 
                <Row key={i} align='middle' gutter={16}>
                  <Col span={2}><Image width={25} height={25} src={data.product_image} preview={false} /></Col>
                  <Col span={10}>{data.name}<br /><Text type='secondary'>{data.brand}</Text></Col>
                  <Col span={4}>₱{parseFloat(data.price).toFixed(2)}</Col>
                  <Col span={4}>{data.quantity}</Col>
                  <Col span={4}>₱{parseFloat(data.price * data.quantity).toFixed(2)}</Col>
                  { currData.items.length - 1 == i ? <></> : <Divider /> }
                </Row>
            )
          }
        <Divider />
        <Row gutter={16}>
          <Col span={16}><Text type='secondary'>Date Ordered: {currData.date_ordered.format('MMM DD, YYYY')}</Text></Col>
          <Col span={4}><Text>Shipping Fee:</Text></Col>
          <Col span={4}><Text>₱{parseFloat(currData.shippingFee).toFixed(2)}</Text></Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}><Text type='secondary'>Time Ordered: {currData.date_ordered.format('HH:mm:ss ZZ')}</Text></Col>
          <Col span={4}><Text>Total:</Text></Col>
          <Col span={4}><Text>₱{parseFloat(currData.total).toFixed(2)}</Text></Col>
        </Row>
      </Modal>
    </div>
  )
}

export default OrderList;