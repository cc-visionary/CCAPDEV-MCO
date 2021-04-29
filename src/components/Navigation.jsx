import React, { useState, useCallback }  from 'react';
import { Button, Typography, Form, Dropdown, Popover, Badge, Image, message } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';

import { BoxButton, Login, CartPopover, ProfileMenu } from './';
import { UserService } from '../services';

import Logo from '../assets/images/logo_light.svg';

const { Text, Title } = Typography;

const Navigation = ({ products, cart, user, loggedIn, logUserIn, logUserOut }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
  }, []);
  
  const closePopup = useCallback(() => {
    form.resetFields();
    setLoginVisible(false);
  }, [form]);

  const onSubmit = (values) => {
    UserService.login(values).then(res => {
      const { success, user, errorMessage } = res.data;
      if(success) {
        logUserIn(user)
        setLoginVisible(false);
      } else {
        message.error(errorMessage);
      }
    })
  };

  const logout = () => {
    logUserOut()
    setRedirect(true);
  }

  return (
    <div id="navigation">
      <div className="left">
        <div className="menu-button"><Image src={Logo} width={75} preview={false} /></div>
        <Link to='/'><Title className="shop-name">TechTitan.</Title></Link>
      </div>
      <div className="right">
        { loggedIn && user.userType == 'buyer' ? <Popover content={(props) => <CartPopover products={products} cart={cart} {...props} />} title={() => <Text type='secondary'>Recently Added Product</Text>} placement='bottomLeft' ><Badge count={cart.length}><Button size="large" type="text" icon={<ShoppingCartOutlined />} /></Badge></Popover> : null }
        { !loggedIn ? 
          <BoxButton onClick={() => setLoginVisible(true)}>Login</BoxButton> : 
          <Dropdown overlay={<ProfileMenu logout={() => setLoginVisible(false)} logout={() => logout()} userType={user.userType} />} placement="bottomRight">
            <Button size="large" type="text" icon={user.avatar ? <Image height={25} width={25} src={user.avatar} preview={false} /> : <UserOutlined />} /> 
          </Dropdown>
        }
      </div>
      <Login 
        form={form}
        visible={loginVisible} 
        onCancel={() => closePopup()}
        onOk={() => onOk()}
      />
      {redirect ? <Redirect to='/' /> : <></> }
    </div>
  )
}

export default Navigation;