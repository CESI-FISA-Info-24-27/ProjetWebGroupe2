import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Type de post
export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  // ajoute les autres champs si besoin
}

// State
interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Thunk pour charger tous les posts
export const fetchPosts = createAsyncThunk<Post[]>(
  "post/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur lors du chargement des posts"
      );
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Tu peux ajouter addPost, updatePost, deletePost ici plus tard
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
