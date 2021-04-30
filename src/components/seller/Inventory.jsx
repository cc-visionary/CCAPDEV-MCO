/* 
  This component contains the view of the list of all the products and functions for adding, editing, and deleting a product.
  Used in the Dashboard page.
*/

import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button, Typography, Input, Row, Col, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Rater from 'react-rater';

import { AddProduct, EditProduct } from '../';
import { ProductService, CartService } from '../../services';

const { Text, Title } = Typography;

const Inventory = ({ cart, setCart, products, setProducts, ...props }) => {
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [uniqueId, setUniqueId] = useState(Math.max(...products.map(product => product.productId)) + 1);
  const [searchText, setSearchText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  // handles the deletion of a product
  const handleDelete = (productId) => {
    const productIds = products.map(product => product.productId);
    const currProduct = products[productIds.indexOf(productId)];
    ProductService.deleteProduct(currProduct.slug).then(() => {
      setProducts(products.filter((product) => product.productId != productId))
      message.success("Successfully deleted " + currProduct.name + " from the database.");
    }).catch((err) => {
      console.log(err)
      message.error("Failed to delete " + currProduct.name + " from the database.");
    });

    CartService.deleteCartByItem(currProduct.productId).then(() => {
      setCart(cart.filter((product) => product.productId != productId))
      message.success("Successfully deleted all items in the cart related to " + currProduct.name + " from the database.");
    }).catch(() => {
      message.error("Failed to delete all items in the cart related to " + currProduct.name + " from the database.");
    });

  }

  const onSubmitAddProduct = () => {
    addForm
      .validateFields()
      .then(values => {
        let newProduct = {
          ...values, 
          productId: uniqueId, 
          slug: values.name.replaceAll(' ', '-').toLowerCase(),
          reviews: [], 
          sold: 0
        }

        newProduct['product_image'] = imageUrl;
        const index = products.map(product => product.slug).indexOf(values.name.toLowerCase().replaceAll(' ', '-'));
        if(index >= 0 && products[index].productId != newProduct.productId) {
          message.error('Item name already exists...');
          return;
        }
        closeAddDrawer();
        addForm.resetFields();
        handleAddProduct(newProduct)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  // handles the adding of a product
  const handleAddProduct = (newProduct) => {
    ProductService.addProduct(newProduct).then(() => {
      setUniqueId(currId => currId + 1);
      setProducts([...products, newProduct]);
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

  const showEditDrawer = (productId) => {
    const index = products.map(product => product.productId).indexOf(productId)
    editForm.setFieldsValue({...products[index], price: products[index].price.$numberDecimal ? products[index].price.$numberDecimal : products[index].price});
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
      const index = products.map(product => product.slug).indexOf(values.name.toLowerCase().replaceAll(' ', '-'));
      if(index >= 0 && products[index].productId != values.productId) {
        message.error('Item name already exists...');
        return;
      }
      closeEditDrawer();
      editForm.resetFields();
      handleEditProduct(values);
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
  }

  // hanadles the editing of a product
  const handleEditProduct = (values) => {
    const newProducts = [...products];
    const index = products.map(product => product.productId).indexOf(values.productId)
    newProducts[index] = {...values, product_image: imageUrl, reviews: newProducts[index].reviews, productId: newProducts[index].productId, sold: newProducts[index].sold, slug: newProducts[index].name.toLowerCase().replaceAll(' ', '-')};

    ProductService.updateProduct(newProducts[index]);
    setProducts(newProducts);
    message.success("Successfully updated item " + newProducts[index].name + " in the database.");

    if(newProducts[index].stock <= 0) {
      CartService.deleteCartByItem(newProducts[index].productId)
    }
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
      sorter: (a, b) => parseFloat(a.price.$numberDecimal ? a.price.$numberDecimal : a.price) - parseFloat(b.price.$numberDecimal ? b.price.$numberDecimal : b.price),
      ellipsis: true,
      render: (_, record) => <Text>₱{parseFloat(record.price.$numberDecimal ? record.price.$numberDecimal : record.price).toFixed(2)}</Text>
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
      sorter: (a, b) => {
        const aAve = a.reviews.length > 0 ? a.reviews.reduce((sum, val) => sum + val.rating, 0) / a.reviews.length : 0;
        const bAve = b.reviews.length > 0 ? b.reviews.reduce((sum, val) => sum + val.rating, 0) / b.reviews.length : 0;
        return aAve - bAve
      },
      render: (_, record) => record.reviews.length == 0 ? <Text>No Reviews</Text> : <Rater rating={record.reviews.reduce((sum, val) => sum + val.rating, 0) / record.reviews.length} interactive={false} /> 
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => products.length >= 1 ? (<div className="actions"><a onClick={() => showEditDrawer(record.productId)}>Edit</a> <Popconfirm title="Are you sure you want to delete?" onConfirm={() => handleDelete(record.productId)}><a>Delete</a></Popconfirm></div>) : null
    }
  ];

  return (
    <div id="inventory">
      <Table 
        title={() => 
          <Row gutter={16} align='middle' className="table-title">
            <Col span={15}><Title level={3}>Inventory</Title></Col>
            <Col span={6}>
              <Input value={searchText} placeholder="Search product by name" prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)} />
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