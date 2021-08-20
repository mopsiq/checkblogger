import React, { useState, useEffect, useReducer } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
	User,
	TrashIconButton,
	UserButtonsField,
	UserTextInfo,
	UserCheckingStats,
	ReadyStatsIcon,
	Package,
} from '../../components/User/User.js';
import '../../index.scss';

const InstagramAccounts = ({ statusField, data }) => {
	return (
		<>
			<User statusField={statusField} dataFields={''}>
				<UserTextInfo />
				<TrashIconButton />
				<UserButtonsField
					textButton={'Оплатить'}
					icon={<Package className='bundle__icon' />}
				/>
			</User>
			<User statusField={statusField} dataFields={''} />
		</>
	);
};

function Verification() {
	const stateFields = {
		value: '',
		activeFocus: false,
		isLoaded: false,
		isError: false,
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
	const [dataUser, setDataUser] = useState({});

	useEffect(() => {
		async function fetchDataID(name) {
			if (name === '') return;
			dispatchChange('isLoaded', false);
			try {
				const response = await fetch(
					`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&vanityurl=${name}`
				);
				const responseJSON = await response.json();
				const steamID = await responseJSON.response.steamid;

				const userProfile = await fetch(
					`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${steamID}`
				);

				const userJSON = await userProfile.json();
				const data = await userJSON.response.players[0];
				if (data === undefined) return;
				dispatchChange('isError', false);
				dispatchChange('isLoaded', true);
				setDataUser(data);
			} catch (error) {
				dispatchChange('isError', false);
			}
		}

		fetchDataID(localStates.value);
	}, [localStates.value]);

	return (
		<>
			<div className='container'>
				<SearchBar
					stateFields={localStates}
					setValue={(e) =>
						dispatch({
							type: 'HANDLE_INPUT',
							field: 'value',
							payload: e,
						})
					}
					setFocus={(e) =>
						dispatch({
							type: 'BOOLEAN_CHANGE',
							field: 'activeFocus',
							payload: e,
						})
					}
					data={dataUser}
				/>
				<div
					className={
						localStates.activeFocus || localStates.value
							? 'verification active'
							: 'verification'
					}
				>
					<div className='verification__header'>
						<div className='verification__noname'>
							<p className='verification__text'>Аккаунт</p>
						</div>
						<div className='verification__noname'>
							<p className='verification__text verification__text--right'>
								Подписчики
							</p>
						</div>
					</div>
					<div className='verification__body'>
						<InstagramAccounts
							statusField={localStates.activeFocus}
							data={dataUser}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export { Verification };
