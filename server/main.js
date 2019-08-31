
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();
const port = 3000;

const testo = {
	projects: [
		{
			name: 'JinnServer',
			branches: [
				{
					name: 'develop'
				},
				{
					name: 'release'
				},
				{
					name: 'feature-autotests'
				}
			]
		},
		{
			name: 'TLSServer',
			branches: [
				{
					name: 'devel'
				},
				{
					name: 'release'
				}
			]
		}
	],
	currentProject: 'JinnServer',
	currentBranch: 'develop',
	lastReportsStats: [
	],
	lastReport: {
		tests: [
			{
				name: 'configure_jinn',
				description: 'jinn должен настраиваться',
				duration: 15,
				status: 'fail'
			},
			{
				name: 'install_centos',
				description: '',
				duration: 15,
				status: 'success'
			},
			{
				name: 'install_additions_and_disable_selinux',
				description: '',
				duration: 15,
				status: 'success'
			},
			{
				name: 'install_jinn',
				description: 'JinnServer должен корректно устанавливаться из rpm пакетов на узел CAS1',
				duration: 1001,
				status: 'success'
			},
			{
				name: 'remove_jinn',
				description: 'JinnServer должен корректно удалятся из системы с помощью стандартных инструментов ОС CentOS. При этом в системе не должно оставаться лишних файлов.',
				duration: 15,
				status: 'success'
			},
			{
				name: 'update_jinn',
				description: 'JinnServer должен корректно обновлятся с предыдущей релизной версии',
				duration: 4018,
				status: 'success'
			}
		]
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
