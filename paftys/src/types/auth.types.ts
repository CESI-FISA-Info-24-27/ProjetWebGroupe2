export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  username?: string;
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
  };
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    state: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
