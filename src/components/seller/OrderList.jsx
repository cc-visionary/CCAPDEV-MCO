/* 
  This component contains the view of the list of all orders.
  Used in the Dashboard page.
*/

import React, { useState } from 'react';
import { Row, Col, Divider, Modal, Image, Button, Collapse, Table, Typography } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const OrderList = ({ orders }) => {
  const [ visible, setVisible ] = useState(false)
  const [ currData, setCurrData ] = useState(orders[0])

  // opens the order modal to view more info on the specific order 
  const onOpen = (record) => {
    setVisible(true);
    setCurrData(record);
  }

  // closes the currently opened modal
  const onClose = () => {
    setVisible(false);
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
      sorter: (a, b) => parseFloat(a.total.$numberDecimal ? a.total.$numberDecimal : a.total) - parseFloat(b.total.$numberDecimal ? b.total.$numberDecimal : b.total),
      render: (_, record) => <Text>₱{parseFloat(record.total.$numberDecimal ? record.total.$numberDecimal : record.total).toFixed(2)}</Text>
    },
    {
      title: 'Date Ordered',
      dataIndex: 'dateOrdered',
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ') - moment(b.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ'),
      render: (_, record) => <Text>{moment(record.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ').format('MM-DD-YYYY HH:mm:ss')}</Text>
    },
  ];  

  return (
    <div>
      <Table title={() => <Title level={3}>Order List</Title>} columns={columns} dataSource={orders} />
      { currData ? 
        <Modal width={720} visible={visible} footer={false} onCancel={onClose} destroyOnClose>
          <Title level={4}>Order #{currData.orderId} - <Text type='secondary'>User ID: {currData.userId}</Text></Title>
          <Divider />
          <Row gutter={16}>
            <Col span={2}></Col>
            <Col span={10}>Name</Col>
            <Col span={4}>Price per Item</Col>
            <Col span={4}>Quantity</Col>
            <Col span={4}>Subtotal</Col>
          </Row>
          <Divider />
          {
            currData.items.map((data, i) => {
              return <Row key={i} align='middle' gutter={16}>
                <Col span={2}><Image width={25} height={25} src={data.product_image} preview={false} /></Col>
                <Col span={10}>{data.name}<br /><Text type='secondary'>{data.brand}</Text></Col>
                <Col span={4}>₱{parseFloat(data.price.$numberDecimal ? data.price.$numberDecimal : data.price).toFixed(2)}</Col>
                <Col span={4}>{data.quantity}</Col>
                <Col span={4}>₱{(parseFloat(data.price.$numberDecimal ? data.price.$numberDecimal : data.price) * data.quantity).toFixed(2)}</Col>
                { currData.items.length - 1 == i ? <></> : <Divider /> }
              </Row> 
            })
          }
          <Divider />
          <Row gutter={16}>
            <Col span={16}><Text type='secondary'>Date Ordered: {moment(currData.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ').format('MM-DD-YYYY')}</Text></Col>
            <Col span={4}><Text>Shipping Fee:</Text></Col>
            <Col span={4}><Text>₱{parseFloat(currData.shippingFee.$numberDecimal ? currData.shippingFee.$numberDecimal : currData.shippingFee).toFixed(2)}</Text></Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}><Text type='secondary'>Time Ordered: {moment(currData.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ').format('HH:mm:ss')}</Text></Col>
            <Col span={4}><Text>Total:</Text></Col>
            <Col span={4}><Text>₱{parseFloat(currData.total.$numberDecimal ? currData.total.$numberDecimal : currData.total).toFixed(2)}</Text></Col>
          </Row>
        </Modal>
        :
        null
      }
    </div>
  )
}

export default OrderList;