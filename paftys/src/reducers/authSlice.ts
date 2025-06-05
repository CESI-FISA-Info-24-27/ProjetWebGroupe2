import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  LoginPayload,
  SignupPayload,
  AuthState,
} from "@/types/auth.types";
import Cookies from "js-cookie";

// Base de l’API
const API_BASE_URL = "http://localhost:5555/api/users";

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

    return {
      user: {
        id: data.id,
        email: data.email,
        username: data.userName,
        role: data.role,
        state: data.state,
        biography: data.biography,
        profilePicture: data.profilePicture,
        conversations: data.conversations,
        notifications: data.notifications,
        firendList: data.firendList,
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

export const signup = createAsyncThunk<
  { user: AuthState["user"]; token: string },
  SignupPayload
>("auth/signup", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    const data = response.data.data;

    return {
      user: {
        id: data.id,
        email: data.email,
        username: data.userName,
        role: data.role,
        state: data.state,
      },
      token: data.token,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur d'inscription"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
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
        Cookies.set("token", action.payload.token);
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
