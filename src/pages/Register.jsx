import React from 'react';
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

const registeredSuccessfully = () => {
  message.success('Account was registered successfully!');
};

const Register = () => {
  const onFinish = (values) => {
    console.log(values)
    registeredSuccessfully();
    
    return <Redirect to='/' />
  }
  
  return (
    <Form {...layout} id="register" name="register" onFinish={(e) => onFinish(e)} >
        <Form.Item name='avatar' label="Avatar" rules={[{ required: true, message: 'Please add an avatar!' }]}>
          <Upload
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </Form.Item>
        <Form.Item name='fullname' label="Fullname" rules={[{ required: true, message: 'Please input your fullname!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name='birthday' label="Birthday" rules={[{ required: true, message: 'Please input your birthday!' }]}>
          <DatePicker format='MM-DD-YYYY' />
        </Form.Item>
        <Form.Item name='username' label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='password' type="password" label="Password" rules={[{ required: true, type: 'password', message: 'Please input your password!' }]}>
          <Input/>
        </Form.Item>
        <Form.Item name='confirm_password' type="password" label="Confirm Password" rules={[{ required: true, type: 'password', message: 'Please confirm your password!' }]}>
          <Input/>
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