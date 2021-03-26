import React from "react";
import { Modal, Form, Input, Checkbox } from "antd";

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
        <Form.Item label="Username" name="username" rules={[{'required': true, message: "Please input your username!"}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{'required': true, message: "Please input your password!"}]} >
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember"  valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;