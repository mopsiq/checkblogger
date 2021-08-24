import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	Link,
	BrowserRouter,
} from 'react-router-dom';
import { Header } from './components/Header/Header.js';
import { Main } from './pages/Main/Main.js';
import { UserProfile } from './pages/UserProfile/UserProfile.js';
import { Report } from './pages/Report/Report.js';
import { Verification } from './pages/Verification/Verification.js';

function App() {
	return (
		<BrowserRouter basename='/mopsiq.github.io/checkblogger'>
			<Router>
				<div>
					<Header />
					<Switch>
						<Route exact path='/'>
							<Redirect to='/mopsiq.github.io/checkblogger/main' />
						</Route>
						<Route
							path='/mopsiq.github.io/checkblogger/main'
							component={Main}
						/>
						<Route
							path='/mopsiq.github.io/checkblogger/profile'
							component={UserProfile}
						/>
						<Route
							path='/mopsiq.github.io/checkblogger/report'
							component={Report}
						/>
						<Route
							path='/mopsiq.github.io/checkblogger/check'
							component={Verification}
						/>
					</Switch>
				</div>
			</Router>
		</BrowserRouter>
	);
}

export default App;
