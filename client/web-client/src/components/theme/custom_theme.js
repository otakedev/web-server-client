import {
  red,
  deepPurple,
  blue,
  grey,
  green,
} from '@material-ui/core/colors';
import { frFR } from '@material-ui/data-grid';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

function createColor(isDarkTheme, color) {
  return createMuiTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: color[800],
        transparent: `${color[800]}30`,
        navbar: color[900],
        link: isDarkTheme ? '#ffffff' : '#424242',
      },
      secondary: {
        main: isDarkTheme ? '#ffffff' : color[900],
        transparent: isDarkTheme ? '#ffffff30' : `${color[900]}30`,
      },
      error: {
        main: red.A400,
      },
      background: {
        default: isDarkTheme ? grey[800] : '#ffffff',
        transparent: isDarkTheme ? `${grey[800]}30` : '#ffffff30',
      },
    },
  }, frFR);
}

export const getTheme = (color, isDark) => {
  switch (color) {
    case 'green':
      return createColor(isDark, green);
    case 'blue':
      return createColor(isDark, blue);
    case 'purple':
      return createColor(isDark, deepPurple);
    default:
      return createColor(false, blue);
  }
};
