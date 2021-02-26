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
import { HomePage, ErrorPage, GeoPage } from './pages';
import { mapNameRegionToCode } from '../res/mapNameRegionToCode';

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

  PointerWith: {
    stroke: 'white',
    strokeWidth: '1',
  },

  Container: {
    display: 'flex',
  },

}));
let nbGeolocateClicks = 0;

export const App = () => {
  const { data: numbercaseconfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
  const [currentRegion, setcurrentRegion] = useState(null);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const MAX_PRINTABLE_NUMBER = 99999999;
  const INTERVAL_TIME = 60000;

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
    badge = <Badge badgeContent="Loading" color="secondary"><LocalHospitalIcon /></Badge>;
  } else {
    badge = <Badge badgeContent={numbercaseconfirm} max={MAX_PRINTABLE_NUMBER} color="secondary"><LocalHospitalIcon /></Badge>;
  }

  let pointer;
  if (currentRegion) {
    pointer = <RoomIcon color="secondary" className={classes.PointerWith} />;
  } else {
    pointer = <RoomIcon />;
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
                {pointer}
              </IconButton>
            </Tooltip>
          </Toolbar>
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
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>

      </BrowserRouter>
    </div>

  );
};
