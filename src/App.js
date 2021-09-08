import React, { useEffect } from 'react';
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
import { Login } from './pages/Login/Login.js';
import { Store, StoreProvider } from './Store.js';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.js';

function App() {
	const makeApiCall = async () => {
		const response = await fetch('http://localhost:9000/cors/', {
			mode: 'cors',
		});
		const jsonr = await response.json();
		console.log(jsonr);
	};
	useEffect(() => {
		makeApiCall();
	}, []);

	return (
		<Router>
			<div>
				<StoreProvider>
					<Header />
					<Switch>
						<Route exact path='/'>
							<Redirect to='/main' />
						</Route>
						<Route path='/main' component={Main} />
						<Route path='/report' component={Report} />
						<Route path='/check' component={Verification} />
						<Route path='/login' component={Login} />
						<PrivateRoute component={UserProfile} path='/profile' />
					</Switch>
				</StoreProvider>
			</div>
		</Router>
	);
}

export default App;
