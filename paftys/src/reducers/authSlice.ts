import type {
  LoginPayload,
  SignupPayload,
  AuthState,
} from "@/types/auth.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_DB_URI + "/api/users";

// Récupère le token s'il est en cookie
const tokenFromCookies = Cookies.get("token");

const initialState: AuthState = {
  user: null,
  token: tokenFromCookies || null,
  loading: false,
  error: null,
};

// 🔁 LOGIN
export const login = createAsyncThunk<
  { user: AuthState["user"]; token: string },
  LoginPayload
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    const data = response.data.data;

    // Sauvegarde du token dans le cookie
    Cookies.set("token", data.token);

    return {
      user: {
        id: data.id,
        email: data.email,
        userName: data.userName,
        role: data.role,
        state: data.state,
        biography: data.biography,
        profilePicture: data.profilePicture,
        conversations: data.conversations,
        notifications: data.notifications,
        subscribers: data.subscribers,
        subscriptions: data.subscriptions,
        posts: data.posts,
      },
      token: data.token,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur de connexion"
    );
  }
});

// 🔁 SIGNUP
export const signup = createAsyncThunk<
  { user: AuthState["user"]; token: string },
  SignupPayload
>("auth/signup", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    const data = response.data.data;

    Cookies.set("token", data.token);

    return {
      user: {
        id: data.id,
        email: data.email,
        userName: data.userName,
        role: data.role,
        state: data.state,
        biography: data.biography,
        profilePicture: data.profilePicture,
        conversations: data.conversations,
        notifications: data.notifications,
        subscribers: data.subscribers,
        subscriptions: data.subscriptions,
        posts: data.posts,
      },
      token: data.token,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur d'inscription"
    );
  }
});

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
    updateSubscriptions(state, action) {
      if (state.user && action.payload) {
        state.user.subscriptions = action.payload.subscriptions;
        state.user.subscribers = action.payload.subscribers;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateSubscriptions } = authSlice.actions;
export default authSlice.reducer;
