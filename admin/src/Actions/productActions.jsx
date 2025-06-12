import axios from 'axios';
import { ToastContainer, toast, Bounce } from "react-toastify";
// Action Types
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL

} from '../Constants/ProductsConstant'
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate
const baseUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : process.env.REACT_APP_API_URL;


// Create Product Action
export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(`${baseUrl}/api/products`, formData, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
    toast.success(data.message || 'Product created successfully!');
   window.location.href=('/products')
  } catch (error) {
    const message = error.response?.data?.error;
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      // errors: action.payload.message
      payload: message,
        
    });
  toast.error(error.response?.data?.error );
  dispatch({ type: 'RESET_STATE' });

  }
};


export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${baseUrl}/api/productslist`);

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
     
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.message || 'Failed to get product');
  }
};

export const deleteproducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`${baseUrl}/api/deleteProduct/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
    toast.success(data.message || 'Product deleted successfully!');
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const getProductById = (id) => async (dispatch) => {
  // alert(id)
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
     const { data } = await axios.get(`${baseUrl}/api/get-product/${id}`);
    //  alert(JSON.stringify (data));
    // const data = await response.json();
   dispatch({
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data,
       });
  } catch (error) {
    dispatch({ type: 'PRODUCT_DETAILS_FAIL', payload: error.message });
  }
};

// Update product (Admin)
export const updatproduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post(`${baseUrl}/api/editProduct/${id}`, productData, config);

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    window.location.href= ('/products')
     toast.success(data.message || 'Product updated successfully!');
     dispatch({ type: 'RESET_STATE' });


  } catch (error) {
   
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.response?.data?.error );
  }
};

