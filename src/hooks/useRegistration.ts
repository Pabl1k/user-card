import { useEffect, useState } from 'react';
import { getPositions, registerUser } from '../api/endpoints';
import { CreateUserData, Position } from '../api/types';
import { clearPhoneNumber } from '../common/utils';
import { InputMode } from '../components/input/Input';
import { useValidation } from './useValidation';

export interface NewUserData {
  name: string;
  email: string;
  phone: string;
  positionId: number | null;
  image: File | null;
}

type FieldName = keyof NewUserData;
export type InputFieldName = 'name' | 'email' | 'phone';

export interface Field {
  id: InputFieldName;
  label: string;
  type: InputMode;
  helperText?: string;
}

const inputFields: Field[] = [
  { id: 'name', label: 'Your name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel', helperText: '+38 (XXX) XXX - XX - XX' }
];

const initialUserData: NewUserData = {
  name: '',
  email: '',
  phone: '',
  positionId: null,
  image: null
};

export const useRegistration = (onRegistration: () => Promise<void>) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [newUserData, setNewUserData] = useState(initialUserData);
  const { errors, errorExist, validateField } = useValidation();

  const isButtonDisabled = (userData: NewUserData) =>
    Object.values(userData).some((value) => !value) || errorExist;

  const handlePhoneNumberEnter = (value: string) => {
    if (!value) {
      return '';
    }

    const digits = value.replace(/[a-zA-Z]/g, '');
    return value.startsWith('+') ? digits : `+${digits}`;
  };

  const handleChange =
    <K extends FieldName>(fieldName: K) =>
    (newValue: NewUserData[K]) => {
      setNewUserData((prevState) => ({
        ...prevState,
        [fieldName]: fieldName === 'phone' ? handlePhoneNumberEnter(newValue as string) : newValue
      }));
    };

  const handleInputChange = (fieldName: InputFieldName) => (newValue: string) => {
    handleChange(fieldName)(newValue);
    validateField(fieldName, newValue);
  };

  const handleSignUp = async () => {
    if (!newUserData.image || !newUserData.positionId) {
      return;
    }

    const params: CreateUserData = {
      name: newUserData.name,
      email: newUserData.email,
      phone: clearPhoneNumber(newUserData.phone),
      position_id: newUserData.positionId,
      photo: newUserData.image
    };

    const newUser = await registerUser(params);

    if (newUser?.success) {
      setNewUserData({ ...initialUserData, positionId: positions[0]?.id || null });
      await onRegistration();
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

  return {
    positions,
    newUserData,
    inputFields,
    errors,
    handleChange,
    handleInputChange,
    handleSignUp,
    isButtonDisabled
  };
};
