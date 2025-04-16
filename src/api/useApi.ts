import { useEffect, useState } from 'react';
import { Error, State } from './types';

const COUNT_SIZE = 6;

const initialState: State = {
  users: [],
  loading: false,
  error: null,
  lastPageReached: false
};

export const useApi = () => {
  const [state, setState] = useState<State>(initialState);
  const [currentPage, setCurrentPagePage] = useState<number>(1);

  const fetchUsers = async () => {
    setState({ ...state, loading: true });

    try {
      const response = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=${COUNT_SIZE}`
      );
      const data = await response.json();
      const lastPageReached = data.page === data.total_pages;

      if (response.ok) {
        setState((prevState) => ({
          ...prevState,
          users: [...prevState.users, ...data.users],
          lastPageReached
        }));
      } else {
        setState({ ...state, error: data });
      }
    } catch (er: unknown) {
      setState({ ...state, error: er as Error });
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false
      }));
    }
  };

  const sortedUsers = [...state.users].sort(
    (a, b) => b.registration_timestamp - a.registration_timestamp
  );

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return {
    users: sortedUsers,
    loading: state.loading,
    lastPageReached: state.lastPageReached,
    increaseCurrentPage: () => setCurrentPagePage((prevPage) => prevPage + 1)
  };
};
