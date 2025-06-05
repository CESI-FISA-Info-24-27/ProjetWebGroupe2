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
  user: {
    id: string;
    email: string;
    username?: string;
  };
  token: string;
}

export interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
