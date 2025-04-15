import { FC } from 'react';
import './Button.sass';

interface Props {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = ({ label, disabled = false, onClick }) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
