import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (categoryId, {rejectWithValue}) => {
        try {
            const params = categoryId ? {category: categoryId} : {};
            const response = await api.get('/products/all', {params});

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



