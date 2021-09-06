import React, { useState, useEffect } from 'react';

const useFetch = async (url, dispatch, firstPage, lastPage, [deps]) => {
	const locDispatch = dispatch();

	locDispatch({ type: 'SET_DATA', field: 'loaded', payload: true });
	try {
		const request = await fetch(url);
		if (request.status !== 200) {
			throw new Error('HTTP Error');
		}
		const requestJSON = await request.json();
		setTimeout(() => {
			locDispatch({
				type: 'SET_DATA',
				field: 'searchCheckHistoryLength',
				payload: requestJSON['searchCheckHistory'].length,
			});
			locDispatch({
				type: 'SET_DATA',
				field: 'reportUsersLength',
				payload: requestJSON['reportUsers'].length,
			});
			locDispatch({
				type: 'SET_DATA',
				field: 'reportUsers',
				payload: requestJSON['reportUsers'].slice(firstPage, lastPage),
			});
			locDispatch({
				type: 'SET_DATA',
				field: 'searchCheckHistory',
				payload: requestJSON['searchCheckHistory'].slice(
					firstPage,
					lastPage
				),
			});
			locDispatch({ type: 'SET_DATA', field: 'loaded', payload: false });
		}, 1500);
	} catch (error) {
		locDispatch({ type: 'SET_DATA', field: 'error', payload: true });
		locDispatch({ type: 'SET_DATA', field: 'loaded', payload: false });
	}
};
// const useFetch = (url) => {
// 	const [data, setData] = useState();
// 	const [error, setError] = useState(false);
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		const fetchData = async (name) => {
// 			setLoading(false);
// 			try {
// 				const response = await fetch(
// 					`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&vanityurl=${name}`
// 				);
// 				const responseJSON = await response.json();
// 				const steamID = await responseJSON.response.steamid;
// 				const userProfile = await fetch(
// 					`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${steamID}`
// 				);
// 				const userJSON = await userProfile.json();
// 				const data = await userJSON.response.players[0];
// 				if (data === undefined) throw new Error('Invalid data');
// 				setData(data);
// 				setLoading(true);
// 				console.log(data);
// 			} catch (error) {
// 				setError(error);
// 			}
// 		};
// 		url && fetchData(url);
// 	}, [url]);

// 	return { data, loading, error };
// };
export { useFetch };
