import React from "react";
import { Modal, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Login = ({ visible, onCancel, onOk, form }) => {
  return (
    <Modal
      visible={visible}
      title="Login"
      okText="Login"
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form id="loginForm" form={form} layout="vertical" initialValues={{ 'remember': false }} > 
        <Form.Item prefix={<UserOutlined />} label="Username" name="username" rules={[{'required': true, message: "Please input your username!"}]}>
          <Input />
        </Form.Item>
        <Form.Item prefix={<LockOutlined />} label="Password" name="password" rules={[{'required': true, message: "Please input your password!"}]} >
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember"  valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
          <Link to='/register' onClick={onCancel}>or register now!</Link>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;