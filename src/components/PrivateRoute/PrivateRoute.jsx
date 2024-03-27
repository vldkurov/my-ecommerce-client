import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Route} from 'react-router-dom';

const PrivateRoute = ({element: Element, ...rest}) => {
    const {isAuthenticated, status} = useSelector((state) => state.auth);
    const isAuthCheckPending = status === 'loading';

    if (isAuthCheckPending) {
        // Optionally, show a loading indicator or return null while checking
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            element={isAuthenticated ? Element : <Navigate to="/login" replace/>}
        />
    );
};

export default PrivateRoute;
