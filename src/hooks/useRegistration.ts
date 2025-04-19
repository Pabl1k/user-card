import { useEffect, useState } from 'react';
import { getPositions, registerUser } from '../api/endpoints';
import { CreateUserData, Position } from '../api/types';

interface NewUserData {
  name: string;
  email: string;
  phone: string;
  positionId: number | null;
  image: File | null;
}

type FieldName = keyof NewUserData;
type InputFieldName = 'name' | 'email' | 'phone';

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

const isButtonDisabled = (userData: NewUserData) => Object.values(userData).some((value) => !value);

export const useRegistration = (onRegistration: () => Promise<void>) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [newUserData, setNewUserData] = useState(initialUserData);

  const handleChange =
    <K extends FieldName>(fieldName: K) =>
    (newValue: NewUserData[K]) => {
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
      phone: newUserData.phone.replace(/(?!^\+)[^\d-]/g, ''),
      position_id: newUserData.positionId,
      photo: newUserData.image
    };

    const newUser = await registerUser(params);

    if (newUser?.success) {
      await onRegistration();
    }

    setNewUserData({ ...initialUserData, positionId: positions[0]?.id || null });
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
    handleChange,
    handleSignUp,
    isButtonDisabled
  };
};
