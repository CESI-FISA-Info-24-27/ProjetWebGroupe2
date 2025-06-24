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

interface ToggleSubscriptionResponse {
  myInfo: User;
  subscribedUserInfo: User;
}

export const toggleSubscription = createAsyncThunk<
  ToggleSubscriptionResponse, // payload type when fulfilled
  { userId: string }, // argument type
  { rejectValue: string } // payload type when rejected
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
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur lors du toggle abonnement."
    );
  }
});
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
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload;
        if (!payload) return;

        console.log("Toggle subscription payload:", payload);
        const { myInfo, subscribedUserInfo } = payload;

        const myIndex = state.users.findIndex((u) => u.id === myInfo.id);
        if (myIndex !== -1) {
          state.users[myIndex] = {
            ...state.users[myIndex],
            ...myInfo,
          };
        } else {
          state.users.push(myInfo);
        }

        const subscribedIndex = state.users.findIndex(
          (u) => u.id === subscribedUserInfo.id
        );
        if (subscribedIndex !== -1) {
          state.users[subscribedIndex] = {
            ...state.users[subscribedIndex],
            ...subscribedUserInfo,
          };
        } else {
          state.users.push(subscribedUserInfo);
        }
      })

      .addCase(toggleSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Erreur lors du toggle abonnement.";
      });
  },
});

export default userSlice.reducer;
