import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "@/types/user.types";
import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_DB_URI + "/api/users";

// État du slice
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], string>(
  "user/fetchUsers",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement des utilisateurs"
      );
    }
  }
);

export const fetchUserById = createAsyncThunk<User, { userName: string }>(
  "user/fetchUserById",
  async ({ userName }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/forProfilePageUserName/${userName}`
      );
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement de l'utilisateur"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateMe",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.token;

      const response = await axios.put(`${API_BASE_URL}/updateMe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur de mise à jour du profil"
      );
    }
  }
);

// Slice Redux Toolkit
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [action.payload];
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.users.length > 0) {
          const index = state.users.findIndex(
            (u) => u.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          } else {
            state.users.push(action.payload);
          }
        } else {
          state.users = [action.payload];
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
