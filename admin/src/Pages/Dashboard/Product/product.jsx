import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
// import { getProducts, clearErrors, deleteProduct } from '../../../Actions/productActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import './products.css';

function ProductsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();

  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

  const { products = [], loading, error } = useSelector(state => state.productList);

  useEffect(() => {
    // dispatch(getProducts());
    setCurrentPage(1);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    //   dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
    //   await dispatch(deleteProduct(productId));
    //   dispatch(getProducts());
      setCurrentPage(1);
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete product');
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  return (
    <div className="flex min-h-screen sm:min-w-full">
      <div className="w-full lg:w-4/5 lg:ml-auto min-h-screen">
        <div className="flex flex-col gap-6 bg-white p-10">
          <div className="border-b border-gray-300 pb-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize flex items-center">Products</h2>
            <Link to="/add-product">
              <button className="w-fit hover:opacity-80 border border-[#007bff] text-white bg-[#007bff] py-2 px-4 rounded">
                Add Product
              </button>
            </Link>
          </div>

          <div className="border border-gray-300 overflow-x-auto">
            <Table className="w-full text-sm text-gray-700" responsive>
              <thead className="text-[16px] text-gray-700 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center">S. No.</th>
                  <th className="px-4 py-3 text-center">Name</th>
                  <th className="px-4 py-3 text-center">Long Description</th>
                  <th className="px-4 py-3 text-center">Short Description</th>
                  <th className="px-4 py-3 text-center">Selling Price</th>
                  <th className="px-4 py-3 text-center">Price</th>
                  <th className="px-4 py-3 text-center">Category</th>
                  <th className="px-4 py-3 text-center">Stock</th>
                  <th className="px-4 py-3 text-center">Additional Info</th>
                  <th className="px-4 py-3 text-center">Featured</th>
                  <th className="px-4 py-3 text-center">SKU</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="12" className="text-center py-10 text-gray-500 font-medium">
                      Loading products...
                    </td>
                  </tr>
                ) : currentProducts.length > 0 ? (
                  currentProducts.map((product, idx) => (
                    <tr
                      key={product._id || idx}
                      className="bg-white hover:bg-[#007bff0a] transition-colors border-b border-gray-200"
                    >
                      <td className="px-4 py-2 font-medium text-gray-800 text-center">
                        {indexOfFirst + idx + 1}
                      </td>
                      <td className="px-4 py-2 text-center">{product.name}</td>
                      <td className="px-4 py-2 text-center">{product.longDescription}</td>
                      <td className="px-4 py-2 text-center">{product.shortDescription}</td>
                      <td className="px-4 py-2 text-center">${product.sellingPrice?.toFixed(2)}</td>
                      <td className="px-4 py-2 text-center">${product.price?.toFixed(2)}</td>
                      <td className="px-4 py-2 text-center">{product.category}</td>
                      <td className="px-4 py-2 text-center">{product.stock}</td>
                      <td className="px-4 py-2 text-center">{product.additionalInfo}</td>
                      <td className="px-4 py-2 text-center">{product.featuredProduct ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2 text-center">{product.sku}</td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex gap-3 justify-center">
                          <Link to={`/edit-product/${product._id}`}>
                            <button
                              className="bg-blue-100 hover:bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition"
                              title="Edit Product"
                            >
                              <FontAwesomeIcon icon={faPen} className="text-blue-600" />
                            </button>
                          </Link>
                          <button
                            className="bg-red-100 hover:bg-red-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition"
                            onClick={() => handleDelete(product._id)}
                            title="Delete Product"
                          >
                            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-6 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-3">
              <button
                className="px-5 py-2 text-gray-900 transition disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faAngleLeft} className="text-black mr-1" />
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 transition ${
                    currentPage === idx + 1 ? 'text-black font-semibold' : 'text-gray-900'
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className="px-5 py-2 text-gray-900 transition disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <FontAwesomeIcon icon={faAngleRight} className="text-black ml-1" />
              </button>
            </div>
          )}
          <ToastContainer position="top-center" theme="colored" autoClose={3000} />
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
