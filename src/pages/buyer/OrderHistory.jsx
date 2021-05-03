/* 
  This file contains the view and functions for the OrderHistory page.
  This page will be shown if the url path is '/order-history', the user's userType is a 'buyer', and loggedIn is true.
*/

import React, { useState } from 'react'
import { Row, Col, Image, Collapse, Typography, Divider, Button, Modal, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import moment from 'moment';
import { ProductService } from '../../services';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const OrderHistory = ({ user, products, setProducts, orderHistory }) => {
  const [ reviewVisible, setReviewVisible ] = useState(false);
  const [ itemId, setItemId ] = useState(null);
  const [ reaction, setReaction ] = useState('');
  const [ rating, setRating ] = useState(0);

  const productIds = products.map(product => product.productId);

  // opens the review modal of a product
  const onOpenReview = (id) => {
    setReviewVisible(true);
    setItemId(id);
  }

  // closes the review modal of a product
  const onCloseReview = () => {
    setReviewVisible(false);
    setItemId(null);
    setReaction('');
    setRating(0);
  }

  // checks if the review field's conditions are met, if so the review is added to that product locally as well as in the database.
  const confirmReview = () => {
    if(reaction == '') {
      message.error('Reaction is required')
      return 1;
    }
    if(rating == 0) {
      message.error('Rating is required')
      return 1;
    }
    
    const productIds = products.map(product => product.productId);

    if(products[productIds.indexOf(itemId)].reviews.map((review) => review.userId).includes(user.userId)) {
      message.error('Review failed. User has already submitted a feedback for this product')
      onCloseReview()
      return 1;
    }
    
    const newProducts = products.map(product => {
      if(product.productId == itemId) {
        product.reviews.push({userId: user.userId, reaction:reaction, rating:rating, dateReviewed: moment()});

        delete product['_id'];

        ProductService.updateProduct(product)

        return product;
      }
      return product;
    })
    
    setProducts(newProducts);
    
    onCloseReview()
    message.success('Review has been successfully submitted.')
  }

  return (
    <div id='order-history'>
      <Title level={3}>&nbsp;Order History</Title>
      <Collapse defaultActiveKey={[0]} accordion>
        {
          orderHistory.map((item, i) => 
            <Panel header={`Order ${item.orderId} from ${moment(item.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ').format('MM-DD-YYYY HH:mm:ss')}`} key={i}>
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
                      <Col span={2}><Image width={50} height={50} src={data.product_image} preview={false} /></Col>
                      <Col span={10}>{data.name}<br /><Text type='secondary'>{data.brand}</Text></Col>
                      <Col span={3}>₱{parseFloat(data.price).toFixed(2)}</Col>
                      <Col span={3}>{data.quantity}</Col>
                      <Col span={3}>₱{parseFloat(data.price * data.quantity).toFixed(2)}</Col>
                      <Col span={3}><Button type='link' disabled={productIds.indexOf(data.productId) < 0}><Link to={{pathname: `/product/${data.slug}`}}>More Info</Link></Button><br /><Button type='link' onClick={() => onOpenReview(data.productId)} disabled={productIds.indexOf(data.productId) < 0}>Give Feedback</Button></Col>
                      { item.items.length - 1 == i ? <></> : <Divider /> }
                    </Row>
                )
              }
            <Divider />
            <Row gutter={16}>
              <Col span={15}></Col>
              <Col span={3}><Text>Shipping Fee:</Text></Col>
              <Col span={3}><Text>₱{parseFloat(item.shippingFee.$numberDecimal ? item.shippingFee.$numberDecimal : item.shippingFee).toFixed(2)}</Text></Col>
            </Row>
            <Row gutter={16}>
              <Col span={15}><Text type='secondary'>Date Ordered: {moment(item.dateOrdered, 'YYYY-MM-DDTHH:mm:ss.SSZ').format('MM-DD-YYYY HH:mm:ss')}</Text></Col>
              <Col span={3}><Text>Total:</Text></Col>
              <Col span={3}><Text>₱{parseFloat(item.total.$numberDecimal ? item.total.$numberDecimal : item.total).toFixed(2)}</Text></Col>
            </Row>
          </Panel>
          )
        }
      </Collapse>
      <Modal title='Write a Feedback' visible={ reviewVisible } onOk={confirmReview} onCancel={onCloseReview}>
        <Input.TextArea placeholder='Enter your reaction' value={reaction} onChange={(e) => setReaction(e.target.value)} />
        <Rater style={{'fontSize': '3em', 'display':'block', 'textAlign': 'center'}} rating={rating} onRate={({rating}) => setRating(rating)} />
      </Modal>
    </div>
  )
}

export default OrderHistory;