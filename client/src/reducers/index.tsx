import {combineReducers} from "redux";
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import errorReducer from "./errorReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    admin: adminReducer
})
