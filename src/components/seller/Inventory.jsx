import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button, Typography, Input, Space, Highlighter } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const { Title } = Typography;

const Inventory = ({ products }) => {
  const [items, setItems] = useState(products);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(items.length);
  const [searchText, setSearchText] = useState('');
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  const handleDelete = (key) => {
    const data = [...data];
    setItems(currItems => currItems.filter((item) => item.key !== key))
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
    setItems(currItems => [...currItems, values]);
    closeAddDrawer();
  }

  const showAddDrawer = () => {
    setAddDrawerVisible(() => true);
  }

  const closeAddDrawer = () => {
    setAddDrawerVisible(() => false);
    addForm.resetFields()
  }

  const showEditDrawer = (key) => {
    editForm.setFieldsValue(items[key - 1])
    setEditDrawerVisible(() => true);
  }

  const closeEditDrawer = () => {
    setEditDrawerVisible(() => false);
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
    const newItems = [...items];
    newItems[values.key - 1] = values;
    setItems(() => newItems)
    closeEditDrawer();
  }

  const handleSearch = (e) => {
    setSearchText(() => e.target.value)
  }

  let categories = []
  let brands = []
  items.map((record) => {
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
      key: 'reviews',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => items.length >= 1 ? (<div class="actions"><a onClick={() => showEditDrawer(record.key)}>Edit</a><Popconfirm title="Are you sure you want to delete?" onConfirm={() => handleDelete(record.key)}><a>Delete</a></Popconfirm></div>) : null
    }
  ];

  return (
    <div id="inventory">
      <Table 
        title={() => 
          <div class="table-title">
            <Title level={3}>Inventory</Title>
            <div class="add-search">
              <Input value={searchText} placeholder="Search item by name" onChange={(e) => handleSearch(e)} />
              <Button onClick={() => showAddDrawer()}><PlusOutlined /> New Product</Button>
            </div>
          </div>
        } 
        columns={columns} 
        dataSource={searchText ? items.filter((data) => data['name'].toLowerCase().includes(searchText.toLowerCase())) : items} 
      />
      <AddProduct form={addForm} visible={addDrawerVisible} onClose={closeAddDrawer} onSubmit={onSubmitAddProduct} />
      <EditProduct form={editForm} visible={editDrawerVisible} onClose={closeEditDrawer} onSubmit={onSubmitEditProduct} />
    </div>
  );
}

export default Inventory;