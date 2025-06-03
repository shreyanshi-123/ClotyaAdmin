import { ALL_USERS_FAIL, ALL_USERS_SUCCESS, ALL_USERS_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAIL, NEW_USER_REQUEST, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, CLEAR_ERRORS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../Constants/userConstants";
import axios from "axios";
const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;


// Get All USERS
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        let url = `${baseUrl}/api/user`;

        // if (category) {
        //     url = `/api/v1/blogs?category=${category}&page=${currentPage}`;
        // }

        const { data } = await axios.get(url);
        // const usersdata = JSON.stringify(data)
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};




// New USER ---ADMIN
export const createUsers = (userData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_USER_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/register-user`, userData, config);

        dispatch({
            type: NEW_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update USER ---ADMIN
export const updateUsers = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/editUser/${id}`, userData, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete USER ---ADMIN
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
            payload: error.response.data.message,
        });
    }
}

// Example action (login.js)
export const login = (email, password, role) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`${baseUrl}/api/login`, { email, password, role }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data });
        alert(JSON.stringify(data.user))
        // Save to sessionStorage here (or do it in the component)
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        window.location.href = ('/dashboard')
        //  localStorage.setItem('isLoggedIn');
    } catch (error) {

        dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
    }
};
export const logout = () => (dispatch) => {
    // clear localStorage or tokens here if needed
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};


// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}