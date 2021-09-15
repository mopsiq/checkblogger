import React, { useState, useEffect } from 'react';

const useFetch = (requestName, states) => {
	const getSteamData = async (name) => {
		try {
			const response = await fetch(
				`https://express-server-mopsiq.herokuapp.com/steamApiKey?name=${name}`
			);
			const responseJSON = await response.json();
			const steamID = await responseJSON.response.steamid;
			const userProfile = await fetch(
				`https://express-server-mopsiq.herokuapp.com/steamApiUser?steamdID=${steamID}`
			);
			if (userProfile.status !== 200) throw new Error('HTTP error');
			const userJSON = await userProfile.json();
			const data = await userJSON.response.players[0];
			if (data === undefined) throw new Error('Invalid data');
			return data;
		} catch (error) {
			throw new Error(error.message);
		}
	};

	const getBaseData = async (name) => {
		try {
			const response = await fetch(
				`https://json-mopsiq-fake.herokuapp.com/users/1`
			);
			if (response.status !== 200) throw new Error('HTTP error');
			const responseJSON = await response.json();
			const data = responseJSON.reportUsers.find(
				(item) =>
					item['real_name']
						.toLowerCase()
						.startsWith(name.toLowerCase()) ||
					item['real_name']
						.toUpperCase()
						.startsWith(name.toUpperCase()) ||
					item['real_name'].toUpperCase() === name.toUpperCase() ||
					item['real_name'].toLowerCase() === name.toLowerCase()
			);
			if (data === undefined) throw new Error('Invalid data');
			return data;
		} catch (error) {
			throw new Error(error.message);
		}
	};
	const getURLData = async (urlName, value) => {
		switch (urlName) {
			case 'steam':
				const dataSteam = await getSteamData(value);
				return dataSteam;
			case 'bd':
				const dataBD = await getBaseData(value);
				return dataBD;
			default:
				return false;
		}
	};

	useEffect(() => {
		const fetchData = async (requestName, name) => {
			states.dispatchChange('isLoaded', false);
			const res = getURLData(requestName, name)
				.then((data) => {
					states.dispatchChange('isError', false);
					states.dispatchChange('data', data);
					states.dispatchChange('isLoaded', true);
				})
				.catch((error) => {
					states.dispatchChange('isError', error.message);
					states.dispatchChange('isLoaded', true);
				});
		};
		states.localStates.value &&
			fetchData(requestName, states.localStates.value);
		return () => {
			states.dispatchChange('data', {});
		};
	}, [states.localStates.value]);
};
export { useFetch };
