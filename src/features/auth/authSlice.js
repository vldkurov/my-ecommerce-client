import {createSlice} from '@reduxjs/toolkit';
import {check, register} from './authOperations'


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
    reducers: {
        // logout: (state) => {
        //     Object.assign(state, initialState);
        // },
    },
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
            // .addCase(loginUser.pending, (state) => {
            //     state.status = 'loading';
            //     state.loading = true;
            // })
            // .addCase(loginUser.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.user = action.payload.user; // Assume payload contains user data
            //     // state.isLoggedIn = true;
            //     state.isAuthenticated = true;
            //     state.loading = false;
            //     state.error = null;
            // })
            // .addCase(loginUser.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.payload;
            //     state.loading = false;
            // })
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
    },
});

// export const {logout} = authSlice.actions;

export default authSlice.reducer;
