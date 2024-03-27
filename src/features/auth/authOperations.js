import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const register = createAsyncThunk('auth/register', async (userData, {rejectWithValue}) => {
    try {
        const response = await api.post('/users/register', userData, {
            withCredentials: true // Ensures cookies are sent with the request
        });
        // Assume the response body includes the user data you want to store
        return response.data; // This should include the user object
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk('auth/login', async (loginData, {rejectWithValue}) => {
    try {
        const response = await api.post('/users/login', loginData, {
            withCredentials: true // Ensures cookies are sent with the request
        });
        // Assume the response body includes the user data you want to store
        return response.data; // This should include the user object or relevant user data
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});


export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await api.post('/users/logout', {withCredentials: true});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const check = createAsyncThunk(
    'user/checkStatus',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/users/check', {withCredentials: true});
            return response.data; // Assuming the response data includes the user's authentication status
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



