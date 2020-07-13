import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001/goods',
  headers: {
    'Content-type': 'application/json',
  },
});
