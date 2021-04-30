/* 
  This component shows the menu to lead the different types of user to different pages.
  Used in the Navigation component.
*/

import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const ProfileMenu = ({ logout, userType }) => {
  return (
    <Menu>
      {userType == 'buyer' ? <Menu.Item><Link to='/order-history'>Order History</Link></Menu.Item> : <></> }
      <Menu.Item><Link to='/profile'>View Account</Link></Menu.Item>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  )
}
export default ProfileMenu;