/* 
  This file contains the view and functions for the Profile page.
  This page will be shown if the url path is '/profile' and loggedIn is true.
*/

import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal, message } from 'antd';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import { ImageUpload } from '../components';
import { UserService } from '../services';

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
      imageUrl: null,
      hasChanged: false,
      showConfirmation: false,
      redirect: false,
      confirmPassword: '',
      fileList: [{url: this.props.user.avatar}],
    }
  }

  // sets the `this.state.imageUrl` to the parameter `imageUrl` and `this.state.hasChanged` to true
  setImageUrl = (imageUrl) => {
    this.setState({ imageUrl, hasChanged: true });
  }

  // sets `this.state.hasChanged` to true
  onChange = () => {
    this.setState({ hasChanged : true })
  }
  
  // if all condition are met, the user will successfully be updated both locally and in the database.
  onFinish = (values) => {
    const { setUser } = this.props

    if(this.state.imageUrl === null) {
      message.error('Please add an avatar...');
      return;
    }

    values['avatar'] = this.state.imageUrl;
    UserService.updateUser(values).then((res) => {
      const { success, errorMessage } = res.data;
      if(success) {
        this.setState({ imageUrl: null, hasChanged : false, redirect : true }, () => { 
          setUser(values); 
          message.success('Changes were made successfully');
        })
      } else {
        message.error(errorMessage)
      }
    })
  }

  // shows the confirmation modal
  onDelete = () => {
    this.setState({ showConfirmation : true })
  }

  // if the password inputted is the same from the user password, the user is deleted and will be logged out.
  onConfirmDelete = () => {
    const { user, logUserOut } = this.props;

    UserService.verifyPassword({'username': user.username, 'password': this.state.confirmPassword}).then(res => {
      if(res.data.success) {
        UserService.deleteUser(user.userId).then(res => {
          const { success, errorMessage } = res.data;
          if(success) {
            this.setState({ showConfirmation : false, confirmPassword : '', redirect : true }, () => message.success('Account deleted successfully'));
            logUserOut()
          } message.error(errorMessage)
        }) 
      } else message.error('Delete failed. Password was doesn\'t match')
    })
  }

  // When the page has mounted, it sets `this.state.imageUrl` to the user's avatar
  componentDidMount = () => {
    this.setState({ imageUrl: this.props.user.avatar })
  }

  render() {
    const { user } = this.props;
    const {showConfirmation, confirmPassword, hasChanged, redirect, imageUrl } = this.state;

    // converts the user birthday to a moment js object
    user['birthday'] = moment(user['birthday']);

    return redirect ? <Redirect to='/' /> : (
      <Form {...layout} id="profile" name="profile" onFinish={(e) => this.onFinish(e)} initialValues={user} >
        <Form.Item name="userId">
          <Input hidden />
        </Form.Item>
        <Form.Item name='avatar' label="Avatar">
          <ImageUpload imageUrl={imageUrl} setImageUrl={this.setImageUrl} />
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
        <Form.Item name='userType' label="User Type" rules={[{ required: true, message: 'Please enter your user type!' }]}>
          <Select disabled>
            <Option value='buyer'>Buyer</Option>
            <Option value='seller'>Seller</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="danger" style={{'marginRight' : '10px'}} onClick={() => this.onDelete()} disabled={user.userType === 'seller'}>Delete</Button>
          <Button type="primary" htmlType="submit" disabled={!hasChanged}>Submit</Button>
        </Form.Item>
        <Modal visible={showConfirmation} onCancel={() => this.setState({ showConfirmation: false })} onOk={() => this.onConfirmDelete()} title="Please confirm deletion with your password">
          <Input.Password value={confirmPassword} onChange={(e) => this.setState({ confirmPassword : e.target.value })} />
        </Modal>
      </Form>
    )
  }
}