import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, clearErrors } from "../../../Actions/userAction";
import Table from 'react-bootstrap/Table';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faUserAlt,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './user.css';
import { ToastContainer, toast, Bounce } from "react-toastify";

function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);
  // alert(isLoggedIn)
  const { users = [], loading, error } = useSelector(state => state.userList);
  console.log('users',users)
  const filteredUsers = users
    .filter(user => user.role === 'user')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    if (error) {
      // alert(error);
      toast.error(error)
      dispatch(clearErrors());
    }
    dispatch(getUsers());
  }, [dispatch, error]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    await dispatch(deleteUser(userId));
    dispatch(getUsers());
  };

  return (
    <div className='flex min-h-screen sm:min-w-full '>
      <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen '>
        <div className='flex flex-col gap-6 p-6 sm:p-10 pb-6 overflow-hidden bg-white '>
          {/* {error && <p className="text-red-600 font-semibold">{error}</p>} */}
          <div className='border-b pb-[12px] border-gray-300 flex justify-between items-center'>
            <h2 className='text-xl font-semibold capitalize flex items-center'>
              Users 
            </h2>
            <Link to="/add-user">
              <button className='w-fit hover:opacity-[0.8] border border-[#ee403d]  text-white bg-[#ee403d] py-[8px] px-[15px]  rounded-[2px]'>
                Add User
              </button>
            </Link>
          </div>

          <div className='border border-gray-300 w-full overflow-x-auto h-full'>
            <Table className='w-full text-[15px] text-left text-gray-700 dark:text-gray-400'>
              <thead className='text-[16px] text-gray-700 bg-gray-50'>
                <tr>
                  <th scope="col" className="px-6 py-4">S. No.</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Role</th>
                  <th scope="col" className="px-6 py-4">Registered On</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500 font-medium">
                      Loading users...
                    </td>
                  </tr>
                ) : currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500 font-medium">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className='text-black bg-white border-b border-gray-200 hover:shadow-lg hover:bg-[#ff00000a] transition-colors duration-200'
                    >
                      <td className="px-6 py-2 capitalize font-semibold">{indexOfFirstUser + index + 1}</td>
                      <td className="px-6 py-2 capitalize">
                        <div className='flex gap-3 items-center'>

                          <div className="profile w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-red-100">
                            {user.image ? (
                              <img src={`${baseUrl}${user.image}`} alt="User profile" className='w-full h-full object-cover' />
                            ) : (
                              <FontAwesomeIcon icon={faUserAlt} className="text-primary-red text-[15px]" />
                            )}
                          </div>
                          <span className='font-semibold text-gray-800'>{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-2 text-gray-600">{user.email}</td>
                      <td className="px-6 py-2 capitalize">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                          ${user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-2 text-gray-500 font-mono">
                        {user.date ? new Date(user.date).toLocaleDateString() : ''}
                      </td>
                      <td className="px-6 py-2">
                        <div className='flex gap-3 justify-center'>
                          <Link to={`/add-user/${user._id}`}>
                            <button
                              className='bg-blue-100 hover:bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                              title="Edit User"
                            >
                              <FontAwesomeIcon icon={faPen} className='text-blue-600' />
                            </button>
                          </Link>
                          <button
                            className='bg-red-100 hover:bg-red-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete User"
                          >
                            <FontAwesomeIcon icon={faTrash} className='text-red-600' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <ToastContainer position="top-center" theme="colored" autoClose={3000} />
            </Table>
          </div>

          {/* Pagination (optional) */}
         {totalPages > 1 && (
                     <div className="flex justify-center mt-6 gap-3">
                       <button
                         className={`px-5 py-2   text-gray-900 transition disabled:opacity-50 `}
                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                         disabled={currentPage === 1}
                       >
                      <FontAwesomeIcon icon={faAngleLeft} className='text-black mr-[5px]' />   Prev
                       </button>
         
                       {[...Array(totalPages)].map((_, idx) => (
                         <button
                           key={idx}
                           className={`px-4 py-2   transition ${currentPage === idx + 1
                             ? ' text-black'
                             : '  text-gray-900'
                             }`}
                           onClick={() => setCurrentPage(idx + 1)}
                         >
                           {idx + 1}
                         </button>
                       ))}
         
                       <button
                         className={`px-5 py-2   text-gray-900   transition disabled:opacity-50 `}
                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                         disabled={currentPage === totalPages}
                       >
                         Next <FontAwesomeIcon icon={faAngleRight} className='text-black ml-[5px]' />
                       </button>
                     </div>
                   )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
