import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Header } from './components/Header/Header.js';
import { Main } from './pages/Main/Main.js';
import { UserProfile } from './pages/UserProfile/UserProfile.js';
import { Report } from './pages/Report/Report.js';
import { Verification } from './pages/Verification/Verification.js';
import { Login } from './pages/Login/Login.js';
import { MobileMenu } from './components/MobileMenu/MobileMenu.js';
import { StoreProvider } from './Store.js';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.js';

function App() {
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });

	return (
		<Router>
			<div>
				<StoreProvider>
					<Header />
					<Switch>
						<Route exact path='/'>
							<Redirect to='/main' />
						</Route>
						<PrivateRoute
							component={Main}
							mode='Public'
							pathRedirect='/check'
							path='/main'
						/>
						{/* <Route
							path='/main'
							// component={Main}
							render={(props) => (
								<>
									{isMobile && <Header {...props} />}
									<Main />
								</>
							)}
						/> */}
						{/* <Route path='/report' component={Report} />
						<Route path='/check' component={Verification} /> */}
						<Route path='/login' component={Login} />
						<PrivateRoute
							component={Report}
							pathRedirect='/login'
							path='/report'
						/>
						<PrivateRoute
							component={Verification}
							pathRedirect='/login'
							path='/check'
						/>
						<PrivateRoute
							component={UserProfile}
							pathRedirect='/login'
							path='/profile'
						/>
					</Switch>
					{!isMobile && <MobileMenu />}
				</StoreProvider>
			</div>
		</Router>
	);
}

export default App;
