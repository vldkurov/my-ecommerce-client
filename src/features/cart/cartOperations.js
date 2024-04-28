import {createAsyncThunk} from '@reduxjs/toolkit';
import api from "../../api/api";


export const createCart = createAsyncThunk(
    'cart/create',
    async (_, {rejectWithValue}) => {
        // Get the access token from storage
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            return rejectWithValue('No access token available');
        }

        try {
            // Include the token in the authorization header
            const response = await api.post('/carts', {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            // Handle different responses based on the error status code
            if (error.response) {
                // If the token is expired or invalid
                if (error.response.status === 401 || error.response.status === 403) {
                    // You can optionally dispatch a logout action here if needed
                    return rejectWithValue('Unauthorized access. Please login again.');
                }
                return rejectWithValue(error.response.data.message || 'Failed to create cart');
            }
            return rejectWithValue(error.message || 'Network error');
        }
    }
);


export const addProductToCart = createAsyncThunk(
    'cart/addProduct',
    async ({cartId, productId, quantity}, {rejectWithValue}) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await api.post(`/carts/${cartId}`, {productId, quantity}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const fetchCartContents = createAsyncThunk(
    'cart/fetchContents',
    async (cartId, {rejectWithValue}) => {
        try {
            // Retrieve the JWT token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No token found');
            }

            // Modify the API request to include the Authorization header with the token
            const response = await api.get(`/carts/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


export const deleteProductFromCart = createAsyncThunk(
    'cart/deleteProduct',
    async ({cartId, itemId}, {rejectWithValue}) => {
        try {
            // Retrieve the JWT token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No token found');
            }

            // Modify the API request to include the Authorization header with the token
            const response = await api.delete(`/carts/${cartId}/items/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response) {
                return rejectWithValue('Failed to delete the item');
            }
            return response.data.cartItemId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);







