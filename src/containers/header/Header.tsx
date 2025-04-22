import { FC } from 'react';
import logo from '../../assets/logo.svg';
import Button from '../../components/button/Button';
import './Header.sass';

interface Props {
  onUsersClick: () => void;
  onSignUpClick: () => void;
}

const Header: FC<Props> = ({ onUsersClick, onSignUpClick }) => {
  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} alt="logo" />
        <div className="header__buttons">
          <Button label="Users" onClick={onUsersClick} />
          <Button label="Sign up" onClick={onSignUpClick} />
        </div>
      </div>
    </div>
  );
};

export default Header;
