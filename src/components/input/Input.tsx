import clsx from 'clsx';
import { FC } from 'react';
import './Input.sass';

export type InputMode = 'text' | 'email' | 'tel';

interface Props {
  label: string;
  value: string;
  helperText?: string;
  errorText?: string;
  inputMode?: InputMode;
  onChange: (newValue: string) => void;
}

const Input: FC<Props> = ({
  label,
  value,
  helperText,
  errorText,
  inputMode = 'text',
  onChange
}) => {
  const helperTextValue = errorText || helperText;

  return (
    <div className={clsx(errorText && 'input--error')}>
      <div className="input">
        <input
          required
          autoComplete="off"
          className="input__field"
          inputMode={inputMode}
          value={value}
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
