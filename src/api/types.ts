export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface Links {
  next_url: string | null;
  prev_url: string | null;
}

export interface UsersResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: Links;
  users: User[];
}

export interface ResponseError {
  success: boolean;
  message: string;
  fails?: Record<string, string[]>;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: ResponseError | null;
  lastPageReached: boolean;
  currentPage: number;
}

export interface Position {
  id: number;
  name: string;
}

export interface PositionsResponse {
  success: boolean;
  positions: Position[];
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
}

export interface RegisterUserResponse {
  success: boolean;
  user_id: number;
  message: string;
}
