import { RefObject, useRef } from 'react';
import './App.sass';
import Landing from './components/landing/Landing';
import Header from './containers/header/Header';
import Registration from './containers/registration/Registration';
import Section from './containers/section/Section';
import Users from './containers/users/Users';
import { useUsersList } from './hooks/useUsersList';

const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
  if (!ref.current) {
    return;
  }

  window.scrollTo({
    top: ref.current.offsetTop,
    left: 0,
    behavior: 'smooth'
  });
};

const App = () => {
  const usersList = useUsersList();
  const usersSectionRef = useRef<HTMLDivElement>(null);
  const registrationSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app">
      <Header
        onUsersClick={() => scrollToSection(usersSectionRef)}
        onSignUpClick={() => scrollToSection(registrationSectionRef)}
      />
      <Landing onSignUpClick={() => scrollToSection(registrationSectionRef)} />
      <div className="app__content">
        <Section ref={usersSectionRef} title="Working with GET request">
          <Users usersList={usersList} />
        </Section>

        <Section ref={registrationSectionRef} title="Working with POST request">
          <Registration onRegistration={usersList.updateUsers} />
        </Section>
      </div>
    </div>
  );
};

export default App;
