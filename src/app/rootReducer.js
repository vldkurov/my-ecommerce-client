import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice'
import productReducer from '../features/product/productSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import cartReducer from '../features/cart/cartSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    // user: userReducer,
    // Add other slice reducers here as needed
});

export default rootReducer;
