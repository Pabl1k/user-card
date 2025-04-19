import { useEffect, useState } from 'react';
import { getUsers } from '../api/endpoints';
import { ResponseError, UsersState } from '../api/types';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  lastPageReached: false,
  currentPage: 1
};

const isControlledError = (error: unknown) =>
  error && typeof error === 'object' && 'message' in error && typeof error.message === 'string';

export type UsersListReturn = ReturnType<typeof useUsersList>;

export const useUsersList = () => {
  const [usersState, setUsersState] = useState<UsersState>(initialState);

  const fetchUsers = async (page: number) => {
    setUsersState({ ...usersState, loading: true });

    try {
      const data = await getUsers(page);
      const lastPageReached = data.page === data.total_pages;

      if (page === 1) {
        setUsersState((prevState) => ({
          ...prevState,
          users: data.users,
          lastPageReached
        }));
      } else {
        setUsersState((prevState) => ({
          ...prevState,
          users: [...prevState.users, ...data.users],
          lastPageReached
        }));
      }
    } catch (er: unknown) {
      if (isControlledError(er)) {
        setUsersState({ ...usersState, error: er as ResponseError });
      } else {
        console.error('Unexpected error:', er);
      }
    } finally {
      setUsersState((prevState) => ({
        ...prevState,
        loading: false
      }));
    }
  };

  const sortedUsers = [...usersState.users].sort(
    (a, b) => b.registration_timestamp - a.registration_timestamp
  );

  useEffect(() => {
    fetchUsers(usersState.currentPage);
  }, [usersState.currentPage]);

  return {
    users: sortedUsers,
    loading: usersState.loading,
    lastPageReached: usersState.lastPageReached,
    increaseCurrentPage: () =>
      setUsersState((prevPage) => ({ ...prevPage, currentPage: prevPage.currentPage + 1 })),
    updateUsers: () => fetchUsers(1)
  };
};
