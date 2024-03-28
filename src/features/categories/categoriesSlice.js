import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./categoriesOperations";

const initialState = {
    categories: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add products to the state array
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;
