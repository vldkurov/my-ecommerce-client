import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";
import {fetchCartContents} from "../cart/cartOperations";


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


export const login = createAsyncThunk('auth/login', async (loginData, {dispatch, rejectWithValue}) => {
    try {
        const response = await api.post('/users/login', loginData, {
            withCredentials: true // Ensures cookies are sent with the request
        });
        if (response.data.user && response.data.user.cartId) {
            dispatch(fetchCartContents(response.data.user.cartId));  // Автоматически загружаем содержимое корзины
        }
        return response.data; // This should include the user object or relevant user data
//             return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});


export const logout = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        const response = await api.post('/users/logout', {withCredentials: true});
        return response.data;
    } catch (error) {
        // Ensure that only a string is returned as an error
        return rejectWithValue(error.response?.data?.message || error.message || "An unexpected error occurred");
    }
});


export const check = createAsyncThunk(
    'user/checkStatus',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get('/users/check', {withCredentials: true});


            if (response.data.isAuthenticated && response.data.user.cartId) {

                await dispatch(fetchCartContents(response.data.user.cartId));
            }

        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// export const check = createAsyncThunk(
//     'user/checkStatus',
//     async (_, {dispatch, getState, rejectWithValue}) => {
//         // Assuming your state shape includes some indication of authentication
//         if (!getState().auth.isAuthenticated) {
//             // Skip the check if we know the user is not authenticated
//             return rejectWithValue('User not authenticated');
//         }
//
//         try {
//             const response = await api.get('/users/check', {withCredentials: true});
//
//             if (response.data.isAuthenticated && response.data.user.cartId) {
//                 await dispatch(fetchCartContents(response.data.user.cartId));
//             }
//
//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 // Handle 401 specifically, possibly resetting auth state
//                 return rejectWithValue('Session expired');
//             }
//             return rejectWithValue(error.response ? error.response.data : error.message);
//         }
//     }
// );





