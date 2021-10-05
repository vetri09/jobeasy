import Landingpage from './pages/landingpage/Landingpage'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/welcome" component={Landingpage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/profile/:username" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
