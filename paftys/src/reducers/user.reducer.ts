const initialState = {};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.payload;
    default:
      return state;
  }
}