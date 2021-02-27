import {
  AppBar,
  makeStyles, Tooltip, IconButton,
  Badge, Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { useGet } from 'restful-react';
import React, { useEffect, useState } from 'react';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {
  BrowserRouter, Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HomePage, ErrorPage, GeoPage } from './pages';
import { ThemePicker } from './ThemePicker';
import { ContactForm } from './pages/Contact';
import getTheme from '../theme';
import { Geolocation } from './Geolocation';

function useStyles(theme) {
  return makeStyles(() => ({
    root: {
      textAlign: 'center',
      flexGrow: 1,
      backgroundColor: theme.palette.primary.navbar,
      display: 'flex',
    },

    link: {
      padding: '1rem',
      '& a': {
        color: theme.palette.primary.link,
      },
    },

    IconButton: {
      marginRight: '2rem',
      cursor: 'default',
    },

    PointerWith: {
      stroke: 'white',
      strokeWidth: '1',
      color: theme.palette.primary.navbar,
    },

    Container: {
      display: 'flex',
    },

  }));
}

export const App = () => {
  const { data: numbercaseconfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
  const initialThemeFromStorage = JSON.parse(localStorage.getItem('reactAppTheme'));
  const [currentRegion, setcurrentRegion] = useState(null);

  const MAX_PRINTABLE_NUMBER = 99999999;
  const INTERVAL_TIME = 60000;
  let initialColor;
  let initialDarkState;
  let initialTheme;
  if (initialThemeFromStorage !== null) {
    initialColor = initialThemeFromStorage.color;
    initialDarkState = initialThemeFromStorage.isDark;
    initialTheme = getTheme(initialColor, initialDarkState);
  } else {
    initialColor = 'blue';
    initialDarkState = false;
    initialTheme = getTheme(initialColor, initialDarkState);
  }

  const [currentTheme, setCurrentTheme] = React.useState(initialTheme);
  const classes = useStyles(initialTheme)();

  const changeCurrentTheme = (theme) => {
    setCurrentTheme(theme);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, INTERVAL_TIME);

    return () => clearInterval(interval);
  }, []);

  let badge;
  if (loading) {
    badge = <Badge badgeContent="Loading" color="primary"><LocalHospitalIcon /></Badge>;
  } else {
    badge = <Badge badgeContent={numbercaseconfirm} max={MAX_PRINTABLE_NUMBER} color="secondary"><LocalHospitalIcon /></Badge>;
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" className={classes.link}>
              <Link to="/graph">Graphes</Link>
            </Typography>
            <Typography variant="h6" className={classes.link}>
              <Link to="/map">Carte par régions</Link>
            </Typography>
            <Typography variant="h6" className={classes.link}>
              <Link to="/contact">Contact</Link>
            </Typography>
            <Tooltip title="Nombre de cas hospitalisés en France">
              <IconButton aria-label="icon button" color="inherit" className={classes.IconButton}>
                {badge}
              </IconButton>
            </Tooltip>
            <Geolocation setGeoFunction={setcurrentRegion} theme={currentTheme} />
          </Toolbar>
          <ThemePicker
            initialDarkState={initialDarkState}
            initialColor={initialColor}
            changeThemeCallback={changeCurrentTheme}
          />
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Redirect to="/graph" />
          </Route>
          <Route
            path="/graph"
            render={() => (
              <HomePage geolocation={currentRegion} />
            )}
          />
          <Route path="/map" component={GeoPage} />
          <Route path="/contact" component={ContactForm} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};
