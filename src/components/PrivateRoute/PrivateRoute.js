import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Header } from '../Header/Header.js';
import { Store } from '../../Store.js';

const PrivateRoute = ({
	component: Component,
	mode = '',
	pathRedirect = '/',
	...rest
}) => {
	const isMobile = useMediaQuery({ query: '(min-width: 767px )' });
	const [state, dispatch] = useContext(Store);
	const isLogin = (user) => {
		return mode ? !user : user;
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin(state.username) ? (
					<>
						<Component {...props} />
					</>
				) : (
					<Redirect to={pathRedirect} />
				)
			}
		/>
	);
};

export { PrivateRoute };
