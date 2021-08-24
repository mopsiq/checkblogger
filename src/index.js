import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';

ReactDOM.render(
	<BrowserRouter basename='/checkblogger'>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
