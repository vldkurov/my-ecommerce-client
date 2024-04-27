import {createAsyncThunk} from '@reduxjs/toolkit';

import api from "../../api/api";

// export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, {rejectWithValue}) => {
//     try {
//         const response = await api.get('/orders');
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.toString());
//     }
// });

export const fetchOrders = createAsyncThunk(
    'orders/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No access token available');
            }

            // Modify the API request to include the Authorization header with the token
            const response = await api.get('/orders', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            // Use error.response.data if it exists, otherwise error.message
            return rejectWithValue(error.response ? error.response.data : error.toString());
        }
    }
);

// export const fetchOrderById = createAsyncThunk('orders/fetchById', async (orderId, {rejectWithValue}) => {
//     try {
//         const response = await api.get(`/orders/${orderId}`);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.toString());
//     }
// });

export const fetchOrderById = createAsyncThunk(
    'orders/fetchById',
    async (orderId, {rejectWithValue}) => {
        try {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No access token available');
            }

            // Modify the API request to include the Authorization header with the token
            const response = await api.get(`/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            // Improved error handling: if error.response is available, use it to provide more specific feedback
            return rejectWithValue(error.response ? (error.response.data.message || error.response.data) : error.toString());
        }
    }
);


// export const createOrderFromCart = createAsyncThunk(
//     'orders/createFromCart',
//     async (cartId, {rejectWithValue}) => {
//         try {
//
//             if (!cartId) {
//                 return rejectWithValue('No cart available to create an order');
//             }
//             const response = await api.post(`/carts/${cartId}/checkout`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.toString());
//         }
//     }
// );

export const createOrderFromCart = createAsyncThunk(
    'orders/createFromCart',
    async (cartId, {rejectWithValue}) => {
        try {
            // Validate that a cart ID is provided
            if (!cartId) {
                return rejectWithValue('No cart available to create an order');
            }

            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No access token available');
            }

            // Modify the API request to include the Authorization header with the token
            const response = await api.post(`/carts/${cartId}/checkout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            // Use error.response.data if it exists, otherwise use error.toString()
            return rejectWithValue(error.response ? (error.response.data.message || error.response.data) : error.toString());
        }
    }
);

// export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderId, {rejectWithValue}) => {
//     try {
//         const response = await api.patch(`/orders/${orderId}/cancel`);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async (orderId, {rejectWithValue}) => {
        try {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No access token available');
            }

            // Modify the API request to include the Authorization header with the token
            const response = await api.patch(`/orders/${orderId}/cancel`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            // Use error.response.data for more detailed feedback, if it exists
            return rejectWithValue(error.response ? error.response.data : 'An error occurred while cancelling the order');
        }
    }
);

// export const createPaymentSession = createAsyncThunk('orders/createPaymentSession', async (orderId, {rejectWithValue}) => {
//     try {
//         const response = await api.post('/orders/create-checkout-session', {orderId});
//
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

export const createPaymentSession = createAsyncThunk(
    'orders/createPaymentSession',
    async (orderId, {rejectWithValue}) => {
        try {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');

            // Check if the token exists and prepend 'Bearer' (common practice for JWT)
            if (!accessToken) {
                return rejectWithValue('No access token available');
            }

            // Include the token in the Authorization header
            const response = await api.post('/orders/create-checkout-session', {orderId}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return response.data;
        } catch (error) {
            // Error handling: Use error.response.data if it exists
            return rejectWithValue(error.response ? error.response.data : 'An error occurred while creating the payment session');
        }
    }
);










