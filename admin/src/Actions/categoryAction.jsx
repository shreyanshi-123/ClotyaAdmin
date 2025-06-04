import {
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    IMAGE_REQUEST,
    IMAGE_SUCCESS,
    IMAGE_FAIL,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_REQUEST,
    CLEAR_ERRORS
} from "../Constants/categoryConstants";

import axios from "axios";

// Determine base URL based on environment
const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;

// Get All categorys
export const getcategory = () => async (dispatch) => {


    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });

        const { data } = await axios.get(`${baseUrl}/api/get-category`);

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data,
        });
        // console.log(data)
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Create New CATEGORY (Admin)
export const createcategory = (categoryData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(`${baseUrl}/api/addCategory`, categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Update category (Admin)
export const updatecategory = (id, categoryData) => async (dispatch) => {
    // alert('categoryData',categoryData)
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(`${baseUrl}/api/update-category/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Delete category (Admin)
export const deletecategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await axios.delete(`${baseUrl}/api/delete-category/${id}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// image upload


// export const imageUpload = (data) => async (dispatch) => {
export const imageUpload = (formData) => async (dispatch) => {
//   alert(JSON.stringify(formData)); 
  
  try {
    dispatch({ type: IMAGE_REQUEST });

    
    const config = {
      headers: { 
        // "Content-Type": "multipart/form-data" // Axios sets this automatically if omitted
      }
    };

    const { data } = await axios.post(`${baseUrl}/api/CategoryImage`, formData, config);

    dispatch({
      type: IMAGE_SUCCESS,
      payload: data, 
    });

    return data; 
  } catch (error) {
    dispatch({
      type: IMAGE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error; 
  }
};

export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`${baseUrl}/api/get-category/${id}`);

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
