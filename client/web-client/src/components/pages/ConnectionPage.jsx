import {
  makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Connect, Signup } from '../elements';

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    width: '30%',
    textAlign: 'center',
    minWidth: '20em',
  },
  connect: {
    marginBottom: '15%',
  },
  signup: {
    marginTop: '15%',
  },
}));

export function ConnectionPage({ setIsConnected }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.connect}>
        <Connect setIsConnected={setIsConnected} />
      </div>
      <Typography variant="h3">ou</Typography>
      <div className={classes.signup}>
        <Signup setIsConnected={setIsConnected} />
      </div>
    </div>
  );
}

ConnectionPage.propTypes = {
  setIsConnected: PropTypes.func,
};

ConnectionPage.defaultProps = {
  setIsConnected: null,
};
