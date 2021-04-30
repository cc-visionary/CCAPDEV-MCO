/* 
  This file contains the view when the url path is not registered.
*/

import React from 'react';
import { Typography, Image } from 'antd';

import PageNotFoundImage from '../assets/images/page_not_found.svg';

const { Title } = Typography;

const PageNotFound = () => {
  return (
    <div style={{'textAlign': 'center'}}>
      <Image src={PageNotFoundImage} preview={false} />
      <Title>Sorry, Page Not Available</Title>
    </div>
  );
}

export default PageNotFound;