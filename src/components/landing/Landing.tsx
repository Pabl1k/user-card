import { FC } from 'react';
import Button from '../button/Button';
import Title from '../title/Title';
import './Landing.sass';

interface Props {
  onSignUpClick: () => void;
}

const Landing: FC<Props> = ({ onSignUpClick }) => {
  return (
    <div className="landing">
      <div className="landing__text-container">
        <Title>Test assignment for front-end developer</Title>
        <span>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
          with a vast understanding of User design thinking as they'll be building web interfaces
          with accessibility in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </span>
      </div>
      <Button label="Sign up" onClick={onSignUpClick} />
    </div>
  );
};

export default Landing;
