import React, { Component } from 'react';
import { Drawer, Button } from 'antd';

const Cart = ({visible, onClose}) => {
  return (
    <Drawer width={720} visible={visible} onClose={onClose}>
    </Drawer>
  )
}

export default Cart;