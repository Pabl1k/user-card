import { FC } from 'react';
import Avatar from '../avatar/Avatar';
import './UserCard.sass';

interface Props {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

const formatPhoneNumber = (phoneNumber?: string) => {
  const match = phoneNumber && phoneNumber.match(/^\+(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (!match) {
    return phoneNumber;
  }

  const [, code, operator, part1, part2, part3] = match;
  return `+${code} (${operator}) ${part1} ${part2} ${part3}`;
};

const UserCard: FC<Props> = ({ name, email, phone, position, photo }) => {
  return (
    <div className="employeeCard">
      <Avatar photoSrc={photo} />
      <span>{name}</span>

      <div className="employeeCard_info">
        <span>{position}</span>
        <span>{email}</span>
        <span>{formatPhoneNumber(phone)}</span>
      </div>
    </div>
  );
};

export default UserCard;
