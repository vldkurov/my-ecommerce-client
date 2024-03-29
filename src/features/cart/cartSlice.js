import {createSlice} from "@reduxjs/toolkit";
import {addProductToCart, createCart} from "./cartOperations";

const initialState = {
    cart: null,
    items: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // You can add more reducers here for other cart operations
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
                state.items = action.payload.items || [];
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
                // Assuming the response includes the updated cart items
                state.items = action.payload
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        // Implement other cases as needed, like retrieving or updating the cart's contents
    },
});

export default cartSlice.reducer;
