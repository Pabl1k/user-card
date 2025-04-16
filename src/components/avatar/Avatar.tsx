import { FC, SyntheticEvent } from 'react';
import avatarImage from '../../assets/avatar.svg';

interface Props {
  photoSrc: string;
}

const Avatar: FC<Props> = ({ photoSrc }) => {
  const handleDefaultAvatar = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = avatarImage;
  };

  return (
    <div className="avatar">
      <img src={photoSrc} alt="avatar" onError={handleDefaultAvatar} />
    </div>
  );
};

export default Avatar;
