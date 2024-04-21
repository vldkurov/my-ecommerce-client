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


export const createOrderFromCart = createAsyncThunk(
    'orders/createFromCart',
    async (cartId, {rejectWithValue}) => {
        try {

            if (!cartId) {
                return rejectWithValue('No cart available to create an order');
            }
            const response = await api.post(`/carts/${cartId}/checkout`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (orderId, {rejectWithValue}) => {
    try {
        const response = await api.patch(`/orders/${orderId}/cancel`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const createPaymentSession = createAsyncThunk('orders/createPaymentSession', async (orderId, {rejectWithValue}) => {
    try {
        const response = await api.post('/orders/create-checkout-session', {orderId});

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});











