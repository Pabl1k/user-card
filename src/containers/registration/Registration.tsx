import { useState } from 'react';
import { usePositions } from '../../api/usePositions';
import { formatPhoneNumber } from '../../common/utils';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Radio from '../../components/radio/Radio';
import Uploader from '../../components/uploader/Uploader';
import './Registration.sass';

interface UserData {
  userName: string;
  email: string;
  phone: string;
  positionId: number | null;
  image: Blob | null;
}

type FieldName = keyof UserData;

interface Field {
  id: 'userName' | 'email' | 'phone';
  label: string;
  helperText?: string;
}

const fields: Field[] = [
  { id: 'userName', label: 'Your name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', helperText: '+38 (XXX) XXX - XX - XX' }
];

const initialUserData: UserData = {
  userName: '',
  email: '',
  phone: '',
  positionId: null,
  image: null
};

const Registration = () => {
  const { positions } = usePositions();
  const [newUserData, setNewUserData] = useState(initialUserData);

  const handleChange =
    <K extends FieldName>(fieldName: K) =>
    (newValue: UserData[K]) => {
      setNewUserData((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'phone' ? (newValue as string).replace(/(?!^\+)[^\d-]/g, '') : newValue
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
            const checked = newUserData.positionId ? newUserData.positionId === id : index === 0;

            return (
              <Radio
                key={id}
                id={id}
                checked={checked}
                label={name}
                onSelect={handleChange('positionId')}
              />
            );
          })}
        </div>
      </div>

      <div className="registration__uploader-container">
        <Uploader onUpload={handleChange('image')} />
      </div>

      <div className="registration__button-container">
        <Button label="Sign up" disabled={true} onClick={() => console.log('')} />
      </div>
    </div>
  );
};

export default Registration;
