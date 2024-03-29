// In cartSlice.js or a similar file
import {createAsyncThunk} from '@reduxjs/toolkit';
import api from "../../api/api";

// AsyncThunk to create a new cart
export const createCart = createAsyncThunk(
    'cart/create',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.post(`/carts`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// AsyncThunk to add a product to the cart
export const addProductToCart = createAsyncThunk(
    'cart/addProduct',
    async ({cartId, productId, quantity}, {rejectWithValue}) => {
        try {
            const response = await api.post(`/carts/${cartId}`, {productId, quantity});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
