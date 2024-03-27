import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchProductDetails = createAsyncThunk(
    'product/fetchProductDetails',
    async (productId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
