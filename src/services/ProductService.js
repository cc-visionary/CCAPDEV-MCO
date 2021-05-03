/* Contains the functions to requests to URL Paths in relation to the `products` collection */

import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:31954/products";

class ProductService {
  getAllProducts() {
    return axios.get(PRODUCT_API_BASE_URL);
  }

  getProduct(slug) {
    return axios.get(PRODUCT_API_BASE_URL + `/${slug}`);
  }

  addProduct(product) {
    return axios.post(PRODUCT_API_BASE_URL, product);
  }

  updateProduct(product) {
    return axios.put(PRODUCT_API_BASE_URL, product);
  }

  deleteProduct(slug) {
    return axios.delete(PRODUCT_API_BASE_URL + `/${slug}`);
  }
}

export default new ProductService();