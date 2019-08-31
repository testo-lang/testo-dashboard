
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
const port = 3000;

const testo = {
	lastReportsStats: [
	],
	lastReport: {

	}
};

const page =
	<html lang="ru">
		<head>
			<meta charSet="utf-8"/>
			<title>Testo Dashboard</title>
			<link rel="preconnect" href="//fonts.gstatic.com/" crossOrigin=""/>
		</head>
			<body>
				<div id="root"></div>
			</body>
		<script dangerouslySetInnerHTML={{__html: `window.testo = ${JSON.stringify(testo)};`}}></script>
		<script src="dist/main.js"></script>
	</html>
;

app.get('/', (req, res) => {
	res.send('<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(page));
});
app.use(express.static('public'));


app.listen(port, () => console.log(`Listening on port ${port}`));
