import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice'
import productReducer from '../features/product/productSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    // user: userReducer,
    // Add other slice reducers here as needed
});

export default rootReducer;
