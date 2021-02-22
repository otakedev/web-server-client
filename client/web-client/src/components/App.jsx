import {
  AppBar,
  makeStyles, Tooltip, IconButton,
  Badge, Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { useGet } from 'restful-react';
import { useEffect } from 'react';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RoomIcon from '@material-ui/icons/Room';
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
    cursor: 'default',
  },

}));

export const App = () => {
  const { data: numbercaseconfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
  const classes = useStyles();

  const MAX_PRINTABLE_NUMBER = 99999999;
  const INTERVAL_TIME = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

  let badge;
  if (loading) {
    badge = <Badge badgeContent="Loading" color="secondary"><LocalHospitalIcon /></Badge>;
  } else {
    badge = <Badge badgeContent={numbercaseconfirm} max={MAX_PRINTABLE_NUMBER} color="secondary"><LocalHospitalIcon /></Badge>;
  }

  const Geolocate = () => {
    if ('geolocation' in navigator) {
      console.log('Available');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      }, (error) => {
        console.log(error);
      }, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
    } else {
      console.log('Not Available');
    }
  };

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
              {badge}
            </IconButton>
          </Tooltip>
          <Tooltip title="Utiliser la géolocalisation">
            <IconButton aria-label="icon button" onClick={() => Geolocate()} color="inherit" className={classes.IconButton}>
              <RoomIcon />
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
