import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button, Typography, Input, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Rater from 'react-rater';

import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const { Text, Title } = Typography;

const Inventory = ({ products, setProducts }) => {
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(products.length);
  const [searchText, setSearchText] = useState('');
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  const handleDelete = (key) => {
    setProducts(products.filter((product) => product.key !== key))
  }

  const onSubmitAddProduct = () => {
    addForm
      .validateFields()
      .then(values => {
        addForm.resetFields();
        handleAddProduct(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const handleAddProduct = (values) => {
    values['key'] = uniqueKey + 1;
    setUniqueKey(currKey => currKey + 1);
    setProducts([...products, {...values, key: products.length + 1, reviews: []}]);
    closeAddDrawer();
  }

  const showAddDrawer = () => {
    setAddDrawerVisible(true);
  }

  const closeAddDrawer = () => {
    setAddDrawerVisible(false);
    addForm.resetFields()
  }

  const showEditDrawer = (key) => {
    editForm.setFieldsValue(products[key - 1])
    setEditDrawerVisible(true);
  }

  const closeEditDrawer = () => {
    setEditDrawerVisible(false);
    editForm.resetFields()
  }

  const onSubmitEditProduct = () => {
    editForm
    .validateFields()
    .then(values => {
      editForm.resetFields();
      handleEditProduct(values);
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
  }

  const handleEditProduct = (values) => {
    const newProducts = [...products];
    newProducts[values.key - 1] = {...values, reviews: newProducts[values.key - 1].reviews, key: newProducts[values.key - 1].key};
    setProducts(newProducts)
    closeEditDrawer();
  }

  const handleSearch = (e) => {
    setSearchText(() => e.target.value)
  }

  let categories = []
  let brands = []
  console.log(products)
  products.map((record) => {
    if(!categories.includes(record.category)) categories.push(record.category)
    if(!brands.includes(record.brand)) brands.push(record.brand)
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
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
      render: (_, record) => <Text>₱{parseFloat(record.price).toFixed(2)}</Text>
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
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
      sorter: (a, b) => a.reviews.reduce((sum, val) => sum + val.rating, 0) / a.reviews.length - b.reviews.reduce((sum, val) => sum + val.rating, 0) / b.reviews.length,
      render: (_, record) => record.reviews.length == 0 ? <Text>No Reviews</Text> : <Rater rating={record.reviews.reduce((sum, val) => sum + val.rating, 0) / record.reviews.length} interactive={false} /> 
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => products.length >= 1 ? (<div className="actions"><a onClick={() => showEditDrawer(record.key)}>Edit</a> <Popconfirm title="Are you sure you want to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm></div>) : null
    }
  ];

  return (
    <div id="inventory">
      <Table 
        title={() => 
          <Row gutter={16} align='middle' className="table-title">
            <Col span={15}><Title level={3}>Inventory</Title></Col>
            <Col span={6}>
              <Input value={searchText} placeholder="Search product by name" onChange={(e) => handleSearch(e)} />
            </Col>
            <Col span={3}>
              <Button onClick={() => showAddDrawer()}><PlusOutlined /> New Product</Button>
            </Col>
          </Row>
        } 
        columns={columns} 
        dataSource={searchText ? products.filter((data) => data['name'].toLowerCase().includes(searchText.toLowerCase())) : products} 
      />
      <AddProduct form={addForm} visible={addDrawerVisible} onClose={closeAddDrawer} onSubmit={onSubmitAddProduct} />
      <EditProduct form={editForm} visible={editDrawerVisible} onClose={closeEditDrawer} onSubmit={onSubmitEditProduct} />
    </div>
  );
}

export default Inventory;