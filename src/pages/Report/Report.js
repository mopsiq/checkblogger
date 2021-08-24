import React, { useState, useEffect, useReducer } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar.js';
import '../../index.scss';
import { useData } from '../../hooks/useData/useData.js';

function Report() {
	const local = useData();

	useEffect(() => {
		async function fetchDataID(name) {
			if (name === '') return;
			local.dispatchChange('isLoaded', false);
			try {
				const response = await fetch(
					`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&vanityurl=${name}`
				);
				const responseJSON = await response.json();
				const steamID = await responseJSON.response.steamid;

				const userProfile = await fetch(
					`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${steamID}`
				);

				const userJSON = await userProfile.json();
				const data = await userJSON.response.players[0];
				if (data === undefined) throw new Error('Invalid data');
				local.dispatchChange('isError', false);
				local.dispatchChange('isLoaded', true);
				local.dispatchChange('data', data);
			} catch (error) {
				local.dispatchChange('isError', true);
				local.dispatchChange('isLoaded', true);
			}
		}

		fetchDataID(local.localStates.value);

		return () => {
			local.dispatchChange('data', {});
		};
	}, [local.localStates.value]);

	return (
		<>
			<div className='container'>
				<SearchBar
					stateFields={local.localStates}
					setValue={(e) =>
						local.dispatch({
							type: 'HANDLE_INPUT',
							field: 'value',
							payload: e,
						})
					}
					setFocus={(e) =>
						local.dispatch({
							type: 'BOOLEAN_CHANGE',
							field: 'activeFocus',
							payload: e,
						})
					}
					data={local.localStates.data}
				/>
				<div
					className={
						local.localStates.activeFocus || local.localStates.value
							? 'report active'
							: 'report'
					}
				>
					<h3>Reporting page</h3>
				</div>
			</div>
		</>
	);
}

export { Report };
