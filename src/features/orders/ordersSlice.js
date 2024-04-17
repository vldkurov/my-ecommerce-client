import {createSlice} from "@reduxjs/toolkit";
import {fetchOrderById, fetchOrders} from "./ordersOperations";

const initialState = {
    orders: [],
    currentOrder: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default ordersSlice.reducer;
