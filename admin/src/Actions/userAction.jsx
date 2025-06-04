import {
  ALL_USERS_FAIL,
  ALL_USERS_SUCCESS,
  ALL_USERS_REQUEST,
  IMAGE_FAIL,
  IMAGE_SUCCESS,
  IMAGE_REQUEST,
  NEW_USER_SUCCESS,
  NEW_USER_FAIL,
  NEW_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CLEAR_ERRORS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "../Constants/userConstants";

import axios from "axios";

// Determine base URL based on environment
const baseUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : process.env.REACT_APP_API_URL;

// Get All Users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`${baseUrl}/api/user`);

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create New User (Admin)
export const createUsers = (userData) => async (dispatch) => {
 
  try {
    dispatch({ type: NEW_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" }
    };

    const { data } = await axios.post(`${baseUrl}/api/register-user`, userData, config);

    dispatch({
      type: NEW_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update User (Admin)
export const updateUsers = (id, userData) => async (dispatch) => {
  // alert("userData",userData)
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" }
    };

    const { data } = await axios.post(`${baseUrl}/api/editUser/${id}`, userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete User (Admin)
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`${baseUrl}/api/deleteUser/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Admin Login
export const login = (email, password, role) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" }
    };

    const { data } = await axios.post(`${baseUrl}/api/login`, { email, password, role }, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    // Save session info
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
//   localStorage.setItem("userInfo", JSON.stringify(userData));
    // Redirect
    window.location.href = '/dashboard';
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Admin Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

// image upload

export const imageUpload = (formData) => async (dispatch) => {
  // alert(JSON.stringify(formData)); 
  
  try {
    dispatch({ type: IMAGE_REQUEST });

   
    const config = {
      headers: { 
        // "Content-Type": "multipart/form-data" // Axios sets this automatically if omitted
      }
    };

    const { data } = await axios.post(`${baseUrl}/api/upload`, formData, config);

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



// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


// userActions.js
// import axios from 'axios';
// import {
 
// } from '../Constants/userConstants';



export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`${baseUrl}/api/get-user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
