import {
  AppBar,
  makeStyles, Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import {
  BrowserRouter, Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { HomePage, ErrorPage, GeoPage } from './pages';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.default,
  },

  link: {
    padding: '1rem',
    '& a': {
      color: theme.palette.text.light,
    },
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>

      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.link}>
            <Link to="/graph">Graphes</Link>
          </Typography>
          <Typography variant="h6" className={classes.link}>
            <Link to="/map">Carte par régions</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Redirect to="/graph" />
        </Route>
        <Route path="/graph" component={HomePage} />
        <Route path="/map" component={GeoPage} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="*">
          <Redirect to="/error" />
        </Route>
      </Switch>

    </BrowserRouter>
  );
};
