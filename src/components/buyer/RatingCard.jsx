import React from 'react';
import { Modal } from 'antd';

const RatingCard = ({ visible, onClose }) => {
  return <Modal title='Customer Reviews' visible={visible} onCancel={onClose} footer={false}>

  </Modal>
}

export default RatingCard