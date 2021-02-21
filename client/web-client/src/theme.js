import { red } from '@material-ui/core/colors';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffffff',
    },
    text: {
      default: '#4f4f4f',
      light: '#fff',
    },
  },
});
