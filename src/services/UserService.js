import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:3000/api/users";

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

  login(user) {
    return axios.put(USER_API_BASE_URL + '/login', user);
  }
}

export default new UserService();