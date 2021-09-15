import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Store } from '../../Store.js';

const PrivateRoute = ({
	component: Component,
	mode = '',
	pathRedirect = '/',
	...rest
}) => {
	const [state, dispatch] = useContext(Store);
	// mode ? !state.username : state.username
	const isLogin = (user) => {
		return mode ? !user : user;
		return user ? true : false;
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin(state.username) ? (
					<Component {...props} />
				) : (
					<Redirect to={pathRedirect} />
				)
			}
		/>
	);
};

export { PrivateRoute };
