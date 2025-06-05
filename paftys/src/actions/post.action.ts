import axios from "axios";

export const GET_ALL_POSTS = "GET_ALL_POSTS";

export const getAllPosts = () => {
  return (dispatch: any) => {
    return axios.get("http://localhost:5000/api/posts").then((res) => {
      dispatch({ type: GET_ALL_POSTS, payload: res.data.data });
    });
  };
};
