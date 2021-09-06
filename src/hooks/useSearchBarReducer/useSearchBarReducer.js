import React, { useReducer } from 'react';

const useSearchBarReducer = () => {
	const stateFields = {
		value: '',
		activeFocus: false,
		isLoaded: false,
		isError: false,
		data: {},
	};
	const [localStates, dispatch] = useReducer(reducer, stateFields);

	function reducer(state, action) {
		switch (action.type) {
			case 'BOOLEAN_CHANGE':
				return { ...state, [action.field]: action.payload };
			case 'BOOLEAN_SWITCH':
				return { ...state, [action.field]: !state[action.field] };
			case 'HANDLE_INPUT':
				return { ...state, [action.field]: action.payload };
			default:
				throw new Error();
		}
	}
	const dispatchChange = (field, value) => {
		dispatch({
			type: 'BOOLEAN_CHANGE',
			field: field,
			payload: value,
		});
	};

	return { localStates, dispatch, dispatchChange };
};

export { useSearchBarReducer };
