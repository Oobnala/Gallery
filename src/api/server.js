import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com/search',
  headers: {
    Authorization: 'Client-ID V2T1mGuBVMDJ9a8e4Mw1Z_edXOJljZ5SBNWwrNqRcJU',
  },
});
