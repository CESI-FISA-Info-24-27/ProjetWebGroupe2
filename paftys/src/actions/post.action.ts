import axios from "axios";

export const GET_ALL_POSTS = "GET_ALL_POSTS";

const api_url = import.meta.env.VITE_DB_URI;

export const getAllPosts = () => {
  return (dispatch: any) => {
    return axios.get(api_url + "/api/posts").then((res) => {
      dispatch({ type: GET_ALL_POSTS, payload: res.data.data });
    });
  };
};
