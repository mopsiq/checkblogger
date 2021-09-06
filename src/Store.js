import React, { useReducer, useEffect, createContext, useState } from 'react';
import { useFetch } from './hooks/useFetch/useFetch';

export const Store = createContext('');
export function StoreProvider(props) {
	const store = {
		username: 'Jack',
		notViewedReports: ['1', '2'],
		searchCheckHistory: [],
		searchCheckHistoryLength: 0,
		reportUsers: [],
		reportUsersLength: 0,
		error: false,
		loaded: false,
	};

	const [localStore, dispatch] = useReducer(reducer, store);

	useEffect(
		() => {
			console.log('start storeRequest');
			const getLength = async (url, fieldData, fieldLength) => {
				dispatch({
					type: 'SET_DATA',
					field: 'loaded',
					payload: true,
				});

				try {
					const request = await fetch(url);
					if (request.status !== 200) {
						console.log(request);
						throw new Error('HTTP ERROR');
					}
					const requestJSON = await request.json();
					// if (localStore[fieldLength] !== requestJSON[fieldData].length) {
					setTimeout(() => {
						dispatch({
							type: 'SET_DATA',
							field: fieldLength,
							payload: requestJSON[fieldData].length,
						});
						dispatch({
							type: 'SET_DATA',
							field: 'loaded',
							payload: false,
						});
						// requestJSON.reportUsers.map(
						// 	(item) =>
						// 		JSON.parse(item['status_payment']) &&
						// 		(item.data_download
						// 			? localStore.notViewedReports.push(item)
						// 			: false)
						// );
						console.log(localStore.notViewedReports);
					}, 5000);
					// }
				} catch (error) {
					console.log('b');
					dispatch({
						type: 'SET_DATA',
						field: 'error',
						payload: true,
					});
					dispatch({
						type: 'SET_DATA',
						field: 'loaded',
						payload: false,
					});
				}

				console.log('end storeRequest');
			};
			// getLength(
			// 	'http://localhost:8000/users/1',
			// 	'searchCheckHistory',
			// 	'searchCheckHistoryLength'
			// );
			// getLength(
			// 	'http://localhost:8000/users/1',
			// 	'reportUsers',
			// 	'reportUsersLength'
			// );
			localStore.searchCheckHistory &&
				localStore.searchCheckHistory.sort((a, b) => b.id - a.id);
		},
		[
			// localStore.searchCheckHistory,
			// localStore.reportUsers,
		]
	);

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
