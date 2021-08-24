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
		<BrowserRouter basename='/checkblogger'>
			<Router>
				<div>
					<Header />
					<Switch>
						<Route exact path='/'>
							<Redirect to='/main' />
						</Route>
						<Route path='/main' component={Main} />
						<Route path='/profile' component={UserProfile} />
						<Route path='/report' component={Report} />
						<Route path='/check' component={Verification} />
					</Switch>
				</div>
			</Router>
		</BrowserRouter>
	);
}

export default App;
