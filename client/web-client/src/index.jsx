import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';
import { App } from './components/App';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={process.env.REACT_APP_API_ENDPOINT ?? 'http://localhost:3000'}>
      <App />
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
