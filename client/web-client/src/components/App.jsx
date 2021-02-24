import React, { useEffect } from 'react';
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
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemePicker } from './ThemePicker';
import { HomePage, ErrorPage, GeoPage } from './pages';
import { ContactForm } from './pages/Contact';
import getTheme from '../theme';

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

  }));
}

export const App = () => {
  const initialThemeFromStorage = JSON.parse(localStorage.getItem('reactAppTheme'));
  const MAX_PRINTABLE_NUMBER = 99999999;
  const INTERVAL_TIME = 60000;
  const { data: numbercaseconfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
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
    badge = <Badge badgeContent="Loading" color="secondary"><LocalHospitalIcon /></Badge>;
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
            <ThemePicker
              initialDarkState={initialDarkState}
              initialColor={initialColor}
              changeThemeCallback={changeCurrentTheme}
            />
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/">
            <Redirect to="/graph" />
          </Route>
          <Route path="/graph" component={HomePage} />
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
