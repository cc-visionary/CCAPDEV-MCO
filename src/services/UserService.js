/* Contains the functions to requests to URL Paths in relation to the `users` collection */

import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:3000/users";

class UserService {
  getAllUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  createUser(user) {
    return axios.post(USER_API_BASE_URL, user);
  }

  updateUser(user) {
    return axios.put(USER_API_BASE_URL, user)
  }

  deleteUser(userId) {
    return axios.delete(USER_API_BASE_URL + `/${userId}`);
  }

  getLogin() {
    return axios.get(USER_API_BASE_URL + '/login');
  }

  login(user) {
    return axios.post(USER_API_BASE_URL + '/login', user);
  }

  logout() {
    return axios.post(USER_API_BASE_URL + '/logout');
  }
}

export default new UserService();