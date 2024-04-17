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


// AsyncThunk to retrieve a cart's content
export const fetchCartContents = createAsyncThunk(
    'cart/fetchContents',
    async (cartId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/carts/${cartId}`);
            // console.log('cart response.data', response.data);
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
            const response = await api.delete(`/carts/${cartId}/items/${itemId}`);

            if (!response) {
                throw new Error('Failed to delete the item');
            }
            return response.data.cartItemId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);




