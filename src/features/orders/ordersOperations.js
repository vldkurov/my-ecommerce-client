import {createAsyncThunk} from '@reduxjs/toolkit';

import api from "../../api/api";

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, {rejectWithValue}) => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (orderId, {rejectWithValue}) => {
    try {
        const response = await api.get(`/orders/${orderId}`);


        return response.data;
    } catch (error) {
        return rejectWithValue(error.toString());
    }
});

// export const createOrderFromCart = createAsyncThunk(
//     'orders/createFromCart',
//     async (_, {getState, rejectWithValue}) => {
//         try {
//             const state = getState();
//             const cartId = state.cart.cart?.cartId;
//             if (!cartId) {
//                 return rejectWithValue('No cart available to create an order');
//             }
//             const response = await api.post('/orders', {cartId});  // Ensure your API expects cartId if needed
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.toString());
//         }
//     }
// );

export const createOrderFromCart = createAsyncThunk(
    'orders/createFromCart',
    async (_, {getState, rejectWithValue}) => {
        try {
            const cartId = getState().cart.cart?.cartId;
            if (!cartId) {
                return rejectWithValue('No cart available to create an order');
            }
            const response = await api.post('/orders', {cartId});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderId, {getState, rejectWithValue}) => {
    try {
        const state = getState();
        const response = await api.patch(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});





