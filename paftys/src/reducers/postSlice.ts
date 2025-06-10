import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type Post from "@/models/Post";
import Cookies from "js-cookie";
const dotenv = import.meta.env;

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
      const res = await axios.get(dotenv.VITE_DB_URI + "/api/posts");

      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur lors du chargement des posts"
      );
    }
  }
);

export const toggleLikePost = createAsyncThunk<Post, { postId: string }>(
  "post/toggleLike",
  async ({ postId }, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return thunkAPI.rejectWithValue("Token non trouvé");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${dotenv.VITE_DB_URI}/api/posts/toggleLike`,
        { postId }
      );
      // On récupère le post courant dans le state
      const state: any = thunkAPI.getState();
      const currentPost = state.post.posts.find(
        (p: Post) => p._id === res.data.data.postId
      );
      if (!currentPost) throw new Error("Post introuvable dans le state");
      // On fusionne les likes reçus avec le post courant
      return {
        ...currentPost,
        likes: res.data.data.likes,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur lors de la modification du like"
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
      })
      // Gestion du toggleLikePost
      .addCase(toggleLikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (index !== -1) {
          state.posts = [
            ...state.posts.slice(0, index),
            updatedPost,
            ...state.posts.slice(index + 1),
          ];
        } else {
          state.posts = [...state.posts, updatedPost];
        }
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
