import { PositionsResponse, CreateUserData, RegisterUserResponse, UsersResponse } from './types';

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

export const getPositions = async (): Promise<PositionsResponse> => {
  const response = await fetch(`${API_URL}/positions`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch positions: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as PositionsResponse;
};

const getToken = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/token`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch token: ${response.status} - ${errorText}`);
  }

  return (await response.json()).token;
};

export const registerUser = async (
  params: CreateUserData
): Promise<RegisterUserResponse | undefined> => {
  try {
    const token = await getToken();

    const body = new FormData();

    for (const [key, value] of Object.entries(params)) {
      body.append(key, value);
    }

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        Token: token
      },
      body
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return undefined;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to register user', error);
    return undefined;
  }
};
