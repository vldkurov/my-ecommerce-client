import axios from 'axios';

const baseURL = 'http://localhost:3030/api'

// Create an Axios instance with pre-configured settings
const api = axios.create({
    baseURL: baseURL,
});

api.defaults.withCredentials = true;

export default api;
