import axios from 'axios';


const baseURL = process.env.REACT_APP_BASE_URL


const api = axios.create({
    baseURL: baseURL,
    withCredentials: true  // This should be set if you are using session cookies
});


export default api;
