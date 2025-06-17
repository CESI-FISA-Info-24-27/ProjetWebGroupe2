import type Post from "@/models/Post";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const dotenv = import.meta.env;

export interface Tag {
  _id: string;
  count: number;
}

export interface TagsState {
  trendingTags: Tag[];
  postsByTags: Post[];
  loading: boolean;
  error: string | null;
}

export interface PostsbyTagState {
  post: Post[];
  tag: Tag;
  error: string | null;
}

const initialState: TagsState = {
  trendingTags: [],
  postsByTags: [],
  loading: false,
  error: null,
};

export const fetchTrendingTags = createAsyncThunk<
  Tag[],
  void,
  { rejectValue: string }
>("tags/fetchTrendingTags", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${dotenv.VITE_DB_URI}/api/posts/tags`);
    return res.data.data as Tag[];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message ||
        "Erreur lors du chargement des tags tendance"
    );
  }
});

export const fetchPostsByTag = createAsyncThunk<Post[], { postId: string }>(
  "tags/fetchPostsByTag",
  async (tagId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${dotenv.VITE_DB_URI}/api/posts/tags/${tagId.postId}`
      );
      return res.data.data as Post[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement des posts par tag"
      );
    }
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTags.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingTags = action.payload;
      })
      .addCase(fetchTrendingTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erreur inconnue";
      })
      .addCase(fetchPostsByTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.postsByTags = action.payload;
      })
      .addCase(fetchPostsByTag.rejected, (state) => {
        state.loading = false;
        state.error = "Erreur inconnue";
      });
  },
});

export default tagsSlice.reducer;
