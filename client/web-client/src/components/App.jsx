import {
  AppBar,
  makeStyles, Tooltip, IconButton,
  Badge, Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { useGet } from 'restful-react';
import React, { useEffect, useState } from 'react';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RoomIcon from '@material-ui/icons/Room';
import {
  BrowserRouter, Link, Redirect, Route, Switch,
} from 'react-router-dom';
import useGeolocation from 'react-hook-geolocation';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HomePage, ErrorPage, GeoPage } from './pages';
import { mapNameRegionToCode } from '../res/mapNameRegionToCode';
import { ThemePicker } from './ThemePicker';
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
let nbGeolocateClicks = 0;

export const App = () => {
  const { data: numbercaseconfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
  const initialThemeFromStorage = JSON.parse(localStorage.getItem('reactAppTheme'));
  const [currentRegion, setcurrentRegion] = useState(null);
  const [open, setOpen] = React.useState(true);

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

  const geolocation = useGeolocation();
  let GeoLocPrefUser = localStorage.getItem('GeoLocFilter');
  if (GeoLocPrefUser === 'false') {
    GeoLocPrefUser = false;
  } else if (GeoLocPrefUser === 'true') {
    GeoLocPrefUser = true;
  }

  const getCodeFromRegionName = (nameRegion) => {
    return mapNameRegionToCode[nameRegion];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, INTERVAL_TIME);

    if (geolocation.longitude && geolocation.latitude && GeoLocPrefUser) {
      fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${geolocation.longitude.toString()}&lat=${geolocation.latitude.toString()}&type=street`).then((response) => response.json()).then((data) => {
        setcurrentRegion(getCodeFromRegionName(data.features[0].properties.context.split(',')[2].trim()));
      });
    }
    return () => clearInterval(interval);
  }, [geolocation]);

  let badge;
  if (loading) {
    badge = <Badge badgeContent="Loading" color="primary"><LocalHospitalIcon /></Badge>;
  } else {
    badge = <Badge badgeContent={numbercaseconfirm} max={MAX_PRINTABLE_NUMBER} color="secondary"><LocalHospitalIcon /></Badge>;
  }

  let pointer;
  if (currentRegion) {
    pointer = <RoomIcon />;
  } else {
    pointer = <RoomIcon className={classes.PointerWith} />;
  }

  const Geolocate = () => {
    nbGeolocateClicks += 1;
    if (geolocation.longitude && geolocation.latitude && !currentRegion) {
      localStorage.setItem('GeoLocFilter', true);

      fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${geolocation.longitude.toString()}&lat=${geolocation.latitude.toString()}&type=street`).then((response) => response.json()).then((data) => {
        setcurrentRegion(getCodeFromRegionName(data.features[0].properties.context.split(',')[2].trim()));
      });
    } else {
      localStorage.setItem('GeoLocFilter', false);
      setcurrentRegion(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const activateGeo = () => {
    Geolocate();
    handleClose();
  };

  const action = (
    <Button onClick={() => activateGeo()} color="primary" size="small">
      Oui
    </Button>
  );

  return (
    <div>
      {!GeoLocPrefUser && nbGeolocateClicks === 0 ? (
        <Snackbar
          message="Filtrer les données pour votre région "
          open={open}
          onClose={handleClose}
          autoHideDuration={8000}
          action={action}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        />
      ) : null}
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
              <Tooltip title="Utiliser la géolocalisation">
                <IconButton aria-label="icon button" onClick={() => Geolocate()} color="inherit" className={classes.IconButton}>
                  {pointer}
                </IconButton>
              </Tooltip>
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
                <HomePage geolocalisation={currentRegion} />
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
    </div>

  );
};
