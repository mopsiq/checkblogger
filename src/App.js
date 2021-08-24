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

// /mopsiq.github.io/checkblogger
function App() {
	return (
		<BrowserRouter basename='/checkblogger'>
			<Router>
				<div>
					<Header />
					<Switch>
						<Route path='/'>
							<Redirect to='/checkblogger/main' />
						</Route>
						<Route path='/checkblogger/main' component={Main} />
						<Route
							path='/checkblogger/profile'
							component={UserProfile}
						/>
						<Route path='/checkblogger/report' component={Report} />
						<Route
							path='/checkblogger/check'
							component={Verification}
						/>
					</Switch>
				</div>
			</Router>
		</BrowserRouter>
	);
}

export default App;
