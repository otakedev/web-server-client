import React, { useEffect } from 'react';
import {
  AppBar,
  makeStyles, Tooltip, IconButton,
  Badge, Typography,
} from '@material-ui/core';
import {
  green,
  blue,
  deepPurple,
} from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import { useGet } from 'restful-react';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Popover from '@material-ui/core/Popover';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  BrowserRouter, Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import PaletteIcon from '@material-ui/icons/Palette';
import MaterialSwitch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HomePage, ErrorPage, GeoPage } from './pages';
import getTheme from '../theme';

function useStyles(theme) {
  return makeStyles(() => ({
    root: {
      textAlign: 'center',
      flexGrow: 1,
      backgroundColor: theme.palette.primary.navbar,
      display: 'flex',
    },

    link: {
      padding: '1rem',
      '& a': {
        color: theme.palette.primary.link,
      },
    },

    typography: {
      padding: theme.spacing(2),
    },

    IconButton: {
      marginRight: '2rem',
      cursor: 'default',
    },

    green: {
      color: green[900],
    },

    blue: {
      color: blue[900],
    },

    purple: {
      color: deepPurple[900],
    },

    PaletteButton: {
      marginRight: '2rem',
      marginLeft: 'auto',
    },

  }));
}

export const App = () => {
  const { data: numbercaseconfirm, loading, refetch } = useGet({ path: 'api/v0/case-confirm' });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [theme, setTheme] = React.useState(getTheme('blue', false));
  const [currentColor, setCurrentColor] = React.useState('blue');
  const [state, setState] = React.useState({
    isDarkTheme: false,
  });
  const classes = useStyles(theme)();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setTheme(getTheme(currentColor, event.target.checked));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MAX_PRINTABLE_NUMBER = 99999999;
  const INTERVAL_TIME = 60000;

  useEffect(() => {
    setTheme(getTheme(currentColor, state.isDarkTheme));
    const interval = setInterval(() => {
      refetch();
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [currentColor]);

  let badge;
  if (loading) {
    badge = <Badge badgeContent="Loading" color="secondary"><LocalHospitalIcon /></Badge>;
  } else {
    badge = <Badge badgeContent={numbercaseconfirm} max={MAX_PRINTABLE_NUMBER} color="secondary"><LocalHospitalIcon /></Badge>;
  }

  const handleThemeChange = (themeColor) => {
    setCurrentColor(themeColor);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
            <IconButton
              aria-label="palette"
              className={classes.PaletteButton}
              color="inherit"
              onClick={handleClick}
            >
              <PaletteIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <IconButton
                aria-label="color"
                color="inherit"
                onClick={() => handleThemeChange('green')}
              >
                <FiberManualRecordIcon className={classes.green} />
              </IconButton>
              <IconButton
                aria-label="color"
                color="inherit"
                onClick={() => handleThemeChange('blue')}
              >
                <FiberManualRecordIcon className={classes.blue} />
              </IconButton>
              <IconButton
                aria-label="color"
                color="inherit"
                onClick={() => handleThemeChange('purple')}
              >
                <FiberManualRecordIcon className={classes.purple} />
              </IconButton>
              <Typography className={classes.typography}>Dark Theme
                <MaterialSwitch
                  checked={state.isDarkTheme}
                  onChange={handleChange}
                  name="isDarkTheme"
                  color="primary"
                />
              </Typography>
            </Popover>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Redirect to="/graph" />
          </Route>
          <Route path="/graph" component={HomePage} />
          <Route path="/map" component={GeoPage} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};
