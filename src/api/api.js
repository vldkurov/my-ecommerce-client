import axios from 'axios';


const baseURL = process.env.REACT_APP_BASE_URL


const api = axios.create({
    baseURL: baseURL,
    withCredentials: true  // This should be set if you are using session cookies
});


api.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // mark this request as retried
        try {
            const refreshToken = localStorage.getItem('refreshToken'); // Get the stored refresh token
            const tokenResponse = await axios.post(`${baseURL}/users/refresh`, {refreshToken});
            const {accessToken, refreshToken: newRefreshToken} = tokenResponse.data;
            localStorage.setItem('accessToken', accessToken); // Store the new access token
            localStorage.setItem('refreshToken', newRefreshToken); // Store the new refresh token
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Update the default token
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // Update the current request's token
            return api(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
            console.error('Unable to refresh token:', refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login'; // Redirect user to the login page
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});


export default api;
