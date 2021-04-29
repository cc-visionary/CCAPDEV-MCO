import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Form, Button, Typography, Input, Row, Col, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Rater from 'react-rater';

import { AddProduct, EditProduct } from '../';
import { ProductService, CartService } from '../../services';

const { Text, Title } = Typography;

const Inventory = ({ cart, setCart, ...props }) => {
  const [products, setProducts] = useState([]);
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(-1);
  const [searchText, setSearchText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    setProducts(props.products);
    if(props.products.length > 0) setUniqueKey(props.products[props.products.length - 1].key + 1)
  }, [props.products])

  const handleDelete = (key) => {
    const productKeys = products.map(product => product.key);
    const currProduct = products[productKeys.indexOf(key)];
    ProductService.deleteProduct(currProduct.slug).then(() => {
      setProducts(products.filter((product) => product.key != key))
      message.success("Successfully deleted " + currProduct.name + " from the database.");
    }).catch(() => {
      message.error("Failed to delete " + currProduct.name + " from the database.");
    });

    CartService.deleteCartByItem(currProduct.key).then(() => {
      setCart(cart.filter((product) => product.key != key))
      message.success("Successfully deleted all items in the cart related to " + currProduct.name + " from the database.");
    }).catch(() => {
      message.error("Failed to delete all items in the cart related to " + currProduct.name + " from the database.");
    });

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
    let newProduct = {
      ...values, 
      key: uniqueKey, 
      slug: values.name.replaceAll(' ', '-').toLowerCase(),
      reviews: [], 
      sold: 0
    }
    newProduct['product_image'] = imageUrl;
    
    ProductService.addProduct(newProduct).then(() => {
      setUniqueKey(currKey => currKey + 1);
      setProducts([...products, newProduct]);
      closeAddDrawer();
      message.success("Successfully added " + newProduct.name + " to the database.");
    });
  }

  const showAddDrawer = () => {
    setAddDrawerVisible(true);
  }

  const closeAddDrawer = () => {
    setAddDrawerVisible(false);
    setImageUrl(null)
    addForm.resetFields()
  }

  const showEditDrawer = (key) => {
    const index = products.map(product => product.key).indexOf(key)
    editForm.setFieldsValue(products[index]);
    setImageUrl(products[index].product_image)
    setEditDrawerVisible(true);
  }

  const closeEditDrawer = () => {
    setEditDrawerVisible(false);
    setImageUrl(null)
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
    const index = products.map(product => product.key).indexOf(values.key)
    newProducts[index] = {...values, product_image: imageUrl, reviews: newProducts[index].reviews, key: newProducts[index].key, sold: newProducts[index].sold};

    ProductService.updateProduct(newProducts[index]).then(() => {
      setProducts(newProducts);
      closeEditDrawer();
      message.success("Successfully updated item " + newProducts[index].name + " in the database.");
    })
  }

  const handleSearch = (e) => {
    setSearchText(() => e.target.value)
  }

  let categories = []
  let brands = []
  products.map((record) => {
    if(!categories.includes(record.category)) categories.push(record.category)
    if(!brands.includes(record.brand)) brands.push(record.brand)
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
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
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold',
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      sorter: (a, b) => a.reviews.length > 0 ? a.reviews.reduce((sum, val) => sum + val.rating, 0) / a.reviews.length - b.reviews.reduce((sum, val) => sum + val.rating, 0) / b.reviews.length : b > 0 ? 0 - b.reviews.reduce((sum, val) => sum + val.rating, 0) / b.reviews.length : a.reviews.reduce((sum, val) => sum + val.rating, 0) / a.reviews.length - 0,
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
              <Input value={searchText} placeholder="Search product by name" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e)} />
            </Col>
            <Col span={3}>
              <Button onClick={() => showAddDrawer()}><PlusOutlined /> New Product</Button>
            </Col>
          </Row>
        } 
        columns={columns} 
        dataSource={searchText ? products.filter((data) => data['name'].toLowerCase().includes(searchText.toLowerCase())) : products} 
      />
      <AddProduct form={addForm} visible={addDrawerVisible} onClose={closeAddDrawer} onSubmit={onSubmitAddProduct} imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <EditProduct form={editForm} visible={editDrawerVisible} onClose={closeEditDrawer} onSubmit={onSubmitEditProduct} imageUrl={imageUrl} setImageUrl={setImageUrl} />
    </div>
  );
}

export default Inventory;