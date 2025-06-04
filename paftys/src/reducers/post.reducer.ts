const initialState = {};

export default function postReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      return action.payload;
    // case 'ADD_POST':
    //   return {
    //     ...state,
    //     posts: [...state.posts, action.payload],
    //   };
    // case 'UPDATE_POST':
    //   return {
    //     ...state,
    //     posts: state.posts.map(post =>
    //       post._id === action.payload._id ? action.payload : post
    //     ),
    //   };
    // case 'DELETE_POST':
    //   return {
    //     ...state,
    //     posts: state.posts.filter(post => post._id !== action.payload),
    //   };
    default:
      return state;
  }
}