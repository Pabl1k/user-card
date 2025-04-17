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
  const helperTextValue = errorText ?? helperText;

  return (
    <div className={`input-group ${errorText ? 'input-group-error' : ''}`}>
      <input required autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      <label htmlFor={label}>{label}</label>
      {helperTextValue && <span className="helper-text">{helperTextValue}</span>}
    </div>
  );
};

export default Input;
