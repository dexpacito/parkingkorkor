import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './pages/loginpage';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="menuBar">
          <div className="leftContent">
            <h1>parkingkorkor Menu Bar WIP!</h1>
          </div>
          <div className="rightContent">
            <Link to="pages/loginpage">Log In</Link>
            <button>Sign Up</button>
          </div>
        </div>
        <Switch>
          <Route path="./pages/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

