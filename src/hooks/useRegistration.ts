import { useEffect, useState } from 'react';
import { getPositions, registerUser } from '../api/endpoints';
import { CreateUserData, Position } from '../api/types';
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
  helperText?: string;
}

const inputFields: Field[] = [
  { id: 'name', label: 'Your name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', helperText: '+38 (XXX) XXX - XX - XX' }
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

  const handleChange =
    <K extends FieldName>(fieldName: K) =>
    (newValue: NewUserData[K]) => {
      setNewUserData((prevState) => ({
        ...prevState,
        [fieldName]:
          fieldName === 'phone' ? (newValue as string).replace(/[a-zA-Z]/g, '') : newValue
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
      phone: newUserData.phone.replace(/(?!^\+)[^\d-]/g, ''),
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
