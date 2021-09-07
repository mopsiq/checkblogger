const proxy = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		proxy('/ISteamUser', {
			target: 'https://api.steampowered.com/',
			changeOrigin: true,
			// target: 'https://api.steampowered.com/',
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	Accept: 'application/json',
			// },
			// logLevel: 'debug',
			// changeOrigin: true,
		})
	);
};
