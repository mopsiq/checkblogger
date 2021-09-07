const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

// var options = {
//   host: "proxy",
//   port: 9000,
//   path: "http://www.google.com",
//   headers: {
//     Host: "www.google.com"
//   }
// };
// https.get(options, function(res) {
//   res.pipe(process.stdout)
// })

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/steamapi', (req, res) => {
	const name = req.query.name || 'World';
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(9000, () =>
	console.log('Express server is running on localhost:3001')
);
