import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Categories from './Pages/Dashboard/Category/category';
import AddOrEditCategory from './Pages/Dashboard/Category/addCategor';
import Users from './Pages/Dashboard/User/Users';
import AddUser from './Pages/Dashboard/User/AddUser';
import PageNotFound from './components/Layout/PageNotFound';
import AdminDashboard from './Pages/Dashboard/dashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute';
import AdminLogin from './Pages/Admin/adminLogin'; // Fixed
import Layout from './components/Layout/Layout';
import AddProduct from './Pages/Dashboard/Product/AddProduct';
import Products from './Pages/Dashboard/Product/product';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route element={<ProtectedRoute redirectPath="/"><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-category" element={<AddOrEditCategory />} />
          <Route path="/edit-category/:id" element={<AddOrEditCategory />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-user/:id" element={<AddUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
