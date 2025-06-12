import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteproducts, clearErrors } from "../../../Actions/productActions";
import Table from 'react-bootstrap/Table';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from "react-toastify";

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();

  const { products = [], loading, error } = useSelector(state => state.productList);


  // Sort products by created date descending if date available
  const sortedProducts = Array.isArray(products.products)
    ? products.products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
  console.log(products.products)

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    if (error) {
      // toast.error(error);
      //   dispatch(clearErrors());
    }
    setCurrentPage(1);
    dispatch(getProducts());

  }, [dispatch, error]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await dispatch(deleteproducts(productId));
    dispatch(getProducts());
    if (error) {
      toast.error(error);
      //   dispatch(clearErrors());
    }
  };

  return (
    <div className='flex min-h-screen sm:min-w-full'>
      <div className='w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>
        <div className='flex flex-col gap-6 p-6 sm:p-10 pb-6 overflow-hidden bg-white'>
          <div className='border-b pb-[12px] border-gray-300 flex justify-between items-center'>
            <h2 className='text-xl font-semibold capitalize flex items-center'>
              Products
            </h2>
            <Link to="/add-product">
              <button className='w-fit hover:opacity-[0.8] border border-[#ee403d] text-white bg-[#ee403d] py-[8px] px-[15px] rounded-[2px]'>
                Add Product
              </button>
            </Link>
          </div>

          <div className='border border-gray-300 w-full overflow-x-auto h-full'>
            <Table className='w-full text-[15px] text-left text-gray-700 dark:text-gray-400'>
              <thead className='text-[16px] text-gray-700 bg-gray-50'>
                <tr>
                  <th scope="col" className="px-6 py-4">S. No.</th>
                  {/* <th scope="col" className="px-6 py-4">Image</th> */}
                  <th scope="col" className="p-4 w-[350px]">Product</th>
                  <th scope="col" className="px-6 py-4 ">Category</th>
                  <th scope="col" className="px-6 py-4">Price</th>
                  <th scope="col" className="px-6 py-4">Selling Price</th>
                  <th scope="col" className="px-6 py-4">Stock</th>
                  {/* <th scope="col" className="px-6 py-4">Featured</th> */}
                  {/* <th scope="col" className="px-6 py-4">Added On</th> */}
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-gray-500 font-medium">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-gray-500 font-medium">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product, index) => {
                    // Compose image URL safely
                    const imageUrl = product.images && product.images.length > 0
                      ? `${baseUrl}${product.images[0] ? '' : '/'}${product.images[0]}`
                      : null;

                    return (
                      <tr
                        key={product._id}
                        className='text-black bg-white border-b border-gray-200 hover:shadow-lg hover:bg-[#ff00000a] transition-colors duration-200'
                      >
                        <td className="px-6 py-2 capitalize font-semibold">{indexOfFirstProduct + index + 1}</td>
                        <td className="px-4 py-2 flex gap-2 w-[350px]">
                          <div className="w-11 h-11 rounded-full overflow-hidden shadow-sm border border-gray-300 inline-block">
                            {imageUrl ? (

                              <LazyLoadImage
                                src={imageUrl}
                                alt={product.title}
                                height={50}
                                width={50}
                                effect=""
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded text-gray-500 text-xs">
                                No Image
                              </div>

                            )}
                          </div>
                          <div className="px-2 py-2  flex items-center capitalize">
                            {product.title}
                          </div>
                        </td>
                        {/* <td className="px-6 py-2 font-semibold"></td> */}
                        <td className="px-6 py-2">{product.category}</td>
                        <td className="px-6 py-2">{product.sellingPrice ? `$ ${product.sellingPrice}` : ''}</td>
                        <td className="px-6 py-2">{product.discountPrice ? `$ ${product.discountPrice}` : '--'}</td>
                       <td className="px-6 py-2 font-semibold">
  <div
    className={`
      flex items-center justify-center w-[40px] h-[40px] rounded-full
      ${product.stock === 0 
        ? 'text-gray-600 bg-gray-200' 
        : product.stock <= 4 
          ? 'text-red-600 font-bold bg-[#ff000021]' 
          : 'text-green-600 font-bold bg-[#00ff0033]'}
    `}
    title={
      product.stock === 0
        ? 'Out of Stock'
        : product.stock <= 4
        ? 'Low Stock'
        : 'In Stock'
    }
  >
    {product.stock}
  </div>
</td>


                        {/* <td className="px-6 py-2">{product.stock}</td> */}
                        {/* <td className="px-6 py-2">{product.featured ? 'Yes' : 'No'}</td> */}
                        {/* <td className="px-6 py-2 text-gray-500 font-mono">
                          {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : ''}
                        </td> */}
                        <td className="px-6 py-2">
                          <div className='flex gap-3 justify-center'>
                            <Link to={`/edit-product/${product._id}`}>
                              <button
                                className='bg-blue-100 hover:bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                                title="Edit Product"
                              >
                                <FontAwesomeIcon icon={faPen} className='text-blue-600' />
                              </button>
                            </Link>
                            <button
                              className='bg-red-100 hover:bg-red-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition'
                              onClick={() => handleDeleteProduct(product._id)}
                              title="Delete Product"
                            >
                              <FontAwesomeIcon icon={faTrash} className='text-red-600' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <ToastContainer position="top-center" theme="colored" autoClose={3000} />
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-3">
              <button
                className={`px-5 py-2 text-gray-900 transition disabled:opacity-50`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faAngleLeft} className='text-black mr-[5px]' /> Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 transition ${currentPage === idx + 1 ? 'text-black' : 'text-gray-900'}`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className={`px-5 py-2 text-gray-900 transition disabled:opacity-50`}
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

export default ProductList;
