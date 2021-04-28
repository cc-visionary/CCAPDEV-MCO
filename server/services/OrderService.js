import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:3000/api/orders";

class OrderService {
  getAllOrders() {
    return axios.get(ORDER_API_BASE_URL);
  }

  addOrder(order) {
    return axios.post(ORDER_API_BASE_URL, order);
  }
}

export default new OrderService();