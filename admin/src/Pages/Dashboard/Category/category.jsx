import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/get-category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      const sortedData = data.sort(
        (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      );
      setCategories(sortedData);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}/api/delete-category/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories((prevCategories) => prevCategories.filter(cat => cat._id !== categoryId));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirst, indexOfLast);

  return (
    <div className='flex min-h-screen sm:min-w-full bg-gray-50'>
      <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen p-6'>
        <div className='flex flex-col gap-6 bg-white rounded-lg shadow-lg p-6'>
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          {loading && <p className="text-gray-600 font-medium">Loading categories...</p>}

          <div className='border-b border-gray-300 pb-4 flex justify-between items-center'>
            <h2 className='text-2xl font-semibold text-gray-800 tracking-wide'>Categories</h2>
            <Link to='/add-category'>
              <button
                className='bg-green-600 text-white px-5 py-2 rounded-md font-semibold shadow hover:bg-green-700 transition duration-300'
              >
                Add Category
              </button>
            </Link>
          </div>

          <div className='overflow-x-auto'>
            <Table className='w-full text-sm text-gray-700'>
              <thead className='text-[18px] text-gray-700 bg-gray-50'>
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">S. No.</th>
                  <th scope="col" className="px-6 py-3 text-center">Category Image</th>
                  <th scope="col" className="px-6 py-3 text-center">Category Name</th>
                  <th scope="col" className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category, index) => (
                  <tr
                    key={category._id || index}
                    className='bg-white hover:bg-green-50 transition-colors border-b border-gray-200 cursor-pointer'
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap text-center">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className='w-14 h-14 rounded-full overflow-hidden shadow-sm border border-gray-300 inline-block'>
                        <img
                          src={category.image ? `${baseUrl}${category.image}` : '/default-category-image.png'}
                          alt={category.category || 'Category Image'}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 capitalize text-center">
                      {category.category}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className='flex gap-3 justify-center'>
                        <Link to={`/edit-category/${category._id}`}>
                          <button
                            className='bg-blue-100 hover:bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                            title="Edit Category"
                          >
                            <FontAwesomeIcon icon={faPen} className='text-blue-600' />
                          </button>
                        </Link>
                        <button
                          className='bg-red-100 hover:bg-red-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                          onClick={() => deleteCategory(category._id)}
                          title="Delete Category"
                        >
                          <FontAwesomeIcon icon={faTrash} className='text-red-600' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentCategories.length === 0 && !loading && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination Controls - Uncomment to enable */}
          {/* {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-3">
              <button
                className={`px-5 py-2 rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-md shadow-sm transition ${currentPage === idx + 1
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className={`px-5 py-2 rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
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

export default CategoryList;
