import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Categories from './Pages/Dashboard/Category/category';
import AddOrEditCategory from './Pages/Dashboard/Category/addCategor'
import Users from './Pages/Dashboard/User/Users';
import AddUser from './Pages/Dashboard/User/AddUser'

import PageNotFound from './components/Layout/PageNotFound';

import AdminDashboard from './Pages/Dashboard/dashboard';
import ProtectedRoute from './Pages/Admin/ProtectedRoute'; // Import the ProtectedRoute component
import AdminLogin from './Pages/Admin/adminLogin';



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
            <Route index element={<ProtectedRoute
              isLoggedIn={!isUserLoggedIn}
              redirectPath="/dashboard"
            >
              <AdminLogin />
            </ProtectedRoute>} />

            <Route path='*' element={<PageNotFound />} />

            <Route path="/add-category" element={
              <ProtectedRoute
                isLoggedIn={isUserLoggedIn}
                redirectPath="/"
              >
                <AddOrEditCategory />
              </ProtectedRoute>
            } />
            <Route path="/edit-category/:id" element={
              <ProtectedRoute
                isLoggedIn={isUserLoggedIn}
                redirectPath="/"
              >
                <AddOrEditCategory />
              </ProtectedRoute>
            } />


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
            


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
