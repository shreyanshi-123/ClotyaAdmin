import {
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../Constants/ProductsConstant';

const initialState = {
    loading: false,
    product: null,
    error: null,
    data: null
};

export const newProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { loading: true, product: null, error: null };
        case CREATE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload, error: null };
        case CREATE_PRODUCT_FAIL:
            return { loading: false, product: null, error: action.payload };
        default:
            return state;
    }
};




// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

export const GetProducrReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return { ...state, loading: true };

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'PRODUCT_DETAILS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
