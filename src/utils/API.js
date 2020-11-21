import axios from 'axios';

// Export an object containing methods we'll use for accessing the GitHub Jobs API
const API = {
  // Gets all users
  getUsers: function () {
    return axios.get('https://randomuser.me/api/?results=30&nat=us');
  },
};

export default API;