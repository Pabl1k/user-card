import { useUsersList } from '../../api/useUsersList';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import UserCard from '../../components/userCard/UserCard';
import './Users.sass';

const Users = () => {
  const { users, loading, lastPageReached, increaseCurrentPage } = useUsersList();

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
