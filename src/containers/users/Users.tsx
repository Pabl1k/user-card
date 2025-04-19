import { FC } from 'react';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import UserCard from '../../components/userCard/UserCard';
import { UsersListReturn } from '../../hooks/useUsersList';
import './Users.sass';

interface Props {
  usersList: UsersListReturn;
}

const Users: FC<Props> = ({ usersList }) => {
  const { users, loading, lastPageReached, increaseCurrentPage } = usersList;

  return (
    <>
      <div className="employees_list">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        !lastPageReached && <Button label="Show more" onClick={increaseCurrentPage} />
      )}
    </>
  );
};

export default Users;
