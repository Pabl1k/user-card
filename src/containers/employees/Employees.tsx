import Button from '../../components/button/Button';
import EmployeeCard from '../../components/employeeCard/EmployeeCard';
import './Employees.sass';

const Employees = () => {
  const employeeTest = {
    id: '30',
    name: 'Angel',
    email: 'angel.williams@example.com',
    phone: '+380496540023',
    position: 'Designer',
    position_id: '4',
    registration_timestamp: 1537777441,
    photo: 'https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg'
  };

  return (
    <>
      <div className="employees_list">
        <EmployeeCard
          name={employeeTest.name}
          position={employeeTest.position}
          email={employeeTest.email}
          phone={employeeTest.phone}
          photo={employeeTest.photo}
        />
      </div>

      <Button label="Show more" />
    </>
  );
};

export default Employees;
