import React from 'react';
import { Navigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log("Token in PrivateRoute:", token); // Debug
    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;