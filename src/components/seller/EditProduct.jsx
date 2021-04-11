import React, { useCallback } from 'react';
import { Drawer, Button, Form, Row, Col, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EditProduct = ({ form, visible, onClose, onSubmit }) => {
  return(
    <Drawer 
      title="Edit" 
      visible={visible} 
      onClose={onClose} 
      width={720}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onSubmit} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} hideRequiredMark>
        <Row align='middle' gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Please enter product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Please select a category">
                <Option value="Laptops">Laptops</Option>
                <Option value="Monitors">Monitors</Option>
                <Option value="Data Storage">Data Storage</Option>
                <Option value="Peripherals">Peripherals</Option>
                <Option value="Networking">Networking</Option>
                <Option value="Printer">Printer</Option>
                <Option value="Scanner">Scanner</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' gutter={16}>
          <Col span={12}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: 'Please select a brand' }]}
            >
              <Select showSearch placeholder="Please select a brand">
                <Option value="Dell">Dell</Option>
                <Option value="Acer">Acer</Option>
                <Option value="Samsung">Samsung</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Toshiba">Toshiba</Option>
                <Option value="Lenovo">Lenovo</Option>
                <Option value="Asus">Asus</Option>
                <Option value="HP">HP</Option>
                <Option value="Razer">Razer</Option>
                <Option value="Logitech">Logitech</Option>
                <Option value="LG">LG</Option>
                <Option value="Panasonic">Panasonic</Option>
                <Option value="Sony">Sony</Option>
                <Option value="Epson">Epson</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber formatter={value => `₱ ${value}`} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: 'Please enter the number of stocks' }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' gutter={16}>
          <Col span={6}>
            <Form.Item
              name="product-image"
              label="Product Image"
            >
              <Upload maxCount={1} listType="picture-card"><UploadOutlined /> Update</Upload>
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter product description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Please enter product description" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="key">
          <Input hidden />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default EditProduct;