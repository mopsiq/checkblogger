import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Store } from '../../Store.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [state, dispatch] = useContext(Store);

	const isLogin = (user) => {
		return user ? true : false;
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin(state.username) ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

export { PrivateRoute };
