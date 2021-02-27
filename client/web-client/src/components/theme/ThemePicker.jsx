import React, { useEffect } from 'react';
import PaletteIcon from '@material-ui/icons/Palette';
import MaterialSwitch from '@material-ui/core/Switch';
import {
  Popover, Typography, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  Button, IconButton, makeStyles,
} from '@material-ui/core';
import {
  green,
  blue,
  deepPurple,
} from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { getTheme } from './custom_theme';

function useStyles(theme) {
  return makeStyles(() => ({
    root: {
      display: 'flex',
      marginLeft: 'auto',
    },

    typography: {
      padding: theme.spacing(2),
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
export const ThemePicker = ({ initialDarkState, initialColor, changeThemeCallback }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let hasProposedDarkTheme = false;
  const [state, setState] = React.useState({
    isDarkTheme: initialDarkState,
  });
  const [theme, setTheme] = React.useState(getTheme(initialColor, initialDarkState));
  const [currentColor, setCurrentColor] = React.useState(initialColor);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  const changeTheme = (newColor, newIsDark) => {
    const newTheme = getTheme(newColor, newIsDark);
    setTheme(newTheme);
    localStorage.setItem('reactAppTheme', JSON.stringify({ color: newColor, isDark: newIsDark }));
    changeThemeCallback(newTheme);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    changeTheme(currentColor, event.target.checked);
  };

  const handleClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleThemeChange = (themeColor) => {
    setCurrentColor(themeColor);
  };

  const handleCloseDialog = (isActivatingDarkMode) => {
    setDialogIsOpen(false);
    if (!isActivatingDarkMode) {
      localStorage.setItem('hasRefusedDarkTheme', true);
    }
    setState({ ...state, isDarkTheme: isActivatingDarkMode });
    changeTheme(currentColor, isActivatingDarkMode);
  };

  useEffect(() => {
    if (!hasProposedDarkTheme && !state.isDarkTheme) {
      const hasRefusedDarkTheme = localStorage.getItem('hasRefusedDarkTheme');
      if (prefersDarkMode && !hasRefusedDarkTheme) {
        hasProposedDarkTheme = true;
        setDialogIsOpen(true);
      }
    }
    changeTheme(currentColor, state.isDarkTheme);
  }, [currentColor, prefersDarkMode]);

  const classes = useStyles(theme)();

  const open = Boolean(popoverAnchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
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
        anchorEl={popoverAnchorEl}
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
      <Dialog
        open={dialogIsOpen}
        onClose={() => handleCloseDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Utiliser le mode sombre ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nous avons remarquer que vous utilisez le mode sombre sur votre ordinateur.
            Voulez-vous activer le mode sombre ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            Non
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ThemePicker.defaultProps = {
  initialDarkState: PropTypes.bool,
  initialColor: PropTypes.string,
  changeThemeCallback: PropTypes.func,
};

ThemePicker.propTypes = {
  initialDarkState: PropTypes.bool,
  initialColor: PropTypes.string,
  changeThemeCallback: PropTypes.func,
};
