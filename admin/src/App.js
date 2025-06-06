import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './Pages/Dashboard/Category/category';
import AddOrEditCategory from './Pages/Dashboard/Category/addCategor';
import Users from './Pages/Dashboard/User/Users';
import AddUser from './Pages/Dashboard/User/AddUser';
import PageNotFound from './components/Layout/PageNotFound';
import AdminDashboard from './Pages/Dashboard/dashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute';
import AdminLogin from './Pages/Dashboard/Product/product';
import Products from './Pages/Admin/adminLogin';
import Layout from './components/Layout/Layout'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route element={<ProtectedRoute redirectPath="/"><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<ProtectedRoute redirectPath="/"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute redirectPath="/"><Categories /></ProtectedRoute>} />
          <Route path="/add-category" element={<ProtectedRoute redirectPath="/"><AddOrEditCategory /></ProtectedRoute>} />
          <Route path="/edit-category/:id" element={<ProtectedRoute redirectPath="/"><AddOrEditCategory /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute redirectPath="/"><Users /></ProtectedRoute>} />
          <Route path="/add-user" element={<ProtectedRoute redirectPath="/"><AddUser /></ProtectedRoute>} />
          <Route path="/add-user/:id" element={<ProtectedRoute redirectPath="/"><AddUser /></ProtectedRoute>} />
           <Route path="/products" element={<ProtectedRoute redirectPath="/"><Products /></ProtectedRoute>} />
            <Route path="/add-Product/:id" element={<ProtectedRoute redirectPath="/"><AddUser /></ProtectedRoute>} />
           <Route path="*" element={<PageNotFound />} />
        </Route>

       
      </Routes>
    </BrowserRouter>

  );
}

export default App;
