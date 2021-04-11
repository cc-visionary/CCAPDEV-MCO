import React from 'react'
import { Row, Col, Image, Collapse, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom'

const { Title, Text } = Typography;
const { Panel } = Collapse;

const OrderHistory = ({ orderHistory }) => {
    return (
      <div>
        <Title level={3}>Order History</Title>
        <Collapse accordion>
          {
            orderHistory.map((item, i) => 
              <Panel header={`Order from ${item.date_ordered._i}`} key={i}>
                <div>
                  <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={13}>Name</Col>
                    <Col span={3}>Price per Item</Col>
                    <Col span={3}>Quantity</Col>
                    <Col span={3}>Subtotal</Col>
                  </Row>
                  <Divider />
                {
                  item.items.map(data => 
                    <Link to={{pathname: `/product/${data.name.toLowerCase().replaceAll(' ', '-')}`, data: data}}>
                      <Text>
                        <Row gutter={16}>
                          <Col span={2}><Image width={25} height={25} src={data.product_image} preview={false} /></Col>
                          <Col span={13}>{data.name}</Col>
                          <Col span={3}>₱{parseFloat(data.price).toFixed(2)}</Col>
                          <Col span={3}>{data.quantity}</Col>
                          <Col span={3}>₱{parseFloat(data.price * data.quantity).toFixed(2)}</Col>
                        </Row>
                      </Text>
                    </Link>
                  )
                }
              </div>
              <Divider />
              <Row gutter={16}>
                <Col span={18} />
                <Col span={3}><Text>Shipping Fee:</Text></Col>
                <Col span={3}><Text>₱{item.shippingFee}</Text></Col>
              </Row>
              <Row gutter={16}>
                <Col span={18}><Text type='secondary'>Date Ordered: {item.date_ordered._i}</Text></Col>
                <Col span={3}><Text>Total:</Text></Col>
                <Col span={3}><Text>₱{item.total}</Text></Col>
              </Row>
            </Panel>
            )
          }
        </Collapse>
      </div>
    )
}

export default OrderHistory;