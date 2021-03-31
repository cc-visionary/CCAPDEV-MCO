import React, { Component, useCallback } from 'react';
import { Table, Popconfirm, Drawer, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const { Title } = Typography;

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.products,
      addDrawerVisible: false,
      editDrawerVisible: false,
      key: -1
    };
  }

  handleDelete(key) {
    const data = [...this.state.data];
    this.setState({
      data: data.filter((item) => item.key !== key),
    });
  }

  handleAddProduct(values) {
    console.log(values)
    this.closeAddDrawer();
  }

  onSubmitAddProduct(form) {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        this.handleAddProduct(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  handleEditProduct(values) {
    console.log(values)
    this.closeEditDrawer();
  }

  onSubmitEditProduct(form) {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        this.handleEditProduct(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  showAddDrawer() {
    this.setState({ addDrawerVisible: true })
  }

  closeAddDrawer(deleteForm) {
    this.setState({ addDrawerVisible: false })
  }

  showEditDrawer(key) {
    this.setState({ editDrawerVisible: true, key: key })
  }

  closeEditDrawer(deleteForm) {
    // deleteForm()
    this.setState({ editDrawerVisible: false, key: -1 })
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
        <AddProduct visible={this.state.addDrawerVisible} onClose={(deleteForm) => this.closeAddDrawer(deleteForm)} onSubmit={this.onSubmitAddProduct} />
        <EditProduct visible={this.state.editDrawerVisible} onClose={(deleteForm) => this.closeEditDrawer(deleteForm)} onSubmit={this.onSubmitEditProduct} initialValues={this.state.data[this.state.key - 1]} />
      </div>
    );
  }
}

export default Inventory;