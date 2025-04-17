import { UsersResponse } from './types';

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';
const COUNT_SIZE = 6;

export const getUsers = async (page: number): Promise<UsersResponse> => {
  const response = await fetch(`${API_URL}/users?page=${page}&count=${COUNT_SIZE}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch users: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as UsersResponse;
};
