import React, { useState } from 'react'
import { Row, Col, Image, Collapse, Typography, Divider, Button, Modal, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const OrderHistory = ({ products, setProducts, orderHistory }) => {
  const [ reviewVisible, setReviewVisible ] = useState(false);
  const [ itemId, setItemId ] = useState(null);
  const [ reaction, setReaction ] = useState('');
  const [ rating, setRating ] = useState(0);

  const onOpenReview = (id) => {
    setReviewVisible(true);
    setItemId(id);
  }

  const onCloseReview = () => {
    setReviewVisible(false);
    setItemId(null);
    setReaction('');
    setRating(0);
  }

  const confirmReview = () => {
    if(reaction == '') {
      message.error('Reaction is required')
      return 1;
    }
    if(rating == 0) {
      message.error('Rating is required')
      return 1;
    }
    
    
    setProducts(products.map(product => {
      if(product.key == itemId) {
        product.reviews.push({reaction:reaction, rating:rating})
        return product
      }
      return product;
    }))
    
    onCloseReview()
    message.success('Review successfully published.')
  }

  return (
    <div id='order-history'>
      <Title level={3}>Order History</Title>
      <Collapse defaultActiveKey={[0]} accordion>
        {
          orderHistory.map((item, i) => 
            <Panel header={`Order from ${item.date_ordered.format('MM-DD-YYYY')}`} key={i}>
              <div>
                <Row gutter={16}>
                  <Col span={2}></Col>
                  <Col span={10}>Name</Col>
                  <Col span={3}>Price per Item</Col>
                  <Col span={3}>Quantity</Col>
                  <Col span={3}>Subtotal</Col>
                  <Col span={5} />
                </Row>
                <Divider />
              {
                item.items.map((data, i) => 
                    <Row align='middle' gutter={16}>
                      <Col span={2}><Image width={25} height={25} src={data.product_image} preview={false} /></Col>
                      <Col span={10}>{data.name}<br /><Text type='secondary'>{data.brand}</Text></Col>
                      <Col span={3}>₱{parseFloat(data.price).toFixed(2)}</Col>
                      <Col span={3}>{data.quantity}</Col>
                      <Col span={3}>₱{parseFloat(data.price * data.quantity).toFixed(2)}</Col>
                      <Col span={3}><Button type='link'><Link to={{pathname: `/product/${data.name.toLowerCase().replaceAll(' ', '-')}`, data: data}}>More Info</Link></Button><br /><Button type='link' onClick={() => onOpenReview(data.key)}>Give Feedback</Button></Col>
                      { item.items.length - 1 == i ? <></> : <Divider /> }
                    </Row>
                )
              }
            </div>
            <Divider />
            <Row gutter={16}>
              <Col span={15}><Text type='secondary'>Date Ordered: {item.date_ordered.format('MMM DD, YYYY')}</Text></Col>
              <Col span={3}><Text>Shipping Fee:</Text></Col>
              <Col span={3}><Text>₱{item.shippingFee}</Text></Col>
            </Row>
            <Row gutter={16}>
              <Col span={15}><Text type='secondary'>Time Ordered: {item.date_ordered.format('HH:mm:ss ZZ')}</Text></Col>
              <Col span={3}><Text>Total:</Text></Col>
              <Col span={3}><Text>₱{item.total}</Text></Col>
            </Row>
          </Panel>
          )
        }
      </Collapse>
      <Modal title='Write a Feedback' visible={ reviewVisible } onOk={confirmReview} onCancel={onCloseReview}>
        <Input.TextArea value={reaction} onChange={(e) => setReaction(e.target.value)} />
        <Rater rating={rating} onRate={({rating}) => setRating(rating)} />
      </Modal>
    </div>
  )
}

export default OrderHistory;