import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Store } from '../../Store';
import '../../index.scss';

function useProvideAuth(user) {
	const [state, dispatch] = useContext(Store);
	const history = useHistory();

	const signIn = () => {
		dispatch({
			type: 'SET_DATA',
			field: 'username',
			payload: user,
		});
		history.push('/check');
	};

	const signOut = () => {
		dispatch({
			type: 'SET_DATA',
			field: 'username',
			payload: '',
		});
		history.push('/main');
	};

	return { user, signIn, signOut };
}

function Login() {
	const [login, setLogin] = useState('');
	const auth = useProvideAuth(login);

	const getName = async (name, event) => {
		event.preventDefault();
		try {
			const request = await fetch(
				`https://json-mopsiq-fake.herokuapp.com/users/1`
			);
			const requestJSON = await request.json();
			if (name !== requestJSON.username) return false;
			auth.signIn();
		} catch (err) {}
	};

	return (
		<>
			<div className='container'>
				<h1>Form page</h1>
				<h3>Login for test: Jack</h3>
				<form className='form'>
					<input
						onChange={(e) => setLogin(e.target.value)}
						value={login}
						placeholder='Login'
					/>
					<button onClick={(e) => getName(login, e)}>Log in</button>
				</form>
			</div>
		</>
	);
}

export { Login };
