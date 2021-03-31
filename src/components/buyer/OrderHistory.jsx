import React from 'react';
import { Drawer } from 'antd';

const OrderHistory = ({ visible, onClose }) => {
  return (
    <Drawer visible={visible} onClose={onClose} id="order-history"></Drawer>
  );
}

export default OrderHistory;