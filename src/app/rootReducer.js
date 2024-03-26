import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    // user: userReducer,
    // Add other slice reducers here as needed
});

export default rootReducer;
