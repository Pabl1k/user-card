import { useState } from 'react';
import { usePositions } from '../../api/usePositions';
import { formatPhoneNumber } from '../../common/utils';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Radio from '../../components/radio/Radio';
import Uploader from '../../components/uploader/Uploader';
import './Registration.sass';

type FieldName = 'userName' | 'email' | 'phone';

interface Field {
  id: FieldName;
  label: string;
  helperText?: string;
}

const fields: Field[] = [
  { id: 'userName', label: 'Your name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', helperText: '+38 (XXX) XXX - XX - XX' }
];

const initialUserData: Record<FieldName, string> = {
  userName: '',
  email: '',
  phone: ''
};

const Registration = () => {
  const { positions } = usePositions();
  const [newUserData, setNewUserData] = useState(initialUserData);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);

  const handleChange = (fieldName: FieldName) => (newValue: string) => {
    setNewUserData((prevState) => ({
      ...prevState,
      [fieldName]: fieldName === 'phone' ? newValue.replace(/(?!^\+)[^\d-]/g, '') : newValue
    }));
  };

  return (
    <div className="registration">
      <div className="registration__inputs">
        {fields.map((field) => {
          const value =
            field.id === 'phone'
              ? formatPhoneNumber(newUserData.phone, '-')
              : newUserData[field.id];

          return (
            <Input
              key={field.id}
              value={value}
              label={field.label}
              helperText={field.helperText}
              onChange={handleChange(field.id)}
            />
          );
        })}
      </div>

      <div className="registration__position">
        <span>Select your position</span>
        <div className="registration__positions-list">
          {positions.map(({ id, name }, index) => {
            const checked = selectedPositionId ? selectedPositionId === id : index === 0;

            return (
              <Radio
                key={id}
                id={id}
                checked={checked}
                label={name}
                onSelect={setSelectedPositionId}
              />
            );
          })}
        </div>
      </div>

      <div className="registration__uploader-container">
        <Uploader />
      </div>

      <div className="registration__button-container">
        <Button label="Sign up" disabled={true} onClick={() => console.log('')} />
      </div>
    </div>
  );
};

export default Registration;
