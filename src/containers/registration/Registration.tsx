import { FC } from 'react';
import { formatPhoneNumber } from '../../common/utils';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Radio from '../../components/radio/Radio';
import Uploader from '../../components/uploader/Uploader';
import { useRegistration } from '../../hooks/useRegistration';
import './Registration.sass';

interface Props {
  onRegistration: () => Promise<void>;
}

const Registration: FC<Props> = ({ onRegistration }) => {
  const { positions, newUserData, inputFields, handleChange, handleSignUp, isButtonDisabled } =
    useRegistration(onRegistration);

  return (
    <div className="registration">
      <div className="registration__inputs">
        {inputFields.map((field) => {
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
          {positions.map(({ id, name }) => {
            const checked = newUserData.positionId === id;

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
        <Uploader uploadedFileName={newUserData.image?.name} onUpload={handleChange('image')} />
      </div>

      <div className="registration__button-container">
        <Button label="Sign up" disabled={isButtonDisabled(newUserData)} onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default Registration;
