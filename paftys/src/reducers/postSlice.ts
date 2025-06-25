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
export const createPost = createAsyncThunk<Post, Partial<Post>>(
  "post/createPost",
  async (newPostData, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Token manquant");

      const res = await axios.post(
        `${dotenv.VITE_DB_URI}/api/posts`,
        newPostData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur lors de la création du post"
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
      .addCase(fetchPostLikers.fulfilled, (state, action) => {
        const { postId, users } = action.payload;
        state.postLikersByPostId[postId] = users;
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
            .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        const newPost = action.payload;

        // Ajouter le nouveau post en tête de liste
        state.posts = [newPost, ...state.posts];

        // Si c'est une réponse, on ajoute son id dans replies du post parent
        if (newPost.repliesTo) {
          const parentIndex = state.posts.findIndex(
            (p) => p._id === newPost.repliesTo
          );
          if (parentIndex !== -1) {
            const parentPost = state.posts[parentIndex];
            if (!parentPost.replies) {
              parentPost.replies = [];
            }
            parentPost.replies.push(newPost._id);

            // On remplace le post parent modifié (immutabilité)
            state.posts[parentIndex] = { ...parentPost };
          }
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
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
