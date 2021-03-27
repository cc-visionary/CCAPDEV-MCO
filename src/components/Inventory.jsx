import React, { Component } from 'react';
import { Table, Popconfirm, Drawer, Button, Input, InputNumber, Form, Typography, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography;

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          key: '1',
          name: 'Deathadder',
          category: 'Peripherals',
          brand: 'Razer',
          price: 32,
          description: 'Good Mouse',
        },
        {
          key: '2',
          name: 'Mouse',
          category: 'Peripherals',
          brand: 'Dell',
          price: 42,
          description: 'Bad Mouse',
        },
        {
          key: '3',
          name: 'Epson Scan',
          category: 'Scanner',
          brand: 'Epson',
          price: 32,
          description: 'Cool Scan',
        },
        {
          key: '4',
          name: 'Epson Print',
          category: 'Printer',
          brand: 'Epson',
          price: 32,
          description: 'Cool Print',
        },
      ],
      addDrawerVisible: false,
      editDrawerVisible: false
    };
  }

  handleDelete(key) {
    const data = [...this.state.data];
    this.setState({
      data: data.filter((item) => item.key !== key),
    });
  }

  handleAddProduct() {
    this.closeAddDrawer();
  }

  handleEditProduct() {
    this.closeEditDrawer();
  }

  showAddDrawer() {
    this.setState({ addDrawerVisible: true })
  }

  closeAddDrawer() {
    this.setState({ addDrawerVisible: false })
  }

  showEditDrawer(key) {
    this.setState({ editDrawerVisible: true })
  }

  closeEditDrawer() {
    this.setState({ editDrawerVisible: false })
  }

  render() {
    let categories = []
    let brands = []
    this.state.data.map((record) => {
      if(!categories.includes(record.category)) categories.push(record.category)
      if(!brands.includes(record.brand)) brands.push(record.brand)
    })

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        filters: categories.map((val) => ({text: val, value : val})),
        onFilter: (value, record) => record.category.includes(value),
      },
      {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        filters: brands.map((val) => ({text: val, value : val})),
        onFilter: (value, record) => record.brand.includes(value),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        ellipsis: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Reviews',
        dataIndex: 'reviews',
        key: 'reviews',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => this.state.data.length >= 1 ? (<div class="actions"><a onClick={() => this.showEditDrawer(record.key)}>Edit</a><Popconfirm title="Are you sure you want to delete?" onConfirm={() => this.handleDelete(record.key)}><a>Delete</a></Popconfirm></div>) : null
      }
    ];

    return (
      <div id="inventory">
        <Table title={() => <div class="table-title"><Title level={3}>Inventory</Title><div><Button onClick={() => this.showAddDrawer()}><PlusOutlined /> New Product</Button></div></div>} columns={columns} dataSource={this.state.data} />
        <Drawer 
          title="Add a New Product" 
          visible={this.state.addDrawerVisible} 
          onClose={() => this.closeAddDrawer()} 
          width={720}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.closeAddDrawer()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={() => this.handleAddProduct()} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          
        </Drawer>
        <Drawer 
          title="Edit Product" 
          visible={this.state.editDrawerVisible} 
          onClose={() => this.closeEditDrawer()}
          width={720}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.closeEditDrawer()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={() => this.handleEditProduct()} type="primary">
                Submit
              </Button>
            </div>
          }
        >

        </Drawer>
      </div>
    );
  }
}

export default Inventory;