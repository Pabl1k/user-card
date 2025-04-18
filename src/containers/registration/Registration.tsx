import { useEffect, useState } from 'react';
import { getPositions, registerUser } from '../../api/endpoints';
import { CreateUserData, Position } from '../../api/types';
import { formatPhoneNumber } from '../../common/utils';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Radio from '../../components/radio/Radio';
import Uploader from '../../components/uploader/Uploader';
import './Registration.sass';

interface UserData {
  name: string;
  email: string;
  phone: string;
  positionId: number | null;
  image: File | null;
}

type FieldName = keyof UserData;

interface Field {
  id: 'name' | 'email' | 'phone';
  label: string;
  helperText?: string;
}

const fields: Field[] = [
  { id: 'name', label: 'Your name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', helperText: '+38 (XXX) XXX - XX - XX' }
];

const initialUserData: UserData = {
  name: '',
  email: '',
  phone: '',
  positionId: null,
  image: null
};

const isButtonDisabled = (userData: UserData) => Object.values(userData).some((value) => !value);

const Registration = () => {
  const [positions, setPositions] = useState<Position[]>([]);
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

  const handleSignUp = async () => {
    if (!newUserData.image || !newUserData.positionId) {
      return;
    }

    const params: CreateUserData = {
      name: newUserData.name,
      email: newUserData.email,
      phone: newUserData.phone,
      position_id: newUserData.positionId,
      photo: newUserData.image
    };

    const newUser = await registerUser(params);

    if (newUser?.success) {
      // update list
    }
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getPositions();

        if (data.success) {
          setPositions(data.positions);
          setNewUserData((prevState) => ({
            ...prevState,
            positionId: data.positions[0].id
          }));
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchPositions();
  }, []);

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
        <Button label="Sign up" disabled={isButtonDisabled(newUserData)} onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default Registration;
