// ./reducers/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  LoginPayload,
  SignupPayload,
  AuthResponse,
  AuthState,
} from "@/types/auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async login
export const login = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post<AuthResponse>(
        "/api/login",
        credentials
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur inconnue"
      );
    }
  }
);

// Async signup
export const signup = createAsyncThunk<AuthResponse, SignupPayload>(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post<AuthResponse>("/api/signup", userData);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Erreur inconnue"
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
    },
  },
  extraReducers: (builder) => {
    builder
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
