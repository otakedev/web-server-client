import { useGet } from 'restful-react';
import React, { useEffect } from 'react';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {
  Badge, IconButton, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({

  IconButton: {
    marginRight: '2rem',
    cursor: 'default',
  },

}));

export const ConfirmedCases = () => {
  const { data: numberCaseConfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
  const MAX_PRINTABLE_NUMBER = 99999999;
  const INTERVAL_TIME = 60000;

  const classes = useStyles();

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
    badge = <Badge badgeContent={numberCaseConfirm} max={MAX_PRINTABLE_NUMBER} color="secondary"><LocalHospitalIcon /></Badge>;
  }

  return (
    <IconButton aria-label="icon button" color="inherit" className={classes.IconButton}>
      {badge}
    </IconButton>
  );
};
