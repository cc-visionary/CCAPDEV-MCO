import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const ProfileMenu = ({ logout, userType, setUserType, setRedirect }) => {
  const setToBuyer = () => {
    setUserType('buyer');
    setRedirect(true);
  }

  const setToSeller = () => {
    setUserType('seller');
    setRedirect(true);
  }

  return (
    <Menu>
      {userType == 'seller' ? <Menu.Item onClick={() => setToBuyer()}>Switch to Buyer</Menu.Item> : <Menu.Item onClick={() => setToSeller()}>Switch to Seller</Menu.Item>}
      {userType == 'buyer' ? <Menu.Item><Link to='/order-history'>Order History</Link></Menu.Item> : <></> }
      <Menu.Item><Link to='/profile'>View Account</Link></Menu.Item>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  )
}
export default ProfileMenu;