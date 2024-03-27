import {createSlice} from "@reduxjs/toolkit";
import {fetchProductDetails} from "./productOperations";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: null,
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : 'Failed to fetch product';
            });
    },
});

export default productSlice.reducer;
