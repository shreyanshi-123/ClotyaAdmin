import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { usersReducer, loginAdminReducer, deleteReducer,logoutAdmin } from './Reducers/userReducers';



const reducer = combineReducers({
   userList: usersReducer,
    loginAdmin: loginAdminReducer,
     logoutAdmin: logoutAdmin,
    deleteUser: deleteReducer,

});

const initialState = {
  users: [],
  loading: false,
  error: null,
  isDeleted: false,
   isLoggedIn: false,
};



const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;