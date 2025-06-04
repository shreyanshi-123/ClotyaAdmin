import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import { useSelector } from 'react-redux';

const Layout = () => {
  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);

  return (
    <div className="dashboard-layout">
      {isLoggedIn && <Sidebar />}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
