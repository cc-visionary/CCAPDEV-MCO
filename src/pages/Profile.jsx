import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Upload, Select, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;

const editedSuccessfully = () => {
  message.success('Changes were made successfully');
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      hasChanged: false,
    }

    this.initialValues = {
      'avatar': '',
      'username': 'username',
      'fullname': 'full name',
      'email': 'email@email.com',
      'birthday': moment('03-27-2021', 'MM-DD-YYYY'),
      'role': 'seller',
    }
  }

  onChange() {
    this.setState({ hasChanged : true })
  }
  
  onFinish(values) {
    console.log(values)
    this.setState({ hasChanged : false })
    
    return <Redirect to='/' />
  }

  render() {
    return (
      <Form {...layout} id="profile" name="profile" onFinish={(e) => this.onFinish(e)} initialValues={this.initialValues} >
        <Form.Item name='avatar' label="Avatar" rules={[{ required: true, message: 'Please add an avatar!' }]}>
          <Upload listType="picture-card" maxCount={1} onChange={() => this.onChange()} ><UploadOutlined /> Update</Upload>
        </Form.Item>
        <Form.Item name='username' label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name='fullname' label="Fullname" rules={[{ required: true, message: 'Please input your fullname!' }]}>
          <Input onChange={() => this.onChange()}/>
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
          <Input onChange={() => this.onChange()}/>
        </Form.Item>
        <Form.Item name='birthday' label="Birthday" rules={[{ required: true, message: 'Please input your birthday!' }]}>
          <DatePicker onChange={() => this.onChange()} format='MM-DD-YYYY' />
        </Form.Item>
        <Form.Item name='role' label="Role" rules={[{ required: true, message: 'Please input your role!' }]}>
          <Select disabled>
            <Option value='buyer'>Buyer</Option>
            <Option value='seller'>Seller</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" disabled={!this.state.hasChanged}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}