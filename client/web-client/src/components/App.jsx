import {
  AppBar,
  IconButton, makeStyles, Tooltip,
  Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';
import {
  Link, Redirect, Route,
  Switch, useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getTheme, ThemePicker } from './theme';
import {
  ErrorPage, GeoPage,
  HomePage, ConnectionPage,
} from './pages';
import { ContactForm } from './pages/Contact';
import { Geolocation, ConfirmedCases, ResponsiveToolbarItem } from './elements';

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
    appBarRightSide: {
      display: 'flex',
      marginLeft: 'auto',
      color: 'white',
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

export const App = ({ setErrorFunc }) => {
  const initialThemeFromStorage = JSON.parse(localStorage.getItem('reactAppTheme'));
  const [currentRegion, setCurrentRegion] = useState(null);

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
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth_token'));
  const [isConnected, setIsConnected] = useState(false);
  const classes = useStyles(initialTheme)();

  const changeCurrentTheme = (theme) => {
    setCurrentTheme(theme);
  };

  const history = useHistory();
  const disconnect = () => {
    localStorage.removeItem('auth_token');
    setIsConnected(false);
    setAuthToken(false);
    history.push('/connection');
  };

  if (setErrorFunc) {
    setErrorFunc(disconnect);
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <ResponsiveToolbarItem>
            <Typography variant="h6" className={classes.link}>
              <Link to="/graph">Graphes</Link>
            </Typography>
            <Typography variant="h6" className={classes.link}>
              <Link to="/map">Carte par régions</Link>
            </Typography>
            <Typography variant="h6" className={classes.link}>
              <Link to="/contact">Contact</Link>
            </Typography>
          </ResponsiveToolbarItem>
          <ConfirmedCases />
          <Geolocation setGeoFunction={setCurrentRegion} theme={currentTheme} />
          <ThemePicker
            initialDarkState={initialDarkState}
            initialColor={initialColor}
            changeThemeCallback={changeCurrentTheme}
          />
          {authToken || isConnected
            ? (
              <Tooltip title="Se déconnecter">
                <IconButton
                  onClick={() => disconnect()}
                  className={classes.appBarRightSide}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            )
            : null }
        </Toolbar>
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
        <Route
          path="/connection"
          render={() => (
            <ConnectionPage setIsConnected={setIsConnected} />
          )}
        />
        <Route path="/contact" component={ContactForm} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="*">
          <Redirect to="/error" />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

App.propTypes = {
  setErrorFunc: PropTypes.func,
};

App.defaultProps = {
  setErrorFunc: null,
};
