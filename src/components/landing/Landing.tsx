import Button from '../button/Button';
import Title from '../title/Title';
import './Landing.sass';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing_text_container">
        <Title>Test assignment for front-end developer</Title>
        <span>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS
          with a vast understanding of User design thinking as they'll be building web interfaces
          with accessibility in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </span>
      </div>
      <Button label="Sign up" />
    </div>
  );
};

export default Landing;
