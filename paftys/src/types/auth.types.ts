export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  userName?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    userName: string;
    role: string;
    state: string;
    token: string;
    biography: string;
    profilePicture: string;
    conversations: string[];
    notifications: string[];
    posts: string[];
  };
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    userName: string;
    biography: string;
    profilePicture: string;
    conversations: string[];
    notifications: string[];
    posts: string[];
    role: string;
    state: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
