import './App.sass';
import Landing from './components/landing/Landing';
import Employees from './containers/employees/Employees';
import Header from './containers/header/Header';
import Section from './containers/section/Section';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Landing />
      <div className="content">
        <Section title="Working with GET request">
          <Employees />
        </Section>
      </div>
    </div>
  );
};

export default App;
