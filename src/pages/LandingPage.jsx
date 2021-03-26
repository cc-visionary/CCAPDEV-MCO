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
  {'icon': <AiOutlineLaptop />, 'category': 'Laptops'},
  {'icon': <FiMonitor />, 'category': 'Monitors'},
  {'icon': <AiFillDatabase />, 'category': 'Data Storage'},
  {'icon': <BiMouseAlt />, 'category': 'Peripherals'},
  {'icon': <FaNetworkWired />, 'category': 'Networking'},
  {'icon': <AiOutlinePrinter />, 'category': 'Printer'},
  {'icon': <MdScanner />, 'category': 'Scanner'},
]

const { Title } = Typography;

const LandingPage = () => {

  return (
    <div id="landing-page">
      <div class="main-landing">
        <div class="left">
          <div class="header">
            <Title>Welcome to TechShop.</Title>
            <p>Where you get your latest and exclusive computer and accessories.</p>
          </div>
          <div class="buttons">
            <BoxButton path={'/products'} link>Shop Now</BoxButton>
          </div>
        </div>
        <div class="right">
          <img src={mainImage} alt="Main Image" />
        </div>
      </div>
      <div class="category">
        <Title>Category</Title>
        <div class="category-list">
          {
            categories.map((x) => {
              return <Link to={`/category/${x['category']}`} class="item">
                <div class="item-icon">{x['icon']}</div>
                <div class="item-name">{x['category']}</div>
              </Link>
            })
          }
        </div>
      </div>
      <div class="trend">
        <div class="header">
          <h1>Stay in Trend with TechShop</h1>
        </div>
        <div class="content">
          <Row gutter={30}>
            <Col span={8}>
              <Card>
                <span class="icon"><GoPackage /></span>
                <Title>Latest Technology</Title>
                <p>Our technology are new to help you stay updated to new trends</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <span class="icon"><ImPriceTag /></span>
                <Title>Best Prices</Title>
                <p>Enjoy the best prices for high quality computer and accessories.</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <span class="icon"><MdLocalShipping /></span>
                <Title>Free Shipping</Title>
                <p>We provide free shipping worldwide. You can order from anywhere, anytime.</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div class="brands">
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