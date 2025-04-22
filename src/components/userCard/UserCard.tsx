import { FC, memo } from 'react';
import { formatPhoneNumber } from '../../common/utils';
import Avatar from '../avatar/Avatar';
import Tooltip from '../tooltip/Tooltip';
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
      <Tooltip text={name}>
        <span>{name}</span>
      </Tooltip>

      <div className="employee-card__info">
        <span>{position}</span>
        <Tooltip text={email}>
          <span>{email}</span>
        </Tooltip>
        <span>{formatPhoneNumber(phone)}</span>
      </div>
    </div>
  );
};

export default memo(UserCard);
