import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';
import { App } from './components/App';
import './index.scss';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RestfulProvider base={process.env.REACT_APP_API_ENDPOINT}>
        <App />
        {/* <GeoPage /> */}
      </RestfulProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
