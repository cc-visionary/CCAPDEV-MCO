import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const ProfileMenu = () => {
  return (
    <Menu>
      <Menu.Item><Link to='/profile'>View Account</Link></Menu.Item>
      <Menu.Item>Logout</Menu.Item>
    </Menu>
  )
}
export default ProfileMenu;