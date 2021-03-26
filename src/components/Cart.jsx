import React, { Component } from 'react';
import { Drawer, Button } from 'antd';

const Cart = ({visible, onClose}) => {
  return (
    <Drawer visible={visible} onClose={onClose}>
    </Drawer>
  )
}

export default Cart;