import './App.sass';
import Landing from './components/landing/Landing';
import Header from './containers/header/Header';
import Registration from './containers/registration/Registration';
import Section from './containers/section/Section';
import Users from './containers/users/Users';
import { useUsersList } from './hooks/useUsersList';

const App = () => {
  const usersList = useUsersList();

  return (
    <div className="app">
      <Header />
      <Landing />
      <div className="app__content">
        <Section title="Working with GET request">
          <Users usersList={usersList} />
        </Section>

        <Section title="Working with POST request">
          <Registration onRegistration={usersList.updateUsers} />
        </Section>
      </div>
    </div>
  );
};

export default App;
