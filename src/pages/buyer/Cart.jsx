import React, { useState } from 'react'
import { Row, Col, Button, Checkbox, InputNumber, Typography, Divider, Descriptions, Popconfirm, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Text, Title } = Typography;

const Cart = ({ shippingFee, cart, changeCartQuantity, deleteProductFromCart, deleteProductsFromCart, ...props }) => {
  const [ checkAll, setCheckAll] = useState(false)
  const [ checkboxes, setCheckboxes ] = useState(cart.map(() => false))
  const [ indeterminate, setIndeterminate ] = useState(false);
  const totalCost = cart.reduce((sum, data) => sum + data.price * data.quantity, 0);

  const toggleCheckAll = (checked) => {
    if(indeterminate) checked = true
    setCheckAll(checked)
    setCheckboxes(cart.map(() => checked))
    setIndeterminate(false)
  }

  const toggleACheckbox = (index, checked) => {
    const newCheckboxes = checkboxes.map((val, i) => index == i ? checked : val )
    setCheckboxes(newCheckboxes)

    if(!newCheckboxes.includes(true)) setCheckAll(false)
    else if(!newCheckboxes.includes(false)) setCheckAll(true)

    if(newCheckboxes.includes(true) && newCheckboxes.includes(false)) setIndeterminate(true)
    else setIndeterminate(false)
  }

  return (
    <div id="cart" >
      <div className="cart-contents">
          <div className="header" >
            <div><Checkbox indeterminate={indeterminate} checked={checkAll} onChange={(e) => toggleCheckAll(e.target.checked)} disabled={cart.length == 0} /><Text type="secondary"> &emsp;SELECT ALL ({cart.length} ITEM(S))</Text></div>
            <div><Button type="link" disabled={!checkAll && !indeterminate}><Popconfirm title="Are you sure you want to all the checked products?" onConfirm={() => deleteProductsFromCart(checkboxes.map((check, i) => { if(check) return i}))}><Text type="secondary"><DeleteOutlined /> DELETE</Text></Popconfirm></Button></div>
          </div>
          <div className="cart-list" >
          {
            cart.length > 0 ?
            cart.map((item, i) => {
              return <div className="cart-item" key={item.key}>
                <div className='contents'>
                  <div className="checkbox"><Checkbox checked={checkboxes[i]} onChange={(e) => toggleACheckbox(i, e.target.checked)} /></div>
                  <div className="name-brand">
                    <Text>{item.name}</Text>
                    <br />
                    <Text type="secondary">{item.brand}</Text>
                  </div>
                  <div className="price">₱{parseFloat(item.price).toFixed(2)}</div>
                  <div className="quantity"><InputNumber defaultValue={item.quantity} onChange={(val) => changeCartQuantity(i, val)} /></div>
                  <div className="delete"><Popconfirm title="Are you sure you want to delete this product?" onConfirm={() => deleteProductFromCart(i)}><Button type="link"><Text type="secondary"><DeleteOutlined /></Text></Button></Popconfirm></div>
                </div>
                {i != cart.length - 1 ? <Divider style={{'margin': '10px -5px'}} /> : <></>}
              </div>
            })
            :
            <Empty description='Cart is Empty' style={{'margin': '50px 0'}} />
          }
        </div>
      </div>
      <div className="order-summary" >
        <div className="container">
          <div className="location">
            <Title level={4}>Location</Title>
            <Text>1144 Soler Street, Binondo, Manila, Metro Manila City, Philippines</Text>
          </div>
          <Divider />
          <div className="summary">
            <Title level={4}>Order Summary</Title>
            <div><Text type="secondary">Subtotal ({cart.length} items):</Text><Text>₱{parseFloat(totalCost).toFixed(2)}</Text></div>
            <div><Text type="secondary">Shipping Fee:</Text><Text>₱{shippingFee}</Text></div>
            <div><Text>Total:</Text><Text>₱{parseFloat(totalCost + shippingFee).toFixed(2)}</Text></div>
          </div>
          <Link to='/checkout' disabled={cart.length == 0}><Button type='secondary' disabled={cart.length == 0} block >PROCEED TO CHECKOUT</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default Cart;