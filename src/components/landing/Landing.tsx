import Button from '../button/Button';
import './Landing.sass';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing_text_container">
        <h1>Test assignment for front-end developer</h1>
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
