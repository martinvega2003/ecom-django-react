import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/authcontext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;