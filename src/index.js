import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { isMobileOnly } from 'react-device-detect';
let app = document.getElementById('root');

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);
