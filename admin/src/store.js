import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  usersReducer,
  loginAdminReducer,
  deleteReducer,
  logoutAdmin
} from './Reducers/userReducers';

const reducer = combineReducers({
  userList: usersReducer,
  loginAdmin: loginAdminReducer,
  logoutAdmin: logoutAdmin,
  deleteUser: deleteReducer,
});

// Optional: You can remove `initialState` if each reducer defines its own default state
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
