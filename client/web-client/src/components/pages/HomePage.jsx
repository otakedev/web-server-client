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
import { ChartIncidences, TableIncidences } from '../graphs';
import { Filters } from '../Filters';

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
  filters: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '5rem',
    marginBottom: '2rem',
  },
}));

export function HomePage() {
  const { data: classAges } = useGet({ path: '/api/v0/incidences/filters/class-age' });

  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('http://localhost:3000/api/v0/incidences')// TODO
      .then((response) => response.json())
      .then((d) => {
        setData(d);
      });
  }, []);

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
}
