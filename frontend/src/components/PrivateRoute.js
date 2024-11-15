import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ home=false, children }) => {
  if(home){
    return <Navigate to="/cars" />;
  }
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
