import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    // user: userReducer,
    // Add other slice reducers here as needed
});

export default rootReducer;
