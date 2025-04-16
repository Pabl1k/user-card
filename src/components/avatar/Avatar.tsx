import { FC, SyntheticEvent } from 'react';
import avatarImage from '../../assets/avatar.svg';
import './Avatar.sass';

interface Props {
  photoSrc: string;
}

const Avatar: FC<Props> = ({ photoSrc }) => {
  const handleDefaultAvatar = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = avatarImage;
  };

  return <img className="avatar" src={photoSrc} alt="avatar" onError={handleDefaultAvatar} />;
};

export default Avatar;
