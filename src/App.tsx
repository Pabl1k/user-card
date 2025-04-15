import './App.sass';
import Landing from './components/landing/Landing';
import Header from './containers/header/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Landing />
      </div>
    </div>
  );
};

export default App;
