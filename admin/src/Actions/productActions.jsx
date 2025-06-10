import axios from 'axios';

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
  PRODUCT_DETAILS_FAIL
} from '../Constants/ProductsConstant'


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

    const { data } = await axios.post('http://localhost:5000/api/products', formData, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
   
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
    //  window.location.href=('/products')
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
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
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// export const getProductById = (id) => async (dispatch) => {
//   try {
//     dispatch({ type:  PRODUCT_DETAILS_REQUEST });

//     const { data } = await axios.get(`${baseUrl}/api/get-product/${id}`);

//     dispatch({
//       type:  PRODUCT_DETAILS_SUCCESS,
//       payload: data,
//     });
//     // alert(JSON.stringify(data))
//   } catch (error) {
//     dispatch({
//       type:  PRODUCT_DETAILS_FAIL,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };
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
