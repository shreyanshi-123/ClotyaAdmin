import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isUserLoggedIn');
    if (!isLoggedIn) {
      navigate('/user/login');
    }
  }, [navigate]);




  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen">
        <div className='m-8'>
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
        </div>
      </main>

    </div>
  );
}

export default AdminDashboard;
