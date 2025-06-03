import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, clearErrors } from "../../../Actions/userAction";
import Table from 'react-bootstrap/Table';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './user.css';

function UserList() {
    // const [error, setError] = useState('');
    // const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 1000;

    const baseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : process.env.REACT_APP_API_URL;



    const dispatch = useDispatch();


    const { users = [], loading, error } = useSelector(state => state.userList);
// const { users = [], loading, error } = useSelector(state => state.del);
    // alert(users)
      const filteredUsers = users
            .filter(user => user.role === 'user')
            .sort((a, b) => new Date(b.date) - new Date(a.date));

              const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
        const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    useEffect(() => {
        // if (error) {
        //     // Handle or show error here (e.g., toast)
        //     dispatch(clearErrors());
        // }
        dispatch(getUsers());  // <-- Invoke action creator here
    }, [dispatch, error]);
    const handleDeleteUser = (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        dispatch(deleteUser(userId));
          dispatch(getUsers());  
    };



    return (
        <div className='flex min-h-screen sm:min-w-full bg-gray-100'>
            <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen p-6'>
                <div className='flex flex-col gap-6 p-6 sm:p-10 pb-6 overflow-hidden bg-white '>
                    {error && <p className="text-red-600 font-semibold">{error}</p>}
                    <div className='border-b pb-5 border-gray-300 flex justify-between items-center'>
                        <h2 className='text-2xl font-semibold capitalize flex items-center gap-2'>
                            Users <FontAwesomeIcon icon={faUserAlt} className="text-[#209569]" />
                        </h2>
                        <a href="/AddUser" className="inline-block">
                            <button className='hover:text-[#209569] hover:bg-[#e6f4f1] px-5 py-2 text-white bg-[#209569] font-semibold rounded-md transition duration-300 shadow-md hover:shadow-lg'>
                                Add User
                            </button>
                        </a>
                    </div>

                    <div className=' border-gray-300 w-full overflow-x-auto '>
                        <Table className='w-full text-[15px] text-left text-gray-700 dark:text-gray-400'>
                            <thead className='text-[18px] text-gray-700 bg-gray-50'>
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
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-gray-500 font-medium">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : (
                                    currentUsers.map((user, index) => (
                                        <tr
                                            key={user._id}
                                            className='text-black bg-white border-b border-gray-200 hover:bg-[#f0fdf9] transition-colors duration-200'
                                        >
                                            <td className="px-6 py-4 capitalize font-semibold">{indexOfFirstUser + index + 1}</td>
                                            <td className="px-6 py-4 capitalize">
                                                <div className='flex gap-3 items-center'>
                                                    <div className="profile w-12 h-12 rounded-full bg-[#20956933] flex items-center justify-center overflow-hidden border-0 border-[#209569]">

                                                        {/* {user.image && (
                                                            <LazyLoadImage
                                                                className="w-full object-cover object-center absolute top-0 h-full blog-banner-img" src={user.image} alt="banner"
                                                            />
                                                        )} */}
                                                        {user.image ? (
                                                            <img src={`${baseUrl}${user.image}`} alt="User profile" className='w-full h-full object-cover' />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faUserAlt} className="text-[#209569] text-[22px]" />
                                                        )}
                                                    </div>
                                                    <span className='font-semibold text-gray-800'>{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 capitalize">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                                                    ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 font-mono">
                                                {user.date ? new Date(user.date).toLocaleDateString() : ''}
                                            </td>
                                            <td className="px-6 py-4">
                                                <td className="px-6 py-4">
                                                    <div className='flex gap-3 justify-center'>
                                                        <a href={`/addUser/${user._id}`}>
                                                            <button
                                                                className='bg-blue-100 hover:bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                                                                title="Edit User"
                                                            >
                                                                <FontAwesomeIcon icon={faPen} className='text-blue-600' />
                                                            </button>
                                                        </a>
                                                        <button
                                                            className='bg-red-100 hover:bg-red-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                                                            onClick={() => handleDeleteUser(user._id)}
                                                            title="Delete User"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} className='text-red-600' />
                                                        </button>
                                                    </div>
                                                </td>

                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-3">
                            <button
                                className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 font-semibold transition duration-200
                                    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded-md font-semibold transition duration-200
                                        ${currentPage === index + 1 ? 'bg-[#209569] text-white' : 'bg-gray-100 hover:bg-gray-300'}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 font-semibold transition duration-200
                                    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default UserList;
