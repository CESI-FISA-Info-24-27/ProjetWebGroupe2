import { combineReducers } from "redux";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import tagsReducer from "./tagsSlice";
const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  auth: authReducer,
  tags: tagsReducer,
});

export default rootReducer;
