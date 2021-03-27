import React, {useState, useCallback}  from 'react';
import { Button, Typography, Form, Dropdown } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

import BoxButton from './BoxButton';
import Login from './Login';
import Cart from './Cart';
import ProfileMenu from './ProfileMenu';

const { Title } = Typography;



const Navigation = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [form] = Form.useForm();

  const onOk = useCallback((values) => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onSubmit(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
    console.log(values);
  }, []);
  
  const closePopup = useCallback(() => {
    form.resetFields();
    setLoginVisible(false);
  }, [form]);

  const onSubmit = (values) => {
    console.log(values);
    setLoginVisible(false);
  };

  const checkout = () => {
    onCloseCart()
  }

  const onCloseCart = () => {
    setCartVisible(false);
  };

  const loggedIn = true;
  const user = 'buyer';

  return (
    <div id="navigation">
      <div class="left">
        <div class="menu-button"><Button type="text" icon={<AiOutlineMenu />} /></div>
        <Link to='/'><Title class="shop-name">TechShop.</Title></Link>
      </div>
      <div class="right">
        { user == 'buyer' ? <Button size="large" type="text" icon={<SearchOutlined />}  /> : null }
        { loggedIn && user == 'buyer' ? <Button size="large" type="text" icon={<ShoppingCartOutlined />} onClick={() => setCartVisible(true)} /> : null }
        { !loggedIn ? 
          <BoxButton onClick={() => setLoginVisible(true)}>Login</BoxButton> : 
          <Dropdown overlay={<ProfileMenu />} placement="bottomRight">
            <Button size="large" type="text" icon={<UserOutlined />} /> 
          </Dropdown>
        }
      </div>
      <Login 
        form={form}
        visible={loginVisible} 
        onCancel={() => closePopup()}
        onOk={() => onOk()}
      />
      <Cart visible={cartVisible} onClose={() => onCloseCart()} checkout={() => checkout()} />
    </div>
  )
}

export default Navigation;