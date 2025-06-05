import { combineReducers } from "redux";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
