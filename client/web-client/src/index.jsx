import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import './index.scss';

let errorFunc = null;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RestfulProvider
        base={process.env.REACT_APP_API_ENDPOINT ?? 'http://localhost:3000'}
        requestOptions={() => ({ headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } })}
        onError={(err) => {
          if (err.status === 401 && errorFunc) {
            errorFunc();
          }
        }}
      >
        <App setErrorFunc={(func) => { errorFunc = func; }} />
      </RestfulProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
