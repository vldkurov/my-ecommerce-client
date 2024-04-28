import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";
import {fetchCartContents} from "../cart/cartOperations";


export const register = createAsyncThunk('auth/register', async (userData, {rejectWithValue}) => {
    try {
        const response = await api.post('/users/register', userData);
        // The server should return user details and tokens in the response
        const {user, accessToken, refreshToken} = response.data;

        // Store the JWTs in storage
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }

        // Return data to be used by your reducer or further application logic
        return user
    } catch (error) {
        if (!error.response) {
            throw error; // Handle unexpected errors
        }
        return rejectWithValue(error.response.data); // Handle API errors
    }
});


export const login = createAsyncThunk('auth/login', async (loginData, {dispatch, rejectWithValue}) => {
    try {
        const response = await api.post('/users/login', loginData);
        const {user, accessToken, refreshToken} = response.data;

        if (user && user.cartId) {
            dispatch(fetchCartContents(user.cartId));
        }

        // Store the JWTs in storage
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }

        return user
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});


export const logout = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        // Assuming tokens are stored in localStorage or sessionStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        // Add more clearances if you use other storage mechanisms or cookies
        return {message: 'Logged out successfully'};
    } catch (error) {
        return rejectWithValue("Failed to logout");
    }
});


export const check = createAsyncThunk(
    'user/checkStatus',
    async (_, {dispatch, rejectWithValue}) => {
        // Check if the token exists first (assuming token is stored in local storage)
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return rejectWithValue('User not authenticated');
        }

        try {
            // Send the token in the Authorization header
            const response = await api.get('/users/check', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // If the server confirms the user is authenticated and returns user details
            if (response.data.isAuthenticated && response.data.user.cartId) {
                // Fetch additional data like cart contents if needed
                await dispatch(fetchCartContents(response.data.user.cartId));
            }

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Specific handling for when the session/token has expired
                localStorage.removeItem('accessToken'); // Consider logging out the user
                return rejectWithValue('Session expired');
            }
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);







