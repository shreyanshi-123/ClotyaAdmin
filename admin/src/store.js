import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
  usersReducer,
  loginAdminReducer,
  deleteReducer,
  logoutAdmin,
  newUserReducer,
  imageuserReducer ,
  userDetailsReducer
} from './Reducers/userReducers';
import {
  categoryReducer,
  newcategoryReducer,
  deletecategoryReducer,
  imagecategoryReducer,
  // updatecategoryReducer,
  categoryDetailsReducer
} from './Reducers/categoriyReducer';
import {
 newProductReducer,
 GetProducrReducer,
 productDetailReducer
} from './Reducers/productReducer'


const reducer = combineReducers({
  userList: usersReducer,
  loginAdmin: loginAdminReducer,
  logoutAdmin: logoutAdmin,
  deleteUser: deleteReducer,
  newUser: newUserReducer,
  categoryList: categoryReducer,
  imageCategory: imagecategoryReducer, 
  newCategory: newcategoryReducer,    
  deleteCategory: deletecategoryReducer   ,
 imageUser: imageuserReducer ,
 userDetail:userDetailsReducer,
 categoryDetail:categoryDetailsReducer,
 newProduct: newProductReducer,
 productList:GetProducrReducer,
 productdetail:productDetailReducer
});

// Optional: You can remove `initialState` if each reducer defines its own default state
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
