import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './Pages/Dashboard/Category/category';
import AddOrEditCategory from './Pages/Dashboard/Category/addCategor';
import Users from './Pages/Dashboard/User/Users';
import AddUser from './Pages/Dashboard/User/AddUser';
import PageNotFound from './components/Layout/PageNotFound';
import AdminDashboard from './Pages/Dashboard/dashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute';
import AdminLogin from './Pages/Admin/adminLogin';
import Layout from './components/Layout/Layout'; // Assuming this wraps sidebar/nav
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route - login */}
        <Route path="/" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute redirectPath="/">
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute redirectPath="/">
              <Layout>
                <Categories />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-category"
          element={
            <ProtectedRoute redirectPath="/">
              <Layout>
                <AddOrEditCategory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-category/:id"
          element={
            <ProtectedRoute redirectPath="/">
              <Layout>
                <AddOrEditCategory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute redirectPath="/">
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/AddUser/:id?"
          element={
            <ProtectedRoute redirectPath="/">
              <Layout>
                <AddUser />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
