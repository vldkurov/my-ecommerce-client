import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

const RequireAuth = ({children}) => {
    const {isAuthenticated} = useSelector((state) => state.auth);
    const location = useLocation();


    const isOrderRoute = location.pathname.startsWith('/orders/');

    if (!isAuthenticated && !isOrderRoute) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
};

export default RequireAuth;

