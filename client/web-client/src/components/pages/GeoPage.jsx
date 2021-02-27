import {
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useGet } from 'restful-react';
import ReactTooltip from 'react-tooltip';
import { GeoMapIncidences } from '../graphs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5em',
  },
}));

export function GeoPage() {
  const { data: message, loading } = useGet({
    path: '/api/v0/incidences/regions',
    resolve: (resp) => resp,
  });
  const [content, setContent] = useState('');

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      )
        : <GeoMapIncidences data={message} setTooltipContent={setContent} />}
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}
