import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const Home = () => <h2>Home</h2>;

const About = () => <h2>About</h2>;

const Users = () => <h2>Users</h2>;

const NotFound = () => <h2>Error</h2>;

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
        <Route exact path="/error" component={NotFound} />
        <Redirect to="/error" />
      </Switch>
    </BrowserRouter>
  );
};
