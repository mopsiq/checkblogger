import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.scss';
import { Store } from '../../Store';

function UserProfile() {
	const [state, dispatch] = useContext(Store);
	const [isOpen, setIsOpen] = useState(false);

	const buttonsExit = () => {
		setIsOpen(false);
		dispatch({
			type: 'SET_DATA',
			field: 'username',
			payload: '',
		});
		dispatch({
			type: 'SET_DATA',
			field: 'notViewedReports',
			payload: 0,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'searchCheckHistory',
			payload: '',
		});
		dispatch({
			type: 'SET_DATA',
			field: 'searchCheckHistoryLength',
			payload: 0,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'reportUsers',
			payload: 0,
		});
		dispatch({
			type: 'SET_DATA',
			field: 'reportUsersLength',
			payload: '',
		});
	};
	return (
		<>
			<Link
				onClick={() => buttonsExit()}
				className='dropdown__item'
				to='/main'
			>
				Выход
			</Link>
		</>
	);
}

export { UserProfile };
