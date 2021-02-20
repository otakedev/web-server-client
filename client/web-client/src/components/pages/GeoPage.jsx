import {
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
}));

export function GeoPage() {
  const { data: message } = useGet({ path: '/api/v0/incidences/regions' });
  const [content, setContent] = useState('');

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [content]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {message ? <GeoMapIncidences data={message} setTooltipContent={setContent} /> : null}
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}
