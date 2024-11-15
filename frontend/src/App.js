import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CreateCar from './pages/CreateCar';
import EditCar from './pages/EditCar';  // Import EditCar component
import PrivateRoute from './components/PrivateRoute';
import SwaggerDocs from './pages/SwaggerDocs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute home={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars" element={<PrivateRoute><CarList /></PrivateRoute>} />
        <Route path="/cars/:id" element={<PrivateRoute><CarDetail /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateCar /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditCar /></PrivateRoute>} />
        <Route path="/api/docs" element={<SwaggerDocs />} />
      </Routes>
    </Router>
  );
}

export default App;
