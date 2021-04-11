import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Upload, Select, Modal, message } from 'antd';
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
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      hasChanged: false,
      showConfirmation: false,
      redirect: false,
      confirmPassword: ''
    }

    this.initialValues = {
      'avatar': '',
      'username': 'username',
      'fullname': 'full name',
      'password': 'password',
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
    this.setState({ hasChanged : false, redirect : true }, () => message.success('Changes were made successfully'))
  }

  onDelete() {
    this.setState({ showConfirmation : true })
  }

  onConfirmDelete() {
    const { setLoggedIn } = this.props;

    if(this.state.confirmPassword == this.initialValues.password) {
      this.setState({ showConfirmation : false, confirmPassword : '', redirect : true }, () => { message.success('Account deleted successfully'); setLoggedIn(false) });
    } else {
      message.error('Delete failed. Password was doesn\'t match')
    }
  }

  handleConfirmChangePassword(e) {
    this.setState({ confirmPassword : e.target.value });
  }

  render() {
    return this.state.redirect ? <Redirect to='/' /> : (
      <Form {...layout} id="profile" name="profile" onFinish={(e) => this.onFinish(e)} initialValues={this.initialValues} >
        <Form.Item name='avatar' label="Avatar" rules={[{ required: true, message: 'Please add an avatar!' }]}>
          <Upload accept='.png, .jpg, .jpeg' listType="picture-card" maxCount={1} onChange={() => this.onChange()} ><UploadOutlined /> Update</Upload>
        </Form.Item>
        <Form.Item name='fullname' label="Fullname" rules={[{ required: true, message: 'Please enter your fullname!' }]}>
          <Input onChange={() => this.onChange()}/>
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{ type: 'email', message: 'Please enter a valid email'}, { required: true, message: 'Please enter your email!' }]}>
          <Input onChange={() => this.onChange()}/>
        </Form.Item>
        <Form.Item name='birthday' label="Birthday" rules={[{ required: true, message: 'Please enter your birthday!' }]}>
          <DatePicker onChange={() => this.onChange()} format='MM-DD-YYYY' />
        </Form.Item>
        <Form.Item name='username' label="Username" rules={[{ required: true, message: 'Please enter your username!' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name='password' label="Password" rules={[{ required: true, message: 'Please enter your password!' }]} >
          <Input.Password onChange={() => this.onChange()} />
        </Form.Item>
        <Form.Item name='role' label="Role" rules={[{ required: true, message: 'Please enter your role!' }]}>
          <Select disabled>
            <Option value='buyer'>Buyer</Option>
            <Option value='seller'>Seller</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="danger" style={{'marginRight' : '10px'}} onClick={() => this.onDelete()}>Delete</Button>
          <Button type="primary" htmlType="submit" disabled={!this.state.hasChanged}>
            Submit
          </Button>
        </Form.Item>
        <Modal visible={this.state.showConfirmation} onCancel={() => this.setState({ showConfirmation: false })} onOk={() => this.onConfirmDelete()} title="Please confirm deletion with your password">
          <Input value={this.state.confirmPassword} onChange={(e) => this.handleConfirmChangePassword(e)} type="password" />
        </Modal>
      </Form>
    )
  }
}