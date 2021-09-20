import React, { useReducer, createContext } from 'react';

export const Store = createContext('');
export function StoreProvider(props) {
	const store = {
		username: '',
		notViewedReports: [],
		searchCheckHistory: [],
		searchCheckHistoryLength: 0,
		reportUsers: [],
		reportUsersLength: 0,
		error: false,
		loaded: false,
	};

	const [localStore, dispatch] = useReducer(reducer, store);

	function reducer(state, action) {
		switch (action.type) {
			case 'SET_DATA':
				return { ...state, [action.field]: action.payload };
			case 'BOOLEAN_SWITCH':
				return { ...state, [action.field]: !state[action.field] };
			case 'HANDLE_INPUT':
				return { ...state, [action.field]: action.payload };
			case 'RESET_STATE':
				return { undefined, action };
			default:
				throw new Error();
		}
	}

	return (
		<Store.Provider value={[localStore, dispatch]}>
			{props.children}
		</Store.Provider>
	);
}
