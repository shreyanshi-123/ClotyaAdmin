// CATEGORYReducers.js
import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_ERRORS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_RESET,
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
  IMAGE_FAIL,
  IMAGE_RESET,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL
} from "../Constants/categoryConstants";

const categoryFromStorage = localStorage.getItem("categoryInfo")
  ? JSON.parse(localStorage.getItem("categoryInfo"))
  : null;

  const initialLoginState = {
  isLoggedIn: !!categoryFromStorage,
  category: categoryFromStorage,
  loading: false,
  image: null,  
  error: null,
};
;
// Get All CATEGORY Reducer
export const categoryReducer = (state = { categories: [] }, action) => {
  switch(action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case ALL_CATEGORY_FAIL:
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


// Create New category Reducer
export const newcategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };
    case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CATEGORY_RESET:
      return {
        ...state,
        success: false,
        category: {},
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

// Delete category Reducer
export const deletecategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CATEGORY_RESET:
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

export const imagecategoryReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
       image: action.payload,
      };
    case IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMAGE_RESET:
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

export const categoryDetailsReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload, error: null };
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, category: null, error: action.payload };
    default:
      return state;
  }
};