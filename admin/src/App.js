import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Categories from './Pages/Dashboard/category';
import AddUser from './Pages/Dashboard/AddUser'
import PageNotFound from './components/Layout/PageNotFound';
import Users from './Pages/Dashboard/Users';
import AdminDashboard from './Pages/Dashboard/dashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute'; // Import the ProtectedRoute component
import AdminLogin from './Pages/Admin/adminLogin';

import AddOrEditCategory from './Pages/Dashboard/addCategor'

function App() {
 const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem('isUserLoggedIn') === 'true'
  );

  // Listen for changes in localStorage across different tabs
  useEffect(() => {
    const handleStorageChange = () => {
     
      setIsUserLoggedIn(sessionStorage.getItem('isUserLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <>


      <BrowserRouter  >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<AdminLogin />} />
            
            <Route path='*' element={<PageNotFound />} />

 <Route path="/add-category" element={<AddOrEditCategory />} />
    <Route path="/edit-category/:id" element={<AddOrEditCategory />} />
            {/* User Routes */}
            {/* <Route path="/login" element={<AdminLogin />} /> */}
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  isLoggedIn={isUserLoggedIn}
                  redirectPath="/"
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute
                  isLoggedIn={isUserLoggedIn}
                  redirectPath="/"
                >
                  <Users />
                </ProtectedRoute>
              }
            />
             <Route
              path="/categories"
              element={
                <ProtectedRoute
                  isLoggedIn={isUserLoggedIn}
                  redirectPath="/"
                >
                  <Categories />
                </ProtectedRoute>
              }
            />
             <Route
              path="/AddUser/:id?"
              element={
                <ProtectedRoute
                  isLoggedIn={isUserLoggedIn}
                  redirectPath="/"
                >
                  <AddUser />
                </ProtectedRoute>
              }
            />
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
