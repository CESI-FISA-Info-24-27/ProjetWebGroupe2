import { combineReducers } from "redux";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import tagsReducer from "./tagsSlice";
import conversationReducer from "./conversationSlice";
const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  auth: authReducer,
  tags: tagsReducer,
  conversation: conversationReducer,
});

export default rootReducer;
