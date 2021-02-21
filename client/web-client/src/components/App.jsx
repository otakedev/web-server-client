import {
  AppBar,
  makeStyles, Tooltip, IconButton,
  Badge, Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { useGet } from 'restful-react';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
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

  IconButton: {
    marginRight: '2rem',
  },

}));

export const App = () => {
  const { data: numbercaseconfirm } = useGet({ path: 'api/v0/case-confirm' });
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
          <Tooltip title="Nombre de cas hospitalisés en France">
            <IconButton aria-label="icon button" color="inherit" className={classes.IconButton}>
              <Badge badgeContent={numbercaseconfirm} max={99999999} color="secondary">
                <LocalHospitalIcon />
              </Badge>
            </IconButton>
          </Tooltip>
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
