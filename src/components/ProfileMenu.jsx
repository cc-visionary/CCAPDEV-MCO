import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const ProfileMenu = ({ logout, userType, setUserType }) => {
  return (
    <Menu>
      <Menu.Item><Link to='/profile'>View Account</Link></Menu.Item>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
      {userType == 'seller' ? <Menu.Item onClick={() => setUserType('buyer')}>Switch to Buyer</Menu.Item> : <Menu.Item onClick={() => setUserType('seller')}>Switch to Seller</Menu.Item>}
    </Menu>
  )
}
export default ProfileMenu;