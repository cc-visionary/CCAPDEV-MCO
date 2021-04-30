/* Contains the functions to requests to URL Paths in relation to the `carts` collection */

import axios from 'axios';

const CART_API_BASE_URL = "http://localhost:3000/cart";

class CartService {
  getUserCart(userId) {
    return axios.get(CART_API_BASE_URL + `/${userId}`);
  }

  addToCart(item) {
    return axios.post(CART_API_BASE_URL, item);
  }

  updateCart(cartItem) {
    const { productId, userId, quantity } = cartItem

    return axios.put(CART_API_BASE_URL, { productId: parseInt(productId), userId: parseInt(userId), quantity: parseInt(quantity) });
  }

  deleteCartByItem(productId) {
    return axios.delete(CART_API_BASE_URL + `/productId/${productId}`);
  }

  deleteCartByUser(userId) {
    return axios.delete(CART_API_BASE_URL + `/userId/${userId}`);
  }

  deleteItemsFromCart(items) {
    return axios.delete(CART_API_BASE_URL, {data: items});
  }
}

export default new CartService();