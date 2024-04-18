import {createSlice} from "@reduxjs/toolkit";
import {cancelOrder, createOrderFromCart, fetchOrderById, fetchOrders} from "./ordersOperations";

const initialState = {
    orders: [],
    currentOrder: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed', 'pending', 'completed', 'cancelled'
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
            })
            .addCase(createOrderFromCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrder = action.payload;  // Set the current order to the newly created order
                localStorage.setItem('currentOrderId', action.payload.orderId);
            })
            .addCase(createOrderFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(cancelOrder.fulfilled, (state) => {
                state.status = 'succeeded';
                state.currentOrder = null;  // Optionally clear current order details
                // alert(action.payload.message);  // Optional: alert user of success
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default ordersSlice.reducer;
