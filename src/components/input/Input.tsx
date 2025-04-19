import clsx from 'clsx';
import { FC } from 'react';
import './Input.sass';

interface Props {
  label: string;
  value: string;
  helperText?: string;
  errorText?: string;
  onBlur: () => void;
  onChange: (newValue: string) => void;
}

const Input: FC<Props> = ({ label, value, helperText, errorText, onBlur, onChange }) => {
  const helperTextValue = errorText || helperText;

  return (
    <div className={clsx(errorText && 'input--error')}>
      <div className="input">
        <input
          required
          autoComplete="off"
          className="input__field"
          value={value}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor={label} className="input__label">
          {label}
        </label>
      </div>
      <span className="input__helper-text">{helperTextValue}</span>
    </div>
  );
};

export default Input;
