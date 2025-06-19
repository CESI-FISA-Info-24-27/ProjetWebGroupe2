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
  postLikersByPostId: { [postId: string]: UserForPost[] };
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  postLikersByPostId: {},
};

export interface UserForPost {
  _id: string;
  userName: string;
  biography: string;
  profilePicture: string;
}

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

export const fetchPostById = createAsyncThunk<Post, { postId: string }>(
  "post/fetchPostById",
  async ({ postId }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${dotenv.VITE_DB_URI}/api/posts/replies/${postId}`
      );
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur lors du chargement du post"
      );
    }
  }
);

export const fetchPostsByUserId = createAsyncThunk<Post[], { userId: string }>(
  "post/fetchPostsByUserId",
  async ({ userId }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${dotenv.VITE_DB_URI}/api/posts/user/${userId}`
      );

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
  reducers: {},
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
      })
      .addCase(fetchPostLikers.fulfilled, (state, action) => {
        const { postId, users } = action.payload;
        state.postLikersByPostId[postId] = users;
      })
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload as unknown as Post[];
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const fetchPostLikers = createAsyncThunk<
  { postId: string; users: UserForPost[] },
  { postId: string; userIds: string[] }
>("post/fetchPostLikers", async ({ postId, userIds }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("Token manquant");

    const responses = await Promise.all(
      userIds.map((id) =>
        axios.get(`${dotenv.VITE_DB_URI}/api/users/forProfilePageUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );

    const users = responses.map((res) => res.data.data);
    return { postId, users };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur lors du chargement des likers"
    );
  }
});

export default postSlice.reducer;
