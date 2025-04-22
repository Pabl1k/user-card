import { useState } from 'react';
import { InputFieldName } from './useRegistration';

const RFC2822FormatRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const initialErrors = {
  name: '',
  email: '',
  phone: ''
};

const errorMapper = {
  required: 'Field is required.',
  name: 'Username should contain 2-60 characters.',
  email: 'Invalid email format.',
  phone: 'The phone format is invalid.'
};

const isValid = (fieldName: InputFieldName, value: string) => {
  const clearedPhoneNumber = value.replace(/[^\d]/g, '');

  if (fieldName === 'name') {
    return value.length >= 2 && value.length <= 60;
  }

  if (fieldName === 'email') {
    return RFC2822FormatRegex.test(value);
  }

  return clearedPhoneNumber.length === 12 && clearedPhoneNumber.startsWith('380');
};

export const useValidation = () => {
  const [errors, setErrors] = useState<Record<InputFieldName, string>>(initialErrors);

  const errorExist = Object.values(errors).some((error) => error);

  const validateField = (fieldName: InputFieldName, value: string) => {
    if (!value) {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: errorMapper.required
      }));
      return;
    }

    if (isValid(fieldName, value)) {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: ''
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [fieldName]: errorMapper[fieldName]
      }));
    }
  };

  return {
    errors,
    errorExist,
    validateField
  };
};
