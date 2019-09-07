
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MongoClient } from 'mongodb';
import assert from 'assert';

const app = express();
const port = 3000;

let db = null;

app.get('/', async function(req, res) {
	const project = await db.collection('projects').findOne();
	res.redirect(`/project/${project.name}/branch/${project.branches[0].name}`);
});

app.get('/project/:project/branch/:branch', async function(req, res) {
	const {project, branch} = req.params;
	const projectCursor = db.collection('projects').find().toArray();
	const reportsCursor = db.collection('reports').find({project, branch})
		.project({project: 0, branch: 0})
		.sort({start_timestamp: -1})
		.limit(10)
		.sort({start_timestamp: 1})
		.toArray();
	const projects = await projectCursor;
	const reports = await reportsCursor;
	const testo = {
		projects,
		reports,
		currentProject: project,
		currentBranch: branch
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
			<script src="/dist/main.js"></script>
		</html>
	;
	res.send('<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(page));
});

app.use(express.static('public'));

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err);
	db = client.db('testo');
	app.listen(port, () => console.log(`Listening on port ${port}`));
});

