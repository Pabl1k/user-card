import { FC } from 'react';
import { formatPhoneNumber } from '../../common/utils';
import Avatar from '../avatar/Avatar';
import './UserCard.sass';

interface Props {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

const UserCard: FC<Props> = ({ name, email, phone, position, photo }) => {
  return (
    <div className="employee-card">
      <Avatar photoSrc={photo} />
      <span>{name}</span>

      <div className="employee-card__info">
        <span>{position}</span>
        <span>{email}</span>
        <span>{formatPhoneNumber(phone)}</span>
      </div>
    </div>
  );
};

export default UserCard;
