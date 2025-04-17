import { FC } from 'react';
import './Radio.sass';

interface Props {
  id: string;
  checked: boolean;
  label: string;
  onSelect: (selectedId: string) => void;
}

const Radio: FC<Props> = ({ id, checked, label, onSelect }) => {
  return (
    <label className="radio">
      <input type="radio" checked={checked} onChange={() => onSelect(id)} />
      <span className="radio__dot" />
      <span className="radio__title">{label}</span>
    </label>
  );
};

export default Radio;
