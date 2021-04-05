import React, { Component } from 'react';
import { Card, Pagination, Typography, Row, Col, Image, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const { Text, Title } = Typography;
const { Option } = Select;

class ProductCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      currentPageElements: [],
      elementsPerPage: 12,  //change as per your need
      pagesCount: 1,
      allElements: [],
      totalElementsCount: 0,
    }
  }

  componentDidMount() {
    const { category } = this.props.params;

    if(category) {
      const filteredProducts = this.props.products.filter(data => data.category == category);
      this.setState({
        allElements: filteredProducts,
        totalElementsCount: filteredProducts.length
      }, () => {
        this.setPaginationStates();
      });
    } else {
      this.setState({
        allElements: this.props.products,
        totalElementsCount: this.props.products.length
      }, () => {
        this.setPaginationStates();
      });
    }
    // this.getAllElements();
    
  }

  async getAllElements() {
    const allElements = await Axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(allElements);
    this.setState({
      allElements: allElements.data,
      totalElementsCount: allElements.data.length
    }, () => {
      this.setPaginationStates();
    });
  }

  setPaginationStates = () => {
    const { totalElementsCount, elementsPerPage } = this.state;
    this.setState({
      pagesCount: Math.ceil(totalElementsCount / elementsPerPage)
    }, () => {
      this.setElementsForCurrentPage();
    });
  } 

  setElementsForCurrentPage = () => {
    const { allElements, offset, elementsPerPage } = this.state;
    const currentPageElements = allElements.slice(offset, offset + elementsPerPage);
    this.setState({
      currentPageElements
    });
  }

  handlePageClick = (pageNumber) => {
    const { elementsPerPage } = this.state;
    const currentPage = pageNumber - 1;
    const offset = currentPage * elementsPerPage;
    this.setState({
      offset
    }, () => {
      this.setElementsForCurrentPage();
    });
  }

  render() {
    const { totalElementsCount, pagesCount, elementsPerPage, currentPageElements } = this.state;  
    const { category } = this.props.params;

    return (
      <div id="product-catalog">
        <Row class="header" gutter={[8, 8]}>
          <Col span={16}>
            <Title>{category ? category : 'Products'}</Title>
          </Col>
          <Col span={6}>
            <Input placeholder="Search product by name" />
          </Col>
          <Col span={2}>
            <Select style={{ display: 'block' }} defaultValue='featured'>
                <Option value='featured'>Featured</Option>
                <Option value='low_to_high'>Price: Low to High</Option>
                <Option value='high_to_low'>Price: High to Low</Option>
                <Option value='review'>Avg. Customer Review</Option>
              </Select>
          </Col>
        </Row>
        <Row class="catalog" gutter={[16, 16]}>
          { 
            currentPageElements.map(data => {
              return (
                <Col span={6}>
                  <Link to={`/product/${data.name.toLowerCase().replaceAll(' ', '-')}`}>
                    <Card
                      key={data.key}
                      class="card-item"
                    >
                      <Image 
                        width={200}
                        height={200}
                        preview={false}
                        alt={'Photo of ' + data.name}
                        src={data.product_image ? data.product_image : 'error'} 
                        fallback="data:image/png;base64,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"
                      />
                      <Title level={3}>{data.name}</Title>
                      <Text>{`PHP ${data.price}`}</Text>
                      <div>Rating</div>
                    </Card>
                  </Link>
                </Col>
              )
            })
          }
        </Row>
        {
          pagesCount > 1 && 
          <Pagination 
            defaultCurrent={1}
            onChange={this.handlePageClick}
            size="small"
            total={totalElementsCount}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={elementsPerPage}
            showSizeChanger={false}
          />
        }
      </div>
    );
  }
}

export default (props) => (
  <ProductCatalog {...props} params={useParams()} />
)