import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Store } from '../../Store.js';

// Переименовать аргумент mode на что-то более подходящее
const PrivateRoute = ({
	component: Component,
	mode = '',
	pathRedirect = '/',
	...rest
}) => {
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
