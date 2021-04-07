import React, {useState, useCallback}  from 'react';
import { Button, Typography, Form, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

import BoxButton from './BoxButton';
import Login from './Login';
import Cart from './buyer/Cart';
import ProfileMenu from './ProfileMenu';

const { Title } = Typography;

const Navigation = ({ loggedIn, setLoggedIn, userType, setUserType }) => {
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
    setLoggedIn(true);
  };

  const checkout = () => {
    onCloseCart()
  }

  const onCloseCart = () => {
    setCartVisible(false);
  };

  const logout = () => {
    setLoggedIn(false)
    setUserType('buyer')
  }

  return (
    <div id="navigation">
      <div className="left">
        <div className="menu-button"><Button type="text" icon={<AiOutlineMenu />} /></div>
        <Link to='/'><Title className="shop-name">TechShop.</Title></Link>
      </div>
      <div className="right">
        { loggedIn && userType == 'buyer' ? <Button size="large" type="text" icon={<ShoppingCartOutlined />} onClick={() => setCartVisible(true)} /> : null }
        { !loggedIn ? 
          <BoxButton onClick={() => setLoginVisible(true)}>Login</BoxButton> : 
          <Dropdown overlay={<ProfileMenu logout={() => setLoginVisible(false)} logout={() => logout()} userType={userType} setUserType={setUserType} />} placement="bottomRight">
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