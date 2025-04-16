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

interface GetUserParams {
  page: number;
  count: number;
}

export interface Error {
  success: boolean;
  message: string;
  fails?: Record<string, string[]>;
}

export interface State {
  users: User[];
  loading: boolean;
  error: Error | null;
  lastPageReached: boolean;
}
