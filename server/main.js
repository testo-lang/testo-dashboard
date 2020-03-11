
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MongoClient } from 'mongodb';
import assert from 'assert';

const app = express();
const port = 80;

let db = null;

app.get('/', async function(req, res) {
	const project = await db.collection('projects').findOne();
	res.redirect(`/project/${project.name}/branch/${project.branches[0].name}`);
});

const reportPage = async function(req, res) {
	const {project, branch} = req.params;
	const projectCursor = db.collection('projects').find({})
		.project({_id: 0})
		.toArray();
	const buildNumbersCursor = db.collection('reports').find({project, branch})
		.project({_id: 0, build_number: 1, stop_timestamp: 1})
		.sort({build_number: -1})
		.toArray();
	const filter = {project, branch};
	if ('build' in req.params) {
		filter.build_number = {
			$lte: parseInt(req.params.build)
		};
	}
	const reportsCursor = db.collection('reports').find(filter)
		.project({_id: 0, project: 0, branch: 0})
		.sort({build_number: -1})
		.limit(10)
		.toArray();
	const projects = await projectCursor;
	const buildNumbers = await buildNumbersCursor;
	const reports = (await reportsCursor).reverse();
	const testo = {
		projects,
		buildNumbers,
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
};

app.get('/project/:project/branch/:branch', reportPage);
app.get('/project/:project/branch/:branch/build/:build', reportPage);

app.use(express.static('public'));

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, client) {
	assert.equal(null, err);
	db = client.db('testo');
	await db.collection('reports').ensureIndex({build_number: -1})
	app.listen(port, () => console.log(`Listening on port ${port}`));
});

