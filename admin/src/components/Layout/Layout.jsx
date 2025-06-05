import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import { useSelector } from 'react-redux';

const Layout = () => {
  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);
const storedValue = localStorage.getItem('user');

  return (
    <div className="dashboard-layout">
      {storedValue && <Sidebar />}
     
        <Outlet />
      
    </div>
  );
};

export default Layout;
