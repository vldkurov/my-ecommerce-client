import axios from 'axios';


const baseURL = process.env.REACT_APP_BASE_URL

// Create an Axios instance with pre-configured settings
const api = axios.create({
    baseURL: baseURL,
});

api.defaults.withCredentials = true;

export default api;
