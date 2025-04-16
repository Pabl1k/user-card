import './App.sass';
import Landing from './components/landing/Landing';
import Employees from './containers/employees/Employees';
import Header from './containers/header/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Landing />

        <Employees />
      </div>
    </div>
  );
};

export default App;
