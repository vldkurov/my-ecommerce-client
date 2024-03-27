import {createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from "./productsOperations";


const initialState = {
    products: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add products to the state array
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
