import logo from '../../assets/logo.svg';
import Button from '../../components/button/Button';
import './Header.sass';

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} alt="logo" />
        <div className="header__buttons">
          <Button label="Users" />
          <Button label="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default Header;
