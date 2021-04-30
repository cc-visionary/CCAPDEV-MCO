import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { Redirect } from 'react-router-dom';

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

const Register = ({ users, uniqueUserId, logUserIn }) => {
  const [ password, setPassword ] = useState('')
  const [ redirect, setRedirect ] = useState(false)
  const [ imageUrl, setImageUrl ] = useState(null);

  const onFinish = (values) => {
    if(imageUrl === null) {
      message.error('Please add an avatar...');
      return;
    }

    const userIndex = users.map(user => user.username).indexOf(values.username);
    if(userIndex >= 0) {
      message.error('Username already exists...');
      return;
    }

    values['userId'] = uniqueUserId;
    values['avatar'] = imageUrl;
    UserService.createUser(values).then((res) => {
      const { success, errorMessage } = res.data;
      if(success) {
        setRedirect(true)
        logUserIn(values)
        message.success('Account was registered successfully!');
      } else {
        message.error(errorMessage);
      }
    })
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== password) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  return redirect ? 
  <Redirect to='/' /> 
  : 
  (
    <Form {...layout} id="register" name="register" onFinish={(e) => onFinish(e)} >
        <Form.Item name='avatar' label="Avatar" >
          <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </Form.Item>
        <Form.Item name='fullname' label="Fullname" rules={[{ required: true, message: 'Please enter your fullname' }]}>
          <Input placeholder='Enter your fullname'/>
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{ type: 'email', message: 'Please enter a valid email'}, { required: true, message: 'Please enter your email'}]}>
          <Input placeholder='Enter your email'/>
        </Form.Item>
        <Form.Item name='birthday' label="Birthday" rules={[{ required: true, message: 'Please enter your birthday' }]}>
          <DatePicker format='MM-DD-YYYY' />
        </Form.Item>
        <Form.Item name='username' label="Username" rules={[{ required: true, message: 'Please enter your username' }, { min: 4, message: 'Username must be atleast 4 characters' }]}>
          <Input placeholder='Enter your username' />
        </Form.Item>
        <Form.Item name='password' label="Password" rules={[{ required: true, message: 'Please enter your password' }, { min: 8, message: 'Password must be atleast 8 characters' }]} hasFeedback>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item name='confirm_password' label="Confirm Password" rules={[{ required: true, message: 'Please enter your password confirmation' }, { validator: compareToFirstPassword }]} hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item name='userType' label=" User Type" initialValue='buyer' >
          <Select >
            <Option value='buyer'>Buyer</Option>
            <Option value='seller' disabled>Seller</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" >
            Register
          </Button>
        </Form.Item>
      </Form>
  );
}

export default Register;