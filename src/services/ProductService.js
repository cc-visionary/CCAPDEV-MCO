import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:3000/api/products";

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

  deleteProduct(product) {
    return axios.delete(PRODUCT_API_BASE_URL + `/${product.slug}`);
  }

  deleteProducts(products) {
    return axios.delete(PRODUCT_API_BASE_URL, products);
  }
}

export default new ProductService();