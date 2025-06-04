import axios from 'axios';

export const GET_ALL_USERS = 'GET_ALL_USERS';

export const getAllUsers = (token: String) => {
  return (dispatch: any) => {
    return axios.get("http://localhost:5000/api/users", {headers: {"Authorization": "Bearer " + token}}).then((res) => {
      dispatch({ type: GET_ALL_USERS, payload: res.data.data });
    });
  };
};