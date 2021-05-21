import React from 'react'
import { Row, Col, Divider } from 'antd';

const About = () => {
  return (
    <div id="about-page">
      <div class="about-us">
          <h1>Members:</h1>
          <ul>
            <li>Christopher Lim</li>
            <li>Jethro Tsai</li>
            <li>Paul Benhur Agregado</li>
          </ul>
      </div>  
      <Divider />
      <div class="libraries-used">
        <Row>
          <Col span={12}>
            <h1>Front-End Libraries Used:</h1>
            <ul>
              <li>ReactJS <span class="subtitle">(Framework for Front-End)</span></li>
              <li>Ant Design <span class="subtitle">(for built-in components)</span></li>
              <li>React Icons</li>
              <li>React Rater</li>
              <li>Axios</li>
              <li>SCSS</li>
            </ul>
          </Col>
          <Col span={12}>
            <h1>Back-End Libraries Used:</h1>
            <ul>
              <li>ExpressJS</li>
              <li>Express Session</li>
              <li>Express Validator</li>
              <li>BCrypt</li>
              <li>Connect-Mongo</li>
              <li>MongoDB</li>
              <li>Mongoose</li>
              <li>dotenv</li>
              <li>body-parser</li>
              <li>cors</li>
              <li>nodemon <span class="subtitle">(for development only)</span></li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default About;