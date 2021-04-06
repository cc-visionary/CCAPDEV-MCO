import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const ProductPage = (props) => {
  const { data } = props.location;
  return data ? 
      <div id="product-page">
        <Title>{data.name}</Title>
      </div> : 
      <Title className="not-exist">Product does not exist...</Title>
}

export default ProductPage;