import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

   useEffect(() => {
     const isLoggedIn = localStorage.getItem('isUserLoggedIn');
     if (!isLoggedIn) {
       navigate('/user/login');
     }
   }, [navigate]);
 
   const handleLogout = () => {
     localStorage.removeItem('isUserLoggedIn');
     sessionStorage.removeItem('isUserLoggedIn');
       window.location.href = '/';
   };
 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
         <a href='/dashboard'> <button className="w-full text-left hover:text-yellow-300">Dashboard</button></a>
         <a href='#'> <button className="w-full text-left hover:text-yellow-300">Users</button></a> 
         <a href='#'>  <button className="w-full text-left hover:text-yellow-300">Categories</button></a>
         <a href='#'>   <button className="w-full text-left hover:text-yellow-300">Products</button></a>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-600 mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">Welcome, Admin! Here's an overview of your system.</p>

          {/* Example Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium">Total Sales Amount</p>
              <p className="text-2xl font-bold mt-2">&#8377; 23,400</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium">Total Orders</p>
              <p className="text-2xl font-bold mt-2">42</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium">Total Products</p>
              <p className="text-2xl font-bold mt-2">10</p>
            </div>
            <div className="bg-red-100 p-4 rounded-md text-center">
              <p className="text-lg font-medium">Total Users</p>
              <p className="text-2xl font-bold mt-2">5</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
