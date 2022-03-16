import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com/search',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`,
  },
});
