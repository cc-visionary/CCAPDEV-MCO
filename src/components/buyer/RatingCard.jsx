/*
  This component contains the RatingCard modal to view the ratings and comments of users about a certain product.
  Used in ProductPage.
*/

import React from 'react';
import { Modal, Typography, Progress, List, Comment, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Rater from 'react-rater';
import moment from 'moment';

const { Text } = Typography

const RatingCard = ({ users, reviews, visible, onClose }) => {
  const averageRate = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  
  const userIds = users.map(user => user.userId);

  return <Modal  title='Customer Reviews' visible={visible} onCancel={onClose} footer={false}>
    <div id='rating-card'>
      <div className='average-rating'>
        <div><Rater style={{'fontSize': '1.5em'}} rating={averageRate} interactive={false} /><Text>{averageRate} out of 5</Text></div>
        <div><Text type='secondary'>{reviews.length} customer ratings</Text></div>
      </div>
      {
        [5, 4, 3, 2, 1].map((rate, i) => {
          const percentage = ((reviews.map((review) => review.rating).filter((review) => review == rate).length / reviews.length) * 100).toFixed(0);
          return <div className='percentage-item' key={i}><Text>{rate} star</Text>&nbsp;<Progress className='percentage' percent={percentage} status="active" strokeColor='#FFE234' /></div>
        })
      }
      <List header={`${reviews.length} reactions`} itemLayout='horizontal' dataSource={reviews}>
        <div className='reactions'>
          {users.length > 0 ? reviews.map((item, i) => {
            const user = users[userIds.indexOf(item.userId)];

            return (
              <li key={i}>
                <Comment author={user ? user.username : 'Deleted User'} content={item.reaction} avatar={user && user.avatar ? user.avatar : <UserOutlined />} datetime={<Tooltip title={moment(item.dateReviewed, 'YYYY-MM-DDTHH:mm:ss.SSZ').format('MM-DD-YYYY HH:mm:ss')}><span>{moment(item.dateReviewed, 'YYYY-MM-DDTHH:mm:ss.SSZ').fromNow()}</span></Tooltip>} />
              </li>
            )}
          ) : null } 
        </div> 
      </List> 
    </div>
  </Modal>
}

export default RatingCard