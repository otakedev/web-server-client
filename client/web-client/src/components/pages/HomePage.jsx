import {
  AppBar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { useGet } from 'restful-react';
import { ChartIncidences, GeoMapIncidences, TableIncidences } from '../graphs';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  link: {
    padding: '1rem',
    '& a': {
      color: theme.palette.text.default,
    },
  },
}));

export function HomePage() {
  const { data: message } = useGet({ path: '/incidences' });

  const classes = useStyles();

  const { path, url } = useRouteMatch();
  return (
    <div className={classes.root}>

      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.link}>
            <Link to={`${url}/table`}>Tableau</Link>
          </Typography>
          <Typography variant="h6" className={classes.link}>
            <Link to={`${url}/chart`}>Chart</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${url}/chart`} />
        </Route>
        <Route exact path={`${path}/table`}>
          {message ? <TableIncidences data={message} /> : null}
        </Route>
        <Route exact path={`${path}/chart`}>
          {message ? <ChartIncidences data={message} /> : null}
        </Route>
        <Redirect to="/error" />
      </Switch>

    </div>
  );
}
