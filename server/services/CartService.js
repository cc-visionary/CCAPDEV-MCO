import axios from 'axios';

const CART_API_BASE_URL = "http://localhost:3000/api/cart";

class CartService {
  getUserCart(userId) {
    return axios.get(CART_API_BASE_URL, { userId });
  }

  deleteCartByItem(itemName) {

  }

  deleteCartByUser(userId) {

  }
}

export default new CartService();