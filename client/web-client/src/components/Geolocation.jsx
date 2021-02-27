import { makeStyles, Tooltip, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import useGeolocation from 'react-hook-geolocation';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { mapNameRegionToCode } from '../res/mapNameRegionToCode';

const useStyles = makeStyles((theme) => ({

  PointerWith: {
    stroke: 'white',
    strokeWidth: '1',
    color: theme.palette.primary.main,
  },

}));

let nbGeolocateClicks = 0;

export const Geolocation = ({ setGeoFunction }) => {
  const geolocation = useGeolocation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentRegion, setcurrentRegion] = useState(null);
  let pointer;
  let GeoLocPrefUser = localStorage.getItem('GeoLocFilter');

  if (GeoLocPrefUser === 'false') {
    GeoLocPrefUser = false;
  } else if (GeoLocPrefUser === 'true') {
    GeoLocPrefUser = true;
  }

  if (currentRegion) {
    pointer = <RoomIcon />;
  } else {
    pointer = <RoomIcon className={classes.PointerWith} />;
  }
  const getCodeFromRegionName = (nameRegion) => {
    return mapNameRegionToCode[nameRegion];
  };

  useEffect(() => {
    if (geolocation.longitude && geolocation.latitude && GeoLocPrefUser) {
      fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${geolocation.longitude.toString()}&lat=${geolocation.latitude.toString()}&type=street`).then((response) => response.json()).then((data) => {
        const codeReg = getCodeFromRegionName(data.features[0].properties.context.split(',')[2].trim());
        setcurrentRegion(codeReg);
        setGeoFunction(codeReg);
      });
    }
  }, [geolocation]);

  const Geolocate = () => {
    nbGeolocateClicks += 1;
    if (!currentRegion) {
      if (geolocation.longitude && geolocation.latitude) {
        fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${geolocation.longitude.toString()}&lat=${geolocation.latitude.toString()}&type=street`).then((response) => response.json()).then((data) => {
          const codeReg = getCodeFromRegionName(data.features[0].properties.context.split(',')[2].trim());
          setcurrentRegion(codeReg);
          setGeoFunction(codeReg);
        });
      }
      localStorage.setItem('GeoLocFilter', true);
    } else {
      localStorage.setItem('GeoLocFilter', false);
      setcurrentRegion(null);
      setGeoFunction(null);
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
      <Tooltip title="Utiliser la géolocalisation">
        <IconButton aria-label="icon button" onClick={() => Geolocate()} color="inherit" className={classes.IconButton}>
          {pointer}
        </IconButton>
      </Tooltip>

    </div>

  );
};

Geolocation.propTypes = {
  setGeoFunction: PropTypes.func,
};

Geolocation.defaultProps = {
  setGeoFunction: null,
};
