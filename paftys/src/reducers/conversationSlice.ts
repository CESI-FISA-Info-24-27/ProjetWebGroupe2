import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const dotenv = import.meta.env;

// Types
export interface Message {
  _id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  _id: string;
  participants: string[];
  messages: Message[];
}

interface ConversationState {
  conversations: Conversation[];
  current: Conversation | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  current: null,
  loading: false,
  error: null,
};

// Thunks

export const fetchConversations = createAsyncThunk<Conversation[]>(
  "conversation/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `${dotenv.VITE_DB_URI}/api/conversations/allMyConversations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement des conversations"
      );
    }
  }
);

export const fetchConversationById = createAsyncThunk<Conversation, string>(
  "conversation/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(
        `${dotenv.VITE_DB_URI}/api/conversations/myConversation/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          "Erreur lors du chargement de la conversation"
      );
    }
  }
);

export const createConversation = createAsyncThunk<
  Conversation,
  { participants: string[] }
>("conversation/create", async ({ participants }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.post(
      `${dotenv.VITE_DB_URI}/api/conversations`,
      { participants },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur lors de la création"
    );
  }
});

export const addMessage = createAsyncThunk<
  Conversation,
  { id: string; content: string }
>("conversation/addMessage", async ({ id, content }, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    const res = await axios.put(
      `${dotenv.VITE_DB_URI}/api/conversations/addMessage/${id}`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Erreur lors de l'ajout du message"
    );
  }
});

// Slice

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    clearCurrentConversation: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchConversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchConversationById
      .addCase(fetchConversationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversationById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchConversationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createConversation
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.push(action.payload);
      })

      // addMessage
      .addCase(addMessage.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.conversations.findIndex(
          (c) => c._id === updated._id
        );
        if (index !== -1) {
          state.conversations[index] = updated;
        }
        if (state.current && state.current._id === updated._id) {
          state.current = updated;
        }
      });
  },
});

export const { clearCurrentConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
