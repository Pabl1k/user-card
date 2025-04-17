import clsx from 'clsx';
import { FC } from 'react';
import './Input.sass';

interface Props {
  label: string;
  value: string;
  helperText?: string;
  errorText?: string;
  onChange: (newValue: string) => void;
}

const Input: FC<Props> = ({ label, value, helperText, errorText, onChange }) => {
  const helperTextValue = errorText || helperText;

  return (
    <div>
      <div className={clsx('input', errorText && 'input--error')}>
        <input
          required
          autoComplete="off"
          className="input__field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor={label} className="input__label">
          {label}
        </label>
      </div>
      {helperTextValue && <span className="input__helper-text">{helperTextValue}</span>}
    </div>
  );
};

export default Input;
