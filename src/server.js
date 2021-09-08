const express = require('express');
const app = express();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', (req, res) => {
	res.send('Welcome to CORS server 😁');
});
app.get('/steamApiKey', async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const apiResponse = await fetch(
		`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&vanityurl=${req.query.name}`
	);
	const apiResponseJson = await apiResponse.json();
	res.send(apiResponseJson);
});

app.get('/steamApiUser', async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const apiResponse = await fetch(
		`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${req.query.steamdID}`
	);
	const apiResponseJson = await apiResponse.json();
	res.send(apiResponseJson);
});

app.listen(9000, () =>
	console.log('Express server is running on localhost:3001')
);
