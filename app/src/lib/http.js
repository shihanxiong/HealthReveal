import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: false,
});

export default instance;
