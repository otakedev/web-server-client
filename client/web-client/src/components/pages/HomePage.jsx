import {
  AppBar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useEffect, useState } from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { useGet } from 'restful-react';
import PropTypes from 'prop-types';
import { ChartIncidences, TableIncidences } from '../graphs';
import { Filters } from '../Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.background,
  },
  link: {
    padding: '1rem',
    '& a': {
      color: theme.palette.primary.link,
    },
  },
  filters: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '5rem',
    marginBottom: '2rem',
  },
}));

export const HomePage = ({ geolocalisation }) => {
  const { data: classAges } = useGet({ path: '/api/v0/incidences/filters/class-age' });

  const [data, setData] = useState(undefined);

  useEffect(() => {
    const to = new Date();
    const since = new Date();
    since.setMonth(to.getMonth() - 1);
    since.setHours(0, 0, 0);
    to.setHours(0, 0, 0);
    if (geolocalisation) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0/incidences?since=${since}&to=${to}&reg=${geolocalisation}`)
        .then((response) => response.json())
        .then((d) => {
          setData(d);
        });
    } else {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0/incidences?since=${since}&to=${to}`)
        .then((response) => response.json())
        .then((d) => {
          setData(d);
        });
    }
  }, [geolocalisation]);

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
      <div className={classes.filters}>
        {classAges ? (
          <Filters
            geolocalisation={geolocalisation}
            classAgesProps={classAges}
            setData={setData}
          />
        ) : null}
      </div>
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${url}/chart`} />
        </Route>
        <Route exact path={`${path}/table`}>
          {data ? <TableIncidences data={data} /> : null}
        </Route>
        <Route exact path={`${path}/chart`}>
          {data ? <ChartIncidences data={data} /> : null}
        </Route>
        <Redirect to="/error" />
      </Switch>

    </div>
  );
};

HomePage.propTypes = {
  geolocalisation: PropTypes.number,
};

HomePage.defaultProps = {
  geolocalisation: null,
};
