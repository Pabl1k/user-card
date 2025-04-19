import { useState } from 'react';
import { InputFieldName, NewUserData } from './useRegistration';

const RFC2822FormatRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const initialErrors = {
  name: '',
  email: '',
  phone: ''
};

const errorMapper = {
  name: 'Username should contain 2-60 characters.',
  email: 'Invalid email format.',
  phone: 'The phone format is invalid.'
};

export const useValidation = (state: NewUserData) => {
  const [errors, setErrors] = useState<Record<InputFieldName, string>>(initialErrors);

  const errorExist = Object.values(errors).some((error) => error);

  const isValid = (fieldName: InputFieldName) => {
    if (fieldName === 'name') {
      return state.name.length >= 2 && state.name.length <= 60;
    }

    if (fieldName === 'email') {
      return RFC2822FormatRegex.test(state.email);
    }

    return state.phone.startsWith('+380');
  };

  const validateField = (fieldName: InputFieldName) => {
    if (isValid(fieldName)) {
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
