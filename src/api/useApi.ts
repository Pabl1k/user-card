import { useEffect, useState } from 'react';
import { getUsers } from './endpoints';
import { ResponseError, UsersState } from './types';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  lastPageReached: false,
  currentPage: 1
};

const isControlledError = (error: unknown) =>
  error && typeof error === 'object' && 'message' in error && typeof error.message === 'string';

export const useApi = () => {
  const [usersState, setUsersState] = useState<UsersState>(initialState);

  const fetchUsers = async () => {
    setUsersState({ ...usersState, loading: true });

    try {
      const data = await getUsers(usersState.currentPage);
      const lastPageReached = data.page === data.total_pages;

      setUsersState((prevState) => ({
        ...prevState,
        users: [...prevState.users, ...data.users],
        lastPageReached
      }));
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
    fetchUsers();
  }, [usersState.currentPage]);

  return {
    users: sortedUsers,
    loading: usersState.loading,
    lastPageReached: usersState.lastPageReached,
    increaseCurrentPage: () =>
      setUsersState((prevPage) => ({ ...prevPage, currentPage: prevPage.currentPage + 1 }))
  };
};
