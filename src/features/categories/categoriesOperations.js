import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get('/products/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


