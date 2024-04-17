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

