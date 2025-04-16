import { useApi } from '../../api/useApi';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import UserCard from '../../components/userCard/UserCard';
import './Users.sass';

const Users = () => {
  const { users, loading, lastPageReached, increaseCurrentPage } = useApi();

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
