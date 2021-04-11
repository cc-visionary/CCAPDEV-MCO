import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { AiOutlineLaptop, AiFillDatabase, AiOutlinePrinter, AiOutlineMenu } from 'react-icons/ai';
import { BiMouseAlt } from 'react-icons/bi';
import { FiMonitor } from 'react-icons/fi';
import { FaNetworkWired } from 'react-icons/fa';
import { MdScanner, MdLocalShipping } from 'react-icons/md';
import { SiApple, SiHp, SiDell, SiAsus, SiEpson, SiLenovo, SiSamsung, SiToshiba, SiLg } from 'react-icons/si';
import { GoPackage } from 'react-icons/go';
import { ImPriceTag } from 'react-icons/im';
import { Link } from 'react-router-dom';

import BoxButton from '../components/BoxButton'
import mainImage from '../assets/images/landing_page_main_image.png'; 

const categories = [
  {'icon': <AiOutlineLaptop />, 'category': 'Laptop'},
  {'icon': <FiMonitor />, 'category': 'Monitor'},
  {'icon': <AiFillDatabase />, 'category': 'Data Storage'},
  {'icon': <BiMouseAlt />, 'category': 'Peripheral'},
  {'icon': <FaNetworkWired />, 'category': 'Networking'},
  {'icon': <AiOutlinePrinter />, 'category': 'Printer'},
  {'icon': <MdScanner />, 'category': 'Scanner'},
]

const { Title } = Typography;

const LandingPage = () => {
  return (
    <div id="landing-page">
      <div className="main-landing">
        <Row align='middle'>
          <Col className="left" xl={12}>
            <div className="header">
              <Title>Welcome to TechShop.</Title>
              <p>Where you get your latest and exclusive computer and accessories.</p>
            </div>
            <div className="buttons">
              <BoxButton path={'/products'} link>Shop Now</BoxButton>
            </div>
          </Col>
          <Col className="right" xl={12}><img src={mainImage} alt="Main Image" /></Col>
        </Row>
      </div>
      <div className="category">
        <Title>Category</Title>
        <div className="category-list">
          {
            categories.map((x) => {
              return <Link to={`/category/${x['category']}`} className="item">
                <div className="item-icon">{x['icon']}</div>
                <div className="item-name">{x['category']}</div>
              </Link>
            })
          }
        </div>
      </div>
      <div className="trend">
        <div className="header">
          <h1>Stay in Trend with TechShop</h1>
        </div>
        <div className="content">
          <Row align='middle' gutter={30}>
            <Col span={8}>
              <Card>
                <span className="icon"><GoPackage /></span>
                <Title level={3}>Latest Technology</Title>
                <p>Our technology are new to help you stay updated to new trends</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <span className="icon"><ImPriceTag /></span>
                <Title level={3}>Best Prices</Title>
                <p>Enjoy the best prices for high quality computer and accessories.</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <span className="icon"><MdLocalShipping /></span>
                <Title level={3}>Fast Delivery</Title>
                <p>We provide fast deliver worldwide. You can order from anywhere, anytime and receive it within 1-2 weeks.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="brands">
        <SiApple />
        <SiHp />
        <SiDell />
        <SiAsus />
        <SiEpson />
        <SiLenovo />
        <SiSamsung />
        <SiToshiba />
        <SiLg />
      </div>
    </div>
  )
}

export default LandingPage;