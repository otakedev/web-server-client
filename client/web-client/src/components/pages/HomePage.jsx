import {
  AppBar,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { useGet } from 'restful-react';
import { ChartIncidences, TableIncidences, Filters } from '../graphs';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.background,
  },
  link: {
    padding: '1rem',
    '& a': {
      color: '#ffffff',
    },
  },
  filters: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '5rem',
    marginBottom: '2rem',
  },
}));

export function HomePage({ geolocation }) {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  const { data: classAges } = useGet({ path: '/api/v0/incidences/filters/class-age' });

  const to = new Date();
  const since = new Date();
  since.setMonth(to.getMonth() - 1);
  since.setHours(0, 0, 0);
  to.setHours(0, 0, 0);

  const { data, loading, refetch } = useGet({
    path: '/api/v0/incidences',
    queryParams: {
      ...(geolocation) && { reg: geolocation },
      since: `${since}`,
      to: `${to}`,
    },
  });

  return (
    <div className={classes.root}>

      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.link}>
            <Link to={`${url}/table`}>Tableau</Link>
          </Typography>
          <Typography variant="h6" className={classes.link}>
            <Link to={`${url}/chart`}>Graphique</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.filters}>
        {classAges ? (
          <Filters
            geolocation={geolocation}
            classAgesProps={classAges}
            refetch={refetch}
          />
        ) : null}
      </div>
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${url}/chart`} />
        </Route>
        <Route exact path={`${path}/table`}>
          {(loading || !data) ? <CircularProgress /> : <TableIncidences data={data} />}
        </Route>
        <Route exact path={`${path}/chart`}>
          {(loading || !data) ? <CircularProgress /> : <ChartIncidences data={data} />}
        </Route>
        <Redirect to="/error" />
      </Switch>

    </div>
  );
}

HomePage.propTypes = {
  geolocation: PropTypes.number,
};

HomePage.defaultProps = {
  geolocation: null,
};
