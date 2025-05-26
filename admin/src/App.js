import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './Pages/Dashboard/dashboard';

import PageNotFound from './components/Layout/PageNotFound';
// import Dashboard from './components/Dashboard/dashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';
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
            <Route index element={<Home />} />
            
            <Route path='*' element={<PageNotFound />} />


            {/* User Routes */}
            <Route path="/login" element={<AdminLogin />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  isLoggedIn={isUserLoggedIn}
                  redirectPath="/login"
                >
                  <AdminDashboard />
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
