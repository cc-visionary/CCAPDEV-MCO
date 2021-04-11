import React from 'react';
import { Typography } from 'antd';
import { FaCcPaypal, FaCcVisa, FaCcMastercard, FaCcDiscover } from 'react-icons/fa'

const { Title } = Typography;

const Footer = () => {
  return (
    <div id="footer">
      <div className="title">
        <Title level={3}>TechShop.</Title>
        <p>© Copyright 2021. Powered by TechShop</p>
      </div>
      <div className="cards">
        <FaCcPaypal />
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcDiscover />
      </div>
    </div>
  )
}

export default Footer;