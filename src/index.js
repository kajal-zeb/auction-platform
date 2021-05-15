import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { isMobileOnly } from 'react-device-detect';
import DesktopApp from './DesktopApp/DesktopApp';

if (isMobileOnly) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <DesktopApp />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
