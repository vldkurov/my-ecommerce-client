import {createSlice} from '@reduxjs/toolkit';
import {check, login, logout, register} from './authOperations'


const initialState = {
    user: null,
    isAuthenticated: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    loading: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload; // Assuming the backend responds with error messages

            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.user = action.payload.user; // Assume payload contains user data
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;

            })
            .addCase(check.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.isAuthenticated = action.payload.isAuthenticated;
                state.user = action.payload.user || null; // Ensure user is null if not authenticated
                state.error = null;
            })
            .addCase(check.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(check.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.error.message; // Update the error state if needed

            })
            .addCase(logout.pending, state => {
                state.loading = true;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                // state.loading = false;
                // state.user = {};
                // state.token = "";
                // state.isLogin = false;
                Object.assign(state, initialState);
            })
            .addCase(logout.rejected, (state, {payload}) => {
                state.loading = false;
                state.status = 'failed';
                state.error = payload;
            })
    },
});

export default authSlice.reducer;
