import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebar from '../../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faPen, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './user.css'


function UserLogin() {
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    const filterUsersByRole = (role) => users.filter(user => user.role === role);

    const UserList = filterUsersByRole('user');



    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/deleteUser/${userId}`, {
            const response = await fetch(`http://localhost:5000/api/deleteUser/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // Remove the user from the state
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            setError(err.message);  // Handle error
        }
    };

    const fetchUsers = async () => {
        try {
            //  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
            const response = await fetch('http://localhost:5000/api/user', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Invalid credentials or user not found");
            }
            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();

    }, []);

    return (
        <div className='flex min-h-screen sm:min-w-full'>

            <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>

                <div className='flex flex-col gap-6 p-4 sm:p-10 pb-6 overflow-hidden'>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='border-b pb-5 border-gray-300 flex justify-between'>
                        <h2 className='text-xl font-semibold capitalize flex items-center'>Users</h2>
                       <a href="/AddUser"> <button className='hover:text-[#209569] hover:bg-[#ddd] px-[16px] py-[8px] text-white bg-[#209569] font-semibold rounded-[3px]'>Add User</button></a>
                    </div>
                    {/* {users.length === 0 && !error && <div className='flex text-center w-full justify-center'>Loading users...</div>} */}

                    <div className='bg-white rounded-sm border border-gray-300 w-full'>
                        <Table className='w-full text-[15px] text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg'>
                            <thead className='text-[18pxpx] text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope="col" className="px-6 py-3">S. No.</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Role</th>
                                    <th scope="col" className="px-6 py-3">Registered On</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 && !error ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : (
                                    UserList.reverse().map((user, index) => (
                                        <tr key={user.id} className='text-black bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                                            <td className="px-6 py-4 capitalize">{index + 1}</td>
                                            <td className="px-6 py-4 capitalize">
                                                <div className='flex gap-2 items-center'>
                                                    <div className="profile w-12 h-12 rounded-[50%] bg-[#ddd] flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faUserAlt} className='text-[#fff] text-[20px]' />
                                                    </div>
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4 capitalize"><div className={`${user.role}`}>{user.role}</div></td>
                                            <td className="px-6 py-4">{user.date ? user.date.split('T')[0] : ''}</td>
                                            <td className="px-6 py-4">
                                                <div className='flex gap-2'>
                                                    <div className='rounded-[50%] bg-[#ddd] p-2 flex justify-center cursor-pointer'>
                                                        <FontAwesomeIcon icon={faPen} className='text-[#2254b7]' />
                                                    </div>
                                                    <div className=''>
                                                        <button className='rounded-[50%] bg-[#ddd] p-2 flex justify-center cursor-pointer' onClick={() => deleteUser(user._id)}>  <FontAwesomeIcon icon={faTrash} className='text-[#b72822]' /></button>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
