export type UserRole = "admin" | "moderator" | "user";
export type UserState = "normal" | "banned" | "suspended";

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  biography: string;
  profilePicture: string;
  role: UserRole;
  conversations: string[];
  posts: string[];
  notifications: string[];
  state: UserState;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
