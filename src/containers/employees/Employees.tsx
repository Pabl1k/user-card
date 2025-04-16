import { useApi } from '../../api/useApi';
import Button from '../../components/button/Button';
import EmployeeCard from '../../components/employeeCard/EmployeeCard';
import './Employees.sass';

const Employees = () => {
  const { users, lastPageReached, increaseCurrentPage } = useApi();

  return (
    <>
      <div className="employees_list">
        {users.map((user) => (
          <EmployeeCard
            key={user.id}
            name={user.name}
            position={user.position}
            email={user.email}
            phone={user.phone}
            photo={user.photo}
          />
        ))}
      </div>

      {!lastPageReached && <Button label="Show more" onClick={increaseCurrentPage} />}
    </>
  );
};

export default Employees;
