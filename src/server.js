const express = require('express');
const app = express();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/', (req, res) => {
	res.send('Welcome to CORS server 😁');
});
app.get('/cors', async (req, res) => {
	// const { apiRoute } = req.params;
	res.set('Access-Control-Allow-Origin', '*');

	const apiResponse = await fetch(
		`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&vanityurl=jay-lee`
	);
	const apiResponseJson = await apiResponse.json();
	res.send(apiResponseJson);
	// res.send({ msg: 'This has CORS enabled 🎈' });
});

app.listen(9000, () =>
	console.log('Express server is running on localhost:3001')
);
