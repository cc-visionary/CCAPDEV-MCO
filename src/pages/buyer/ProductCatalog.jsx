import React, { Component } from 'react';
import { Card, Pagination, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

export default class ProductCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      currentPageElements: [],
      elementsPerPage: 12,  //change as per your need
      pagesCount: 1,
      allElements: [],
      totalElementsCount: 0
    }
  }

  componentDidMount() {
    // this.getAllElements();
    this.setState({
      allElements: this.props.products,
      totalElementsCount: this.props.products.length
    }, () => {
      this.setPaginationStates();
    });
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

  setPaginationStates() {
    const { totalElementsCount, elementsPerPage } = this.state;
    this.setState({
      pagesCount: Math.ceil(totalElementsCount / elementsPerPage)
    }, () => {
      this.setElementsForCurrentPage();
    });
  }

  setElementsForCurrentPage() {
    const { allElements, offset, elementsPerPage } = this.state;
    const currentPageElements = allElements.slice(offset, offset + elementsPerPage);
    this.setState({
      currentPageElements
    });
  }

  handlePageClick(pageNumber) {
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

    console.log(currentPageElements)

    return (
      <div id="product-catalog">
        <Row gutter={[16, 16]}>
          { 
            currentPageElements.map(data => {
              return (
                <Col span={6}>
                  <Link to={`/product/${data.key}`}>
                    <Card
                      key={data.key}
                      class="card-item"
                    >
                      <img src={data.product_image} />
                      <Title level={3}>{data.name}</Title>
                      <Text>{`PHP ${data.price}`}</Text>
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