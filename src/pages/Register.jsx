import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Upload, Select, message } from 'antd';
import { Redirect } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const { Option } = Select;

const Register = () => {
  const [ password, setPassword ] = useState('')
  const [ redirect, setRedirect ] = useState(false)

  const onFinish = (values) => {
    message.success('Account was registered successfully!');
    setRedirect(true)
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
        <Form.Item name='avatar' label="Avatar" rules={[{ required: true, message: 'Please add an avatar!' }]}>
          <Upload listType="picture-card" maxCount={1} ><UploadOutlined /> Update</Upload>
        </Form.Item>
        <Form.Item name='fullname' label="Fullname" rules={[{ required: true, message: 'Please input your fullname!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{ type: 'email', message: 'The input is not valid E-mail!'}, { required: true, message: 'Please input your E-mail!'},]}>
          <Input/>
        </Form.Item>
        <Form.Item name='birthday' label="Birthday" rules={[{ required: true, message: 'Please input your birthday!' }]}>
          <DatePicker format='MM-DD-YYYY' />
        </Form.Item>
        <Form.Item name='username' label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='password' label="Password" rules={[{ required: true, message: 'Please input your password!' }]} hasFeedback>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item name='confirm_password' label="Confirm Password" rules={[{ required: true, message: 'Please input your password confirmation!' }, { validator: compareToFirstPassword }]} hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item name='role' label="Role" initialValue='buyer' >
          <Select defaultValue='buyer' >
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