import {createSlice} from "@reduxjs/toolkit";
import {addProductToCart, createCart, deleteProductFromCart, fetchCartContents} from "./cartOperations";
import {login, logout} from "../auth/authOperations";

const initialState = {
    cart: {},
    items: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCartState: (state) => {
            state.cart = {};
            state.items = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload;
                // Optionally initialize items array based on the response
                // state.items = action.payload.items || [];
            })
            .addCase(createCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCartContents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCartContents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.cart = action.payload.cart; // Update the cart object
                state.cart = action.payload
                // state.items = action.payload.items; // Update the items array
                state.items = action.payload || [];
            })
            .addCase(fetchCartContents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;

            })
            .addCase(deleteProductFromCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const itemId = action.payload;
                state.items = state.items.items.filter(item => item.cartItemId !== itemId);
            })
            .addCase(deleteProductFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                Object.assign(state, initialState);
            })
    },
});

export default cartSlice.reducer;
