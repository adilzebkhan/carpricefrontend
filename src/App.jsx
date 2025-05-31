import React from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import BrandPage from './pages/BrandPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/brand/:brandName" element={<BrandPage />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
