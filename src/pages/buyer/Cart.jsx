import React, { useState } from 'react'
import { Button, Checkbox, InputNumber, Typography, Divider, Popconfirm, Empty, Image, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { CartService } from '../../services';

const { Text, Title } = Typography;

const Cart = ({ products, shippingFee, cart, setCart, ...props }) => {
  const [ checkAll, setCheckAll] = useState(false)
  const [ checkboxes, setCheckboxes ] = useState(cart.map(() => false))
  const [ indeterminate, setIndeterminate ] = useState(false);
  
  const totalCost = cart.reduce((sum, data) => sum + products[products.map(d => d.productId).indexOf(data.productId)].price.$numberDecimal * data.quantity, 0);

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

  const deleteProductFromCart = ( index ) => {
    CartService.deleteItemsFromCart([cart[index]])
    setCart(cart.filter((_, i) => i != index));
    message.success('Successfully deleted item from the cart');
  }

  const deleteProductsFromCart = ( indexes ) => {
    indexes = indexes.filter(index => index != null);
    CartService.deleteItemsFromCart(indexes.map(index => ({productId: cart[index].productId, userId: cart[index].userId})))
    
    setCart(cart.filter((_, i) => !indexes.includes(i)))
    message.success('Successfully deleted items from the cart');
  }

  const changeCartQuantity = ( index, value ) => {
    let cartToUpdate = cart[index];
    cartToUpdate['quantity'] = value;
    CartService.updateCart(cartToUpdate).then(() => {
      setCart(cart.map((data, i) => { 
        if (i == index) data['quantity'] = value
        return data;
      }))
    })  
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
              const index = products.map(data => data.productId).indexOf(item.productId)
              return <div className="cart-item" productId={item.productId}>
                <div className='contents'>
                  <div className="checkbox"><Checkbox checked={checkboxes[i]} onChange={(e) => toggleACheckbox(i, e.target.checked)} /></div>
                  <div className="image">
                    <Image width={40} height={40} preview={false} src={products[index].product_image ? products[index].product_image : 'error'} fallback="data:image/png;base64,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" />
                  </div>
                  <div className="name-brand">
                    <Text>{products[index].name}</Text>
                    <br />
                    <Text type="secondary">{products[index].brand}</Text>
                  </div>
                  <div className="price">₱{parseFloat(products[index].price.$numberDecimal).toFixed(2)}</div>
                  <div className="quantity"><InputNumber style={{'width': '100%'}} min={1} max={products[index].stock} defaultValue={item.quantity} onChange={(val) => changeCartQuantity(i, val)} /></div>
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
            <div><Text type="secondary">Shipping Fee:</Text><Text>₱{cart.length == 0 ? parseFloat(0.00).toFixed(2) : shippingFee}</Text></div>
            <div><Text>Total:</Text><Text>₱{parseFloat(totalCost + (cart.length == 0 ? 0 : shippingFee)).toFixed(2)}</Text></div>
          </div>
          <Link to='/checkout' disabled={cart.length == 0}><Button type='secondary' disabled={cart.length == 0} block >PROCEED TO CHECKOUT</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default Cart;