// userReducers.js
import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ERRORS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
  NEW_USER_FAIL,
  NEW_USER_RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "../Constants/userConstants";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const initialLoginState = {
  isLoggedIn: !!userFromStorage,
  user: userFromStorage,
  loading: false,
  error: null,
};

// Get All Users Reducer
export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        userCount: action.payload.userCount,
        resultPerPage: action.payload.resultPerPage,
        filteredUsersCount: action.payload.filteredUsersCount,
      };
    case ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create New User Reducer
export const newUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case NEW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_USER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        user: action.payload.user,
      };
    case NEW_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_USER_RESET:
      return {
        ...state,
        success: false,
        user: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete User Reducer
export const deleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const loginAdminReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, loading: false, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { isLoggedIn: false, user: null, loading: false };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Logout action creator
export const logoutAdmin = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: LOGOUT });
};
