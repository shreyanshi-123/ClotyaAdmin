import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, NEW_USER_FAIL, NEW_USER_REQUEST, NEW_USER_RESET, NEW_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT } from "../Constants/userConstants";

const initialState = {
    users: [],
    loading: false,
    error: null,
    isLoggedIn: false,
};



export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                users: [],
            };
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case ALL_USERS_FAIL:
            return {
                ...state,
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


// get All USERS
// export const usersReducer = (state = { users: [] }, { type, payload }) => {

//     switch (type) {
//         case ALL_USERS_REQUEST:

//             return {
//                 loading: true,
//                 users: [],
//             };
//         case ALL_USERS_SUCCESS:
//             return {
//                 loading: false,
//                 users: payload.users,
//                 userCount: payload.userCount,
//                 resultPerPage: payload.resultPerPage,
//                 filteredusersCount: payload.filteredusersCount,
//             };

//         case ALL_USERS_FAIL:

//             return {
//                 loading: false,
//                 error: payload,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };
//         default:
//             return state;
//     }
// }



// New user Reducer
export const newUserReducer = (state = { user: {} }, { type, payload }) => {
    switch (type) {
        case NEW_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_USER_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                user: payload.user,
            };
        case NEW_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_USER_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

// user Reducer
export const deleteReducer = (state = {}, { type, payload }) => {
    switch (type) {

        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            };

        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
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
}

export const loginAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, Loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, Loading: false, user: action.payload, error: null };
        case LOGIN_FAILURE:
            return { ...state, Loading: false, error: action.payload };
        case LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
};

export const logoutAdmin = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};






