import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "@/types/user.types";
import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_DB_URI + "/api/users";

// État du slice
interface UserState {
  selectedUser: User | null;
  users: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
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

interface ToggleSubscriptionResponse {
  myInfo: any;
  subscribedUserInfo: any;
}

export const toggleSubscription = createAsyncThunk<
  ToggleSubscriptionResponse,
  { userId: string },
  { rejectValue: string }
>("user/toggleSubscription", async ({ userId }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(
      `${API_BASE_URL}/subscribe/`,
      { userIdToSubscribe: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur lors du toggle abonnement."
    );
  }
});

export const toggleBanUser = createAsyncThunk<any, {id: string, token: any}>(
  "user/toggleBanUser",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/admin/toggleBan/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement de l'utilisateur"
      );
    }
  }
);

export const toggleSuspendUser = createAsyncThunk<any, { id: string, token: any}>(
  "user/toggleSuspendUser",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/admin/toggleSuspend/${id}`,  {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement de l'utilisateur"
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
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erreur lors du toggle abonnement.";
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        const { myInfo, subscribedUserInfo } = action.payload;
        if (state.selectedUser) {
          if (state.selectedUser.id === myInfo._id) {
            state.selectedUser = {
              ...state.selectedUser,
              ...myInfo,
            };
          } else if (state.selectedUser.id === subscribedUserInfo._id) {
            state.selectedUser = {
              ...state.selectedUser,
              ...subscribedUserInfo,
            };
          }
        }
      })
      .addCase(toggleBanUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBanUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(toggleBanUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleSuspendUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSuspendUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(toggleSuspendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
