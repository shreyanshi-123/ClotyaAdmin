import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebar from '../../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function UserLogin() {
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchcategories = async () => {
        try {
             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-category`, {
            // const response = await fetch('http://localhost:5000/api/get-category', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Invalid credentials or user not found");
            }
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchcategories();
    }, []);

    return (
        <div className='flex min-h-screen sm:min-w-full'>

            <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>
                <div className='flex flex-col gap-6 p-4 sm:p-10 pb-6 overflow-hidden '>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='border-b pb-5 border-gray-300 flex justify-between'>
                        <h2 className='text-xl font-semibold capitalize flex items-center'>Categories</h2>
                        <button className='hover:text-[#209569] hover:bg-[#ddd] px-[16px] py-[8px] text-white bg-[#209569] font-semibold rounded-[3px]'>Add Category</button>
                    </div>
                   
                    <div className='bg-white rounded-sm border border-gray-300 w-full'>
                        <Table className='w-full text-[15px] text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg'>
                            <thead className='text-[18px] text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope="col" className="px-6 py-3">S. No.</th>
                                    <th scope="col" className="px-6 py-3">Category Image</th>
                                    <th scope="col" className="px-6 py-3">Category Name</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 && !error ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-10">
                                            Loading categories...
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category, index) => (
                                        <tr key={category.id || index} className='text-black bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                                            <td className="px-6 py-4 capitalize">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className='w-12 h-12 rounded-full'>
                                                    <img src={category.image} alt={category.category} className='w-full h-full rounded-full object-cover' />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 capitalize">{category.category}</td>
                                            <td className="px-6 py-4">
                                                <div className='flex gap-2'>
                                                    <div className='rounded-[50%] bg-[#ddd] p-2 flex justify-center cursor-pointer'>
                                                        <FontAwesomeIcon icon={faPen} className='text-[#2254b7]' />
                                                    </div>
                                                    <div className='rounded-[50%] bg-[#ddd] p-2 flex justify-center cursor-pointer'>
                                                        <FontAwesomeIcon icon={faTrash} className='text-[#b72822]' />
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
