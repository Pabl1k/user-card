import { FC } from 'react';
import Avatar from '../avatar/Avatar';
import './EmployeeCard.sass';

interface Props {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

const EmployeeCard: FC<Props> = ({ name, email, phone, position, photo }) => {
  return (
    <div className="employeeCard">
      <Avatar photoSrc={photo} />
      <span>{name}</span>

      <div className="employeeCard_info">
        <span>{position}</span>
        <span>{email}</span>
        <span>{phone}</span>
      </div>
    </div>
  );
};

export default EmployeeCard;
