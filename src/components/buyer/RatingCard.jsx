import React from 'react';
import { Modal, Typography, Progress, List, Comment, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Rater from 'react-rater';
import moment from 'moment';

const { Text } = Typography

const RatingCard = ({ reviews, visible, onClose }) => {
  const averageRate = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  return <Modal  title='Customer Reviews' visible={visible} onCancel={onClose} footer={false}>
    <div id='rating-card'>
      <div className='average-rating'>
        <div><Rater style={{'fontSize': '1.5em'}} rating={averageRate} interactive={false} /><Text>{averageRate} out of 5</Text></div>
        <div><Text type='secondary'>{reviews.length} customer ratings</Text></div>
      </div>
      {
        [5, 4, 3, 2, 1].map(rate => {
          const percentage = ((reviews.map((review) => review.rating).filter((review) => review == rate).length / reviews.length) * 100).toFixed(0);
          return <div className='percentage-item'><Text>{rate} star</Text>&nbsp;<Progress className='percentage' percent={percentage} status="active" strokeColor='#FFE234' /></div>
        })
      }
      <List header={`${reviews.length} reactions`} itemLayout='horizontal' dataSource={reviews}>
        <div className='reactions'>{reviews.map((item) => <li><Comment author={item.user.username} content={item.reaction} avatar={item.user.avatar ? item.user.avatar : <UserOutlined />} datetime={<Tooltip title={item.dateReviewed.format('YYYY-MM-DD HH:mm:ss')}><span>{item.dateReviewed.fromNow()}</span></Tooltip>} /></li>)} </div> 
      </List> 
    </div>
  </Modal>
}

export default RatingCard